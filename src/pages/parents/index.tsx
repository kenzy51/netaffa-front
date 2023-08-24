import React, { useRef } from 'react'
import { theme } from '@app/styles/theme'
import { styled } from 'styled-components'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Banner from '@app/components/ui/Banner'
import LetterIcon from 'public/images/svg/letters/Р.svg'
import SignIcon from 'public/images/svg/signs/parents.svg'
import Capabilities from '@app/components/pages/home/Capabilities'
import SeoText from '@app/components/ui/SeoText'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { GetServerSideProps } from 'next'
import DaddyImage from 'public/images/png/daddy.png'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { $apiCommon } from '@app/lib/api'
import { CommonSeoTextList200Response } from '@app/lib/api/gen'

interface ISeoData {
  seoData?: CommonSeoTextList200Response
}
const Parents = ({ seoData }: ISeoData) => {
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const parents = locale === 'ru' ? 'Родители' : 'Parents'
  const { current: breadcrumb } = useRef([{ label: main, link: '/' }, { label: parents }])
  const isMobile = useMediaQuery('md')
  const { t } = useTranslation('parents')
  return (
    <div>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumb} />
      </BreadcrumbWrapper>
      <Banner
        title={t('mainTitle')}
        image={!isMobile ? '/images/jpg/parents-banner.jpg' : '/images/jpg/parents-bannerMobile.jpg'}
        deafInfo={{
          letter: LetterIcon,
          sign: SignIcon,
          signStyles: {
            right: '50%!important',
            bottom: 0,
            transform: 'translateX(50%)',
          },
        }}
      />
      <Container>
        <Content>
          <Title>{t('whatHelpTitle')} </Title>
          <TextWrapper>
            <div>
              <TextWithImage>
                <DescriptionText>{t('whatHelpDesc')}</DescriptionText>
                {isMobile ? <Image src={DaddyImage} alt="daddy" placeholder="blur" /> : null}
              </TextWithImage>
            </div>
            {!isMobile ? <Image src={DaddyImage} alt="daddy" placeholder="blur" /> : null}
          </TextWrapper>

          <SmallTitle>{t('getHelpTitle')}</SmallTitle>
          <DescriptionText>{t('getHelpDesc')}</DescriptionText>

          <Capabilities />
        </Content>
      </Container>
      <br />
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

const TextWrapper = styled.div`
  display: flex;
  gap: 20px;
  img {
    grid-column-start: 2;
    grid-row: span 2;

    ${theme.mqMax('md')} {
      width: 81px;
      height: 114px;
    }
  }
`
const TextWithImage = styled.div`
  display: flex;
`

const DescriptionText = styled.p`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};
  padding: 5px 0;
  ${mqMax('sm')} {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: -10px;
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
  ${mqMax('sm')} {
    margin-top: -25px;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
  }
`
const SmallTitle = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;

  font-family: Roboto, sans-serif;
  font-weight: 700;

  color: ${colors.dark};
  font-size: 32px;
  line-height: 38px;
  ${mqMax('sm')} {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 18px;
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
  const { data } = await $apiCommon.commonSeoTextList('partners', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      seoData: data,
      ...(await serverSideTranslations(locale || defaultLanguage, ['parents', 'opportunities', 'buttons'])),
    },
  }
}
export default Parents
