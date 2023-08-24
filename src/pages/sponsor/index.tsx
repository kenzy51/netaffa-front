import React, { useRef } from 'react'
import { theme } from '@app/styles/theme'
import LetterIcon from 'public/images/svg/letters/С.svg'
import SignIcon from 'public/images/svg/signs/sponsor.svg'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Banner from '@app/components/ui/Banner'
import ProjectGoals from '@app/components/pages/home/ProjectGoals'
import SeoText from '@app/components/ui/SeoText'
import Banner1 from 'public/images/jpg/video-banner.jpg'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiSponsor } from '@app/lib/api'
import PartnershipPrograms from '@app/components/pages/sponsor/PartnershipPrograms'
import SponsorForm from '@app/components/pages/sponsor/SponsorForm'
import VideoPlayer from '@app/components/ui/Video'
import { CommonSeoTextList200Response, SponsorSponsorsList200Response } from '@app/lib/api/gen'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface ISponsorPrograms {
  sponsorPrograms?: SponsorSponsorsList200Response
  seoData?: CommonSeoTextList200Response
}
const Sponsor = ({ sponsorPrograms, seoData }: ISponsorPrograms) => {
  const { current: videoUrl } = useRef('https://www.youtube.com/embed/pRJ-Dai3oB0')
  const isMobile = useMediaQuery('sm')
  const { t } = useTranslation('sponsor')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const sponsor = locale === 'ru' ? 'Спонсору' : 'To Sponsor'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: sponsor }])

  return (
    <>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('title')}
        image="/images/jpg/sponsor1-banner.jpg"
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
        }}
      />
      <Container>
        <Content>
          <Title>{t('titleDesc')}</Title>
          <DescriptionText>{t('desc')}</DescriptionText>
          <div style={{ marginTop: '40px' }}>
            <VideoPlayer iframeOrVideo="video" bannerImage={Banner1} videoUrl={videoUrl} />
          </div>
          <ProjectGoals showSign={!!isMobile} />
        </Content>
        <PartnershipPrograms sponsorPrograms={sponsorPrograms} />
      </Container>
      <br />
      <SponsorForm sponsorPrograms={sponsorPrograms} />
      <SeoText data={seoData} />
    </>
  )
}
const { containers, mqMax, colors } = theme
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await $apiSponsor.sponsorSponsorsList(undefined, undefined, {
    params: {},
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('sponsor', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      sponsorPrograms: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'projectGoal',
        'buttons',
        'sponsor',
        'forms',
        'validationForm',
      ])),
    },
  }
}
const BreadcrumbWrapper = styled.div`
  max-width: ${containers.main};
  margin: 20px auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const DescriptionText = styled.p`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};
  ${mqMax('sm')} {
    font-size: 14px;
  }
`
const Title = styled.h1`
  font-size: 46px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: -0.324px;
  color: ${colors.dark};
  margin-bottom: 30px;
  ${mqMax('sm')} {
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 40px auto 70px;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
  ${mqMax('md')} {
    margin: 40px auto;
  }
`
const Content = styled.div``

export default Sponsor
