import { theme } from '@app/styles/theme'
import React, { useRef } from 'react'
import { styled } from 'styled-components'
import LetterIcon from 'public/images/svg/letters/К.svg'
import SignIcon from 'public/images/svg/signs/career.svg'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Banner from '@app/components/ui/Banner'
import { GetServerSideProps } from 'next'
import { $apiCareer, $apiCommon } from '@app/lib/api'
import {
  CareerVacanciesList200Response,
  CommonSeoTextList200Response,
  NewsArticlesArticlesList200Response,
} from '@app/lib/api/gen'
import CareerList from '@app/components/pages/career/career-list/CareerList'
import SeoText from '@app/components/ui/SeoText'
import { defaultLanguage } from '@app/@types/languages'
import { pageToOffset } from '@app/lib/helpers/offsetToPage'
import { useRouter } from 'next/router'
import Pagination from '@app/components/Pagination'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const limit = 7
interface ICareerResponse {
  careerVacancies?: CareerVacanciesList200Response
  articles?: NewsArticlesArticlesList200Response
  seoData?: CommonSeoTextList200Response
}
const Career = ({ careerVacancies, seoData }: ICareerResponse) => {
  const { query, push, pathname, locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const career = locale === 'ru' ? 'Карьера' : 'Career'
  const { t } = useTranslation('career')
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: career }])

  const handlePageChange = async (page: number) => {
    await push({
      pathname,
      query: { ...query, page },
    })
  }

  return (
    <div>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('title')}
        image="/images/jpg/career-banner.jpg"
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
          signStyles: {
            bottom: 0,
            right: '50% !important',
            transform: `translateX(50%)`,
          },
        }}
      />
      <Container>
        <Content>
          <CareerList careerVacancies={careerVacancies} />
          <Pagination
            currentPage={Number(query?.page) || 1}
            count={careerVacancies?.count || 1}
            onChange={handlePageChange}
            pageLimit={limit}
          />
        </Content>
      </Container>
      <SeoText data={seoData} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { data } = await $apiCareer.careerVacanciesList(limit, pageToOffset(query?.page, limit), {
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('career', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      careerVacancies: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'career',
        'projectGoal',
        'opportunities',
        'buttons',
        'pagination',
      ])),
    },
  }
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
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
`
export default Career
