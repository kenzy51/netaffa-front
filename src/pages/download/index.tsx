import React, { useState } from 'react'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import { theme } from '@app/styles/theme'
import DownloadInput from '@app/components/ui/DownloadInput'
import TopFilters from '@app/components/pages/download/TopFilters'
import useMediaQuery from '@app/hooks/useMediaQuery'
import SeoText from '@app/components/ui/SeoText'
import SidebarFilter from '@app/components/pages/education/sign-language/SidebarFilter'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiEducation } from '@app/lib/api'
import {
  CommonSeoTextList200Response,
  Course,
  EducationCategoriesList200Response,
  EducationCoursesList200Response,
  Lesson,
} from '@app/lib/api/gen'

import word from 'public/images/svg/word.svg'
import excel from 'public/images/svg/excel.svg'
import pdf from 'public/images/svg/pdf.svg'
import Image from 'next/image'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IDownloadProps {
  courses?: EducationCoursesList200Response
  categories?: EducationCategoriesList200Response
  seoData?: CommonSeoTextList200Response
}

const getFileExtension = (url: string) => {
  const parts = url.split('.')
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase()
  }
  return ''
}
const Download = ({ categories, courses, seoData }: IDownloadProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const download = locale === 'ru' ? 'Скачать' : 'Download'
  const breadcrumb = [{ label: main, link: '/' }, { label: download }]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('')

  selectedCategories && selectedAgeFilter

  const toggleMobileOpen = () => {
    setMobileOpen((prev) => !prev)
  }

  const isLarge = useMediaQuery('lg')
  const handleCategoryClick = (categoryIds: any[]) => {
    setSelectedCategories(categoryIds)
  }

  const handleAgeFilterChange = (value: string) => {
    setSelectedAgeFilter(value)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredCourses = courses?.results.filter((course) => {
    const courseTitle = course.title.toLowerCase()
    return courseTitle.includes(searchQuery.toLowerCase())
  })

  const getFileIcon = (fileUrl: string) => {
    const extension = getFileExtension(fileUrl)
    switch (extension) {
      case 'doc':
      case 'docx':
        return word
      case 'xls':
      case 'xlsx':
        return excel
      case 'pdf':
        return pdf
      default:
        return null
    }
  }
  const { t } = useTranslation('dowload')
  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        {!isLarge && <Title>{t('title')}</Title>}
        <InnerWrapper>
          <LeftBlock>
            <SidebarFilter
              onToggleMobileMenu={toggleMobileOpen}
              mobileOpen={mobileOpen}
              categories={categories}
              onClickCategory={handleCategoryClick}
            />
          </LeftBlock>
          <RightBlock>
            <TopFilters onToggleMobileMenu={toggleMobileOpen} onAgeFilterChange={handleAgeFilterChange} />
            <InputBlock>
              <DownloadInput onSearch={handleSearch} />
              {filteredCourses && filteredCourses.length > 0 ? (
                filteredCourses.map(
                  (course: Course) =>
                    !!course.lessons?.length && (
                      <ItemWrapper key={course.title}>
                        <h1>{course.title}</h1>
                        {course.lessons?.map((lesson: Lesson) => (
                          <LessonBlock key={lesson.title}>
                            <LessonTitle>{lesson.title}</LessonTitle>
                            <FileList>
                              {lesson?.files ? (
                                lesson?.files.map((file) => (
                                  <FileBlock key={file.id}>
                                    <Link type="download" href={file.file} target="_blank" key={file.name}>
                                      {getFileIcon(file.file) && (
                                        <Image width={36} height={36} src={getFileIcon(file.file)} alt="file icon" />
                                      )}
                                      <SmallTitle>{file.name}</SmallTitle>
                                    </Link>
                                  </FileBlock>
                                ))
                              ) : (
                                <h1>у данного курса отсутствуют файлы</h1>
                              )}
                            </FileList>
                          </LessonBlock>
                        ))}
                      </ItemWrapper>
                    )
                )
              ) : (
                <h2>Курсы отсутствуют по данному запросу</h2>
              )}
            </InputBlock>
          </RightBlock>
        </InnerWrapper>
      </Container>
      <SeoText data={seoData} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }: any) => {
  const selectedCategories = query.category ? query.category.split(',') : []
  const targetAudience = query.target_audience || ''

  const forAdults = targetAudience === 'adults' ? 'true' : undefined
  const forChildren = targetAudience === 'children' ? 'true' : undefined
  const forAll = targetAudience === '' ? 'true' : undefined
  const [courses, categories] = await Promise.all([
    $apiEducation.educationCoursesList(forAdults, forChildren, forAll, selectedCategories, undefined, undefined, {
      headers: {
        'Accept-language': locale || defaultLanguage,
      },
    }),
    $apiEducation.educationCategoriesList(undefined, undefined, {
      headers: {
        'Accept-language': locale || defaultLanguage,
      },
    }),
  ])
  const { data: seoData } = await $apiCommon.commonSeoTextList('download', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      courses: courses.data,
      categories: categories.data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, ['common', 'dowload', 'buttons'])),
    },
  }
}
const { containers, mqMax, colors } = theme

const LessonTitle = styled.h5`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.12px;
  margin-bottom: 10px;

  ${mqMax('sm')} {
    font-size: 18px;
  }
`
const LessonBlock = styled.div``
const ItemWrapper = styled.div`
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 38px; /* 118.75% */
    letter-spacing: -0.16px;
    margin-top: 10px;

    ${mqMax('md')} {
      font-size: 24px;
    }
  }
`
const InputBlock = styled.div`
  margin-top: -15px;
  width: 792px;

  ${mqMax('xxl')} {
    max-width: 732px;
    min-width: 300px;
  }

  ${mqMax('md')} {
    width: 100%;
  }
`
const FileList = styled.div`
  display: flex;
  width: 896px;
  flex-direction: row;
  row-gap: 20px;
  column-gap: 20px;
  flex-wrap: wrap;

  ${mqMax('xl')} {
  }

  ${mqMax('md')} {
    justify-content: center;
    width: 100%;
  }
`
const SmallTitle = styled.div`
  color: #38496c;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;

  ${mqMax('sm')} {
    font-size: 14px;
  }
`
const FileBlock = styled.div`
  border-radius: 10px;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 22px 100px 22px 35px;
  align-items: center;
  gap: 15px;
  background: white;

  ${mqMax('xl')} {
    min-width: 344px;
  }

  ${mqMax('md')} {
    width: 100%;
  }

  ${mqMax('sm')} {
    padding: 22px 20px 22px 18px;
    min-width: 284px;
  }
  a {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`
const RightBlock = styled.div``
const LeftBlock = styled.div``
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  padding-bottom: 70px;
  min-width: 270px;

  ${mqMax('xl')} {
    padding: 0 13px 40px 13px;
  }
  ${mqMax('sm')} {
    padding-bottom: 40px;
  }
`

const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 260px) 1fr;
  column-gap: 45px;
  ${mqMax('lg')} {
    grid-template-columns: 1fr;
  }
`
const BreadcrumbWrapper = styled.div`
  margin: 20px 0;

  ${mqMax('md')} {
    margin: 15px 0;
  }
`
const Title = styled.h1`
  font-size: 54px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: -0.324px;
  color: ${colors.dark};
  margin-bottom: 30px;
`

export default Download
