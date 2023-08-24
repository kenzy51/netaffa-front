import React, { useRef } from 'react'
import { theme } from '@app/styles/theme'
import LetterIcon from 'public/images/svg/letters/m-small.svg'
import SignIcon from 'public/images/svg/signs/mission.svg'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import {
  CitiesCitiesList200Response,
  CitiesCountriesList200Response,
  CommonSeoTextList200Response,
  MedicineMedicalOrganizationsList200Response,
  NewsArticlesArticlesList200Response,
  NewsArticlesNewsList200Response,
} from '@app/lib/api/gen'
import Banner from '@app/components/ui/Banner'
import TopBarFilters from '@app/components/pages/education/children-clubs/TopBarFilters'
import MedicalOrganizationList from '@app/components/pages/medicine/List'
import AnchorLinks from '@app/components/pages/medicine/AnchorLinks'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiLocations, $apiMedicine, $apiNewsArticles } from '@app/lib/api'
import NewsArticles from '@app/components/pages/news-articles/NewsArticles'
import VideoPlayer from '@app/components/ui/Video'
import MedBanner from 'public/images/png/medicalPhotoVideo.png'
import SeoText from '@app/components/ui/SeoText'
import useMediaQuery from '@app/hooks/useMediaQuery'
import MedicineForm from '@app/components/pages/medicine/MedicineForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export interface IMedicalOrganizations {
  medicalOrganizations?: MedicineMedicalOrganizationsList200Response
  articles?: NewsArticlesArticlesList200Response
  news?: NewsArticlesNewsList200Response
  cities?: CitiesCitiesList200Response
  countries?: CitiesCountriesList200Response
  seoData?: CommonSeoTextList200Response
}

const MedicinePage = ({ medicalOrganizations, articles, news, cities, countries, seoData }: IMedicalOrganizations) => {
  const isMobile = useMediaQuery('sm')
  const { t } = useTranslation('medicalCare')
  const { t: tForm } = useTranslation('forms')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const medicalCare = locale === 'ru' ? 'Медицинское обслуживание' : 'Medical care'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: medicalCare }])
  const props = { articles, news, cities, countries }
  return (
    <div>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('title')}
        image={!isMobile ? '/images/jpg/medicine-service-banner.jpg' : '/images/jpg/medicineBannerMobile.jpg'}
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
          signStyles: {
            top: 0,
            right: '50% !important',
            transform: 'translateX(50%)',
          },
        }}
      />
      <AnchorLinks />
      <Container>
        <Content>
          <div id="medList">
            <Title>{t('healthOrganis')}</Title>
            <TopBarFilters />
            <MedicalOrganizationList medicalOrganizations={medicalOrganizations} />
          </div>
        </Content>
        <div id="video"></div>
        <VideoBlock>
          <h2>{t('videoTitle')}</h2>
          <VideoItself>
            <VideoPlayer
              styles={{
                videoWrapper: { height: 570 },
              }}
              height={570}
              videoUrl={'https://www.youtube.com/watch?v=B8Q-yKrv6Jw&t=21305s'}
              iframeOrVideo="video"
              bannerImage={MedBanner}
              heightVideo={570}
            />
          </VideoItself>
        </VideoBlock>
      </Container>
      <div id="translate"></div>
      <MedicineForm>{tForm('orderInterpreterTitle')}</MedicineForm>
      <div id="news"></div>
      <NewsArticles props={props} />
      <SeoText data={seoData} />
    </div>
  )
}
const { containers, mqMax, colors } = theme
const Title = styled.h1`
  font-size: 32px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: -0.324px;
  color: ${colors.dark};
  margin-bottom: 20px;
`
const BreadcrumbWrapper = styled.div`
  max-width: ${containers.main};
  margin: 20px auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`

const VideoItself = styled.div`
  ${mqMax('sm')} {
    display: flex;
    justify-content: center;
  }
`
const VideoBlock = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 80px;
  ${mqMax('sm')} {
    margin: 40px 0;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 40px auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
  ${mqMax('md')} {
    margin: 16px auto;
  }
`
const Content = styled.div``

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const city = Number(query.city) || undefined,
    country = Number(query.country) || undefined
  const { data } = await $apiMedicine.medicineMedicalOrganizationsList(city, country, undefined, undefined, {
    params: {},
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: citiesData } = await $apiLocations.citiesCitiesList()
  const { data: countriesData } = await $apiLocations.citiesCountriesList()
  const { data: articlesData } = await $apiNewsArticles.newsArticlesArticlesList(undefined, undefined, {
    params: {},
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: newsData } = await $apiNewsArticles.newsArticlesNewsList(undefined, undefined, {
    params: {},
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })

  const { data: seoData } = await $apiCommon.commonSeoTextList('medicine', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })

  return {
    props: {
      medicalOrganizations: data,
      articles: articlesData,
      news: newsData,
      seoData: seoData,
      cities: citiesData,
      countries: countriesData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'medicalCare',
        'buttons',
        'forms',
        'validationForm',
      ])),
    },
  }
}
export default MedicinePage
