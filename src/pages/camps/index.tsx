import React, { useRef } from 'react'
import { theme } from '@app/styles/theme'
import LetterIcon from 'public/images/svg/letters/Л.svg'
import SignIcon from 'public/images/svg/signs/camps.svg'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import { GetServerSideProps } from 'next'
import { $apiCamps, $apiCommon } from '@app/lib/api'
import { CampsCampsList200Response, CommonSeoTextList200Response } from '@app/lib/api/gen'
import Banner from '@app/components/ui/Banner'
import TopBarFilters from '@app/components/pages/education/children-clubs/TopBarFilters'
import CampsList from '@app/components/pages/camps/all-camps/List'
import SeoText from '@app/components/ui/SeoText'
import { useRouter } from 'next/router'
import { pageToOffset } from '@app/lib/helpers/offsetToPage'
import { defaultLanguage } from '@app/@types/languages'
import Pagination from '@app/components/Pagination'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface IChildrenCamps {
  camps?: CampsCampsList200Response
  seoData?: CommonSeoTextList200Response
}
const limitTile = 16
const limitList = 8

const Camps = ({ camps, seoData }: IChildrenCamps) => {
  const { query, push, pathname, locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const campsText = locale === 'ru' ? 'Лагеря' : 'Лагеря'
  const campsChildren = locale === 'ru' ? 'Лагеря для детей' : 'Camps for children'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: campsText }, { label: campsChildren }])
  const handlePageChange = async (page: number) => {
    await push({
      pathname,
      query: { ...query, page },
    })
  }
  const view = query?.view === 'list' ? 'list' : 'tile'
  const limit = view === 'list' ? limitList : limitTile
  const { t } = useTranslation('camps')

  return (
    <div>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('title')}
        image="/images/jpg/children-camps-banner.jpg"
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
      <Container>
        <Content>
          <TopBarFilters />
          <CampsList camps={camps} />
          <Pagination
            currentPage={Number(query?.page) || 1}
            count={camps?.count || 1}
            onChange={handlePageChange}
            pageLimit={limit}
          />
        </Content>
      </Container>
      <SeoText data={seoData} />
    </div>
  )
}
const { containers, mqMax } = theme
const BreadcrumbWrapper = styled.div`
  max-width: ${containers.main};
  margin: 20px auto;
  ${mqMax('xl')} {
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
const Content = styled.div``

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const view = query?.view === 'list' ? 'list' : 'tile'
  let limit
  if (view === 'list') {
    limit = limitList
  } else {
    limit = limitTile
  }
  const city = Number(query.city) || undefined,
    country = Number(query.country) || undefined
  const { data } = await $apiCamps.campsCampsList(city, country, limit, pageToOffset(query?.page, limit), {
    params: {},
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('camp', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      camps: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, ['camps', 'buttons', 'pagination'])),
    },
  }
}
export default Camps
