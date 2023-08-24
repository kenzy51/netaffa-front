import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiEducation } from '@app/lib/api'
import { CommonSeoTextList200Response, Course, EducationLessonsList200Response } from '@app/lib/api/gen'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import VideoPlayer from '@app/components/ui/Video'
import { useEffect, useState } from 'react'
import useMediaQuery from '@app/hooks/useMediaQuery'
import SeoText from '@app/components/ui/SeoText'
import { SmallButton } from '@app/components/ui/buttons/DefaultButton'
import Image from 'next/image'
import nextIcon from 'public/images/svg/iconNext.svg'
import FilterIcon from 'public/images/svg/filter-icon.svg'
import InlineSVG from 'react-inlinesvg'
import LessonFilter from '@app/components/pages/education/sign-language/LessonFilter'

import word from 'public/images/svg/word.svg'
import excel from 'public/images/svg/excel.svg'
import pdf from 'public/images/svg/pdf.svg'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'

interface ILessonProps {
  course?: Course
  lessons?: EducationLessonsList200Response
  seoData?: CommonSeoTextList200Response
}

const getFileExtension = (url: string) => {
  const parts = url.split('.')
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase()
  }
  return ''
}
const Lesson = (props: ILessonProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { course, lessons } = props
  const isLarge = useMediaQuery('lg')
  const { query, replace } = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>([])
  const md = useMediaQuery('md')
  const isMobile = useMediaQuery('sm')
  const order = Number(query.order) || 1
  const lesson = lessons?.results.find((lesson) => lesson.order === order)

  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const education = locale === 'ru' ? 'Учеба' : 'Education'
  const signText = locale === 'ru' ? 'Язык жестов' : 'Sign language'

  const breadcrumb = [
    { label: main, link: '/' },
    { label: education },
    { label: signText, link: '/education/sign-language' },
    { label: lesson?.title || '' },
  ]

  const toggleMobileOpen = () => {
    setMobileOpen((prev) => !prev)
  }

  const changeLessonHandler = (lessonOrder: number) => {
    replace({
      query: {
        ...query,
        order: lessonOrder,
      },
    })
  }
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

  const changeLessonHandler2 = (step: number) => {
    const currentIndex = lessons?.results.findIndex((lesson) => lesson.order === order)
    if (currentIndex !== undefined && currentIndex !== -1 && lessons?.results) {
      const nextIndex = currentIndex + step
      if (nextIndex >= 0 && nextIndex < lessons.results.length) {
        replace({
          query: {
            ...query,
            order: lessons.results[nextIndex].order,
          },
        })
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      if (lesson?.id) {
        const { data } = await $apiEducation.educationFilesList(`${lesson.id}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFiles(data.results as any)
      }
    })()
  }, [lesson])
  const { t } = useTranslation('signLanguage')

  if (!lesson) return <h1 style={{ textAlign: 'center', marginTop: 100 }}>Нет уроков...</h1>

  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        {isLarge && (
          <SmallButton onClick={toggleMobileOpen}>
            {t('headMain')} <InlineSVG src={FilterIcon.src} />
          </SmallButton>
        )}
        {isLarge && (
          <div>
            <LessonFilter mobileOpen={mobileOpen} onToggleMobileMenu={toggleMobileOpen} lessons={lessons} />
          </div>
        )}
        <TitleAndButtons>
          {!md && <Title>{lesson.title}</Title>}
          {!isLarge && (
            <LessonButtons>
              <LessonButton onClick={() => changeLessonHandler2(-1)}>
                <PreviousIcon
                  src={nextIcon}
                  width={24}
                  height={24}
                  alt="nextIcon"
                  style={{ transform: 'rotate(180)' }}
                />
                {t('previous')}
              </LessonButton>
              <LessonButton onClick={() => changeLessonHandler2(1)}>
                {t('next')}
                <Image src={nextIcon} width={24} height={24} alt="nextIcon" />
              </LessonButton>
            </LessonButtons>
          )}
        </TitleAndButtons>
        <VideoAndLessons>
          <VideoBlock>
            {!!(course?.image && lesson.video) && (
              <VideoPlayer videoUrl={lesson.video} iframeOrVideo="video" bannerImage={course.image} />
            )}
          </VideoBlock>
          {!isLarge && (
            <LessonList>
              <DescriptionTitle>{t('headMain')}</DescriptionTitle>
              <h3>{t('title')}</h3>
              <LessonScroll>
                {lessons?.results.map((lesson) => (
                  <LessonItem key={lesson.id} onClick={() => lesson.order && changeLessonHandler(lesson.order)}>
                    <VideoWrapper active={order === lesson.order}>
                      <video src={lesson.video} width={146} height={64} style={{ objectFit: 'cover' }}>
                        <track src={lesson.video} kind="captions" srcLang="en" label="English" default />
                      </video>
                    </VideoWrapper>
                    {lesson.title}
                  </LessonItem>
                ))}
              </LessonScroll>
            </LessonList>
          )}
        </VideoAndLessons>
        <Info>
          <DescriptionWrapper>
            <DescriptionTitle>{t('descLesson')}</DescriptionTitle>
            <DescriptionText>{lesson.description}</DescriptionText>
          </DescriptionWrapper>
        </Info>
        <FilesTitle>{t('files')}</FilesTitle>
        <FilesWrapper>
          <FilesList>
            {files ? (
              files.map((file) => (
                <a href={file.file} download key={file.id}>
                  <FileLink>
                    {getFileIcon(file.file) && (
                      <Image width={36} height={36} src={getFileIcon(file.file)} alt="file icon" />
                    )}
                    <SmallTitle> {file.name}</SmallTitle>
                  </FileLink>
                </a>
              ))
            ) : (
              <h4>{t('noFiles')}</h4>
            )}
          </FilesList>
        </FilesWrapper>
        {isMobile && (
          <LessonButtons>
            <LessonButton onClick={() => changeLessonHandler2(-1)}>
              <PreviousIcon src={nextIcon} width={24} height={24} alt="nextIcon" style={{ transform: 'rotate(180)' }} />
              {t('previous')}
            </LessonButton>
            <LessonButton onClick={() => changeLessonHandler2(1)}>
              {t('next')}
              <Image src={nextIcon} width={24} height={24} alt="nextIcon" />
            </LessonButton>
          </LessonButtons>
        )}
      </Container>
      <SeoText data={props.seoData} />
    </div>
  )
}

const { containers, mqMax, colors } = theme

const FileLink = styled.div`
  min-width: 185px;
  border-radius: 10px;
  height: 80px;
  display: flex;
  padding: 22px 100px 22px 35px;
  align-items: center;
  gap: 15px;
  background: white;

  width: 100%;

  ${mqMax('sm')} {
    padding: 22px 20px 22px 18px;
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
const PreviousIcon = styled(Image)`
  transform: rotate(180deg);
`
const LessonButtons = styled.div`
  width: 384px;
  justify-content: space-between;
  display: flex;
  ${mqMax('sm')} {
    width: 100%;
  }
`
const VideoWrapper = styled.div<{ active: boolean }>`
  border: 2px solid ${({ active }) => (active ? colors.primary : 'none')};
  border-radius: 5px;
  display: flex;
  overflow: hidden;
`
const LessonButton = styled.button`
  background: white;
  display: flex;
  max-height: 60px;
  max-width: 170px;
  padding: 0 20px;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${colors.primary};
  border-radius: 50px;
  ${mqMax('sm')} {
    max-width: 133px;
    height: 46px;
    font-size: 12px;
    margin-top: 24px;
  }
`
const VideoBlock = styled.div`
  width: 100%;
`
const TitleAndButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const VideoAndLessons = styled.div`
  margin-top: -20px;
  gap: 24px;
  display: flex;
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('xl')} {
    padding: 30px 13px;
  }
  padding-bottom: 70px;
`
const LessonScroll = styled.div`
  max-height: 250px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    border-right: 1.5px solid #d6d8dc;
  }

  &::-webkit-scrollbar-thumb {
    background: #7f90b4;
    border-radius: 10px;
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
const Info = styled.div`
  display: flex;
  margin-top: 30px;
  ${mqMax('md')} {
    flex-direction: column;
    row-gap: 20px;
    margin-top: 20px;
  }
`
const DescriptionWrapper = styled.div`
  max-width: 792px;
  ${mqMax('lg')} {
    max-width: 100%;
  }
`
const DescriptionTitle = styled.h4`
  font-size: 32px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.16px;
  color: ${colors.dark};
  margin-bottom: 20px;
  ${mqMax('md')} {
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
    margin-bottom: 8px;
  }
`
const DescriptionText = styled.p`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};
  ${mqMax('md')} {
    font-size: 14px;
    font-weight: 400;
    line-height: 150%; /* 21px */
  }
`
const FilesWrapper = styled.div`
  margin-top: 40px;
  max-width: 792px;
  width: 100%;
  ${mqMax('md')} {
    margin-top: 0;
  }
`
const FilesTitle = styled(DescriptionTitle)`
  margin-top: 40px;
`
const FilesList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;

  ${mqMax('md')} {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }
`

const LessonList = styled.ul`
  background: white;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  overflow-y: auto;
  max-height: 380px;
  ${mqMax('md')} {
    margin: 40px auto 0;
  }
`
const LessonItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.324px;
  padding: 10px 20px;
  cursor: pointer;
  gap: 16px;
`

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query

  const { data: courseData } = await $apiEducation.educationCoursesRead(slug as string, {
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const courseId = courseData.id?.toString()

  const { data: lessons } = await $apiEducation.educationLessonsList(courseId)
  const { data: seoData } = await $apiCommon.commonSeoTextList('education', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      course: courseData,
      lessons,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, ['signLanguage', 'buttons'])),
    },
  }
}

export default Lesson
