import React, { useRef } from 'react'
import { theme } from '@app/styles/theme'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Banner from '@app/components/ui/Banner'
import LetterIcon from 'public/images/svg/letters/П.svg'
import SignIcon from 'public/images/svg/signs/psycho-support.svg'
import PsychoSupportItems from '@app/components/pages/psychologics/PsychologicalSupport'
import useMediaQuery from '@app/hooks/useMediaQuery'
import SeoText from '@app/components/ui/SeoText'
import PsychologicalForm from '@app/components/pages/psychologics/PsychologicalForm'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { $apiCommon } from '@app/lib/api'
import { CommonSeoTextList200Response } from '@app/lib/api/gen'
interface ISeoData {
  seoData?: CommonSeoTextList200Response
}
const PsychologicalSupport = ({ seoData }: ISeoData) => {
  const isMobile = useMediaQuery('sm')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const psy = locale === 'ru' ? 'Психологическая помощь' : 'Psychological help'

  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: psy }])
  const { t } = useTranslation('psychologicalHelp')
  return (
    <div>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('mainTitle')}
        image={!isMobile ? '/images/jpg/psychological-banner.jpg' : '/images/jpg/psycho-bannerMobile.jpg'}
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
          <Title>{t('title')} </Title>
          <DescriptionText>{t('desc1')}</DescriptionText>
          <PsychoSupportItems />
        </Content>
      </Container>
      <PsychologicalForm />
      <SeoText data={seoData} />
    </div>
  )
}
const { containers, mqMax, colors } = theme
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
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: -10px;
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
    margin-top: -25px;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
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
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await $apiCommon.commonSeoTextList('psychological_help', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      seoData: data,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'psychologicalHelp',
        'forms',
        'buttons',
        'validationForm',
      ])),
    },
  }
}
export default PsychologicalSupport
