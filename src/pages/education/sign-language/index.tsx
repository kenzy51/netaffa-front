/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Banner from '@app/components/ui/Banner'
import LetterIcon from 'public/images/svg/letters/я.svg'
import SignIcon from 'public/images/svg/signs/sign-lang.svg'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiEducation } from '@app/lib/api'
import SignLangList from '@app/components/pages/education/sign-language/List'
import { EducationCategoriesList200Response, EducationCoursesList200Response } from '@app/lib/api/gen/api'
import TopBarFilters from '@app/components/pages/education/sign-language/TopBarFilters'
import SidebarFilter from '@app/components/pages/education/sign-language/SidebarFilter'
import SeoText from '@app/components/ui/SeoText'
import { pageToOffset } from '@app/lib/helpers/offsetToPage'
import Pagination from '@app/components/Pagination'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash-es'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { CommonSeoTextList200Response } from '@app/lib/api/gen'

interface ISignLanguageProps {
  courses?: EducationCoursesList200Response
  categories?: EducationCategoriesList200Response
  seoData?: CommonSeoTextList200Response
}
const limitTile = 15
const limitList = 7
const SignLanguage = ({ courses, categories, seoData }: ISignLanguageProps) => {
  const { query, push, pathname, locale } = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('')
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const education = locale === 'ru' ? 'Учеба' : 'Education'
  const signText = locale === 'ru' ? 'Язык жестов' : 'Sign language'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: education }, { label: signText }])
  const view = query?.view === 'list' ? 'list' : 'tile'
  const { t } = useTranslation('signLanguage')
  selectedCategories && selectedAgeFilter

  const isCoursesEmpty = isEmpty(courses)

  const handleAgeFilterChange = (value: string) => {
    setSelectedAgeFilter(value)
  }
  const toggleMobileOpen = () => {
    setMobileOpen((prev) => !prev)
  }
  const handleCategoryClick = (categoryIds: any[]) => {
    setSelectedCategories(categoryIds)
  }

  const handlePageChange = async (page: number) => {
    await push({
      pathname,
      query: { ...query, page },
    })
  }
  const limit = view === 'list' ? limitList : limitTile

  return (
    <>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('title')}
        image="/images/jpg/sign-lang-banner.jpg"
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
        }}
      />
      <Container>
        <Content>
          <div>
            <SidebarFilter
              mobileOpen={mobileOpen}
              onToggleMobileMenu={toggleMobileOpen}
              categories={categories}
              onClickCategory={handleCategoryClick}
            />
          </div>
          <div>
            <TopBarFilters onToggleMobileMenu={toggleMobileOpen} onAgeFilterChange={handleAgeFilterChange} />
            <SignLangList courses={courses} view={view} limit={limit} />
            {!isCoursesEmpty && (
              <Pagination
                currentPage={Number(query?.page) || 1}
                count={courses?.count || 1}
                onChange={handlePageChange}
                pageLimit={limit}
              />
            )}
          </div>
        </Content>
      </Container>
      <SeoText data={seoData} />
    </>
  )
}

const { containers, mqMax } = theme
const BreadcrumbWrapper = styled.div`
  max-width: ${containers.main};
  margin: 20px auto;
  ${theme.mqMax('xl')} {
    padding: 0 13px;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 40px auto;
  ${theme.mqMax('xl')} {
    padding: 0 13px;
  }
`
const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 260px) 1fr;
  column-gap: 45px;
  ${mqMax('lg')} {
    grid-template-columns: 1fr;
  }
`
export const getServerSideProps: GetServerSideProps = async ({ query, locale }: any) => {
  const selectedCategories = query.category ? query.category.split(',') : []
  const targetAudience = query.target_audience || ''
  const forAdults = targetAudience === 'adults' ? 'true' : undefined
  const forChildren = targetAudience === 'children' ? 'true' : undefined
  const forAll = targetAudience === '' ? 'true' : undefined
  const view = query?.view === 'list' ? 'list' : 'tile'

  let limit
  if (view === 'list') {
    limit = limitList
  } else {
    limit = limitTile
  }
  const [courses, categories] = await Promise.all([
    $apiEducation.educationCoursesList(
      forAdults,
      forChildren,
      forAll,
      selectedCategories,
      limit,
      pageToOffset(query?.page, limit),
      {
        headers: {
          'Accept-Language': locale || defaultLanguage,
        },
      }
    ),
    $apiEducation.educationCategoriesList(undefined, undefined, {
      headers: {
        'Accept-language': locale || defaultLanguage,
      },
    }),
  ])
  const { data } = await $apiCommon.commonSeoTextList('education', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      courses: courses.data,
      categories: categories.data,
      seoData: data,
      ...(await serverSideTranslations(locale || defaultLanguage, ['common', 'signLanguage', 'buttons'])),
    },
  }
}

export default SignLanguage
