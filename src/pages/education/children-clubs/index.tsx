import React, { useRef } from 'react'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import { $apiChildrenClubs, $apiCommon } from '@app/lib/api'
import TopBarFilters from '@app/components/pages/education/children-clubs/TopBarFilters'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import { ChildrenClubsChildrenClubsList200Response, CommonSeoTextList200Response } from '@app/lib/api/gen'
import { theme } from '@app/styles/theme'
import ChildrenClubsList from '@app/components/pages/education/children-clubs/List'
import SeoText from '@app/components/ui/SeoText'
import Pagination from '@app/components/Pagination'
import { useRouter } from 'next/router'
import { pageToOffset } from '@app/lib/helpers/offsetToPage'
import { defaultLanguage } from '@app/@types/languages'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LetterIcon from '../../../../public/images/svg/letters/К.svg'
import SignIcon from '../../../../public/images/svg/signs/childrenClubSvg.svg'
import BannerChildrenClub from '@app/components/pages/education/children-clubs/BannerChildrenClub'
import { useTranslation } from 'next-i18next'

interface IChildrenClubsProps {
  clubs?: ChildrenClubsChildrenClubsList200Response
  seoData?: CommonSeoTextList200Response
}
const limitTile = 16
const limitList = 7
const ChildrenClubs = ({ clubs, seoData }: IChildrenClubsProps) => {
  const { query, pathname, push, locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const education = locale === 'ru' ? 'Учеба' : 'Education'
  const clubsText = locale === 'ru' ? 'Кружки для детей' : 'Children clubs'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: education }, { label: clubsText }])
  const view = query?.view === 'list' ? 'list' : 'tile'
  const handlePageChange = async (page: number) => {
    await push({
      pathname,
      query: { ...query, page },
    })
  }
  const limit = view === 'list' ? limitList : limitTile
  const { t } = useTranslation('childrenClub')

  return (
    <>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <BannerChildrenClub
        title={t('mainTitle')}
        image="/images/png/childrenClubBanner.png"
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
        }}
      />
      <Container>
        <Content>
          <TopBarFilters />
          <ChildrenClubsList clubs={clubs} view={view} limit={limit} />
          <Pagination
            currentPage={Number(query?.page) || 1}
            count={clubs?.count || 1}
            onChange={handlePageChange}
            pageLimit={limit}
          />
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
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
// const BannerWrapper = styled.div`
//   img {
//     width: 100%;
//     height: ${theme.vw(306)};
//     object-fit: cover;
//   }
// `
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
  const { data } = await $apiChildrenClubs.childrenClubsChildrenClubsList(
    city,
    country,
    limit,
    pageToOffset(query?.page, limit),
    {
      params: {},
      headers: {
        'Accept-Language': locale || defaultLanguage,
      },
    }
  )
  const { data: seoData } = await $apiCommon.commonSeoTextList('children_club', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      clubs: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, ['pagination', 'buttons', 'childrenClub'])),
    },
  }
}

export default ChildrenClubs
