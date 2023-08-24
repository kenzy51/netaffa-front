import React from 'react'
import { $apiCareer, $apiCommon } from '@app/lib/api'
import { CommonSeoTextList200Response, Specialty } from '@app/lib/api/gen/index'
import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import VideoPlayer from '@app/components/ui/Video'
import useMediaQuery from '@app/hooks/useMediaQuery'
import FormSection from '@app/components/pages/home/Form'
import Image from 'next/image'
import SeoText from '@app/components/ui/SeoText'
import { defaultLanguage } from '@app/@types/languages'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface ICareerProps {
  careerVacancy?: Specialty
  seoData?: CommonSeoTextList200Response
}

const Vacancy = (props: ICareerProps) => {
  const { careerVacancy } = props
  const md = useMediaQuery('md')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const career = locale === 'ru' ? 'Карьера' : 'Career'
  const breadcrumb = [
    { label: main, link: '/' },
    { label: career, link: '/career' },
    { label: careerVacancy?.name || '' },
  ]
  const { t } = useTranslation('common')

  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        {!md && <Title>{careerVacancy?.name}</Title>}
        {careerVacancy?.image && careerVacancy?.video && (
          <VideoPlayer
            styles={{
              videoWrapper: {
                maxHeight: '570px',
              },
            }}
            iframeOrVideo="video"
            bannerImage={careerVacancy.image}
            videoUrl={careerVacancy.video}
          />
        )}
        <Info>
          <DescriptionWrapper>
            <DescriptionTitle>{t('description')}</DescriptionTitle>

            {md != undefined && careerVacancy?.description ? (
              <DescriptionText dangerouslySetInnerHTML={{ __html: careerVacancy?.description }} />
            ) : null}

            {careerVacancy?.image && (
              <DescriptionImage src={careerVacancy.image} alt="image" width={789} height={375} />
            )}
          </DescriptionWrapper>
          <FilesWrapper>
            <FilesTitle>{t('requirements')}</FilesTitle>
            <Map>
              {careerVacancy?.requirements?.map((req) => (
                <MapItem label={req.name} value={req.description} key={req.id} />
              ))}
            </Map>
          </FilesWrapper>
        </Info>
      </Container>
      <FormSection />
      <SeoText data={props.seoData} />
    </div>
  )
}

const { containers, mqMax, colors } = theme

const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 100%;

  ${mqMax('sm')} {
    margin-top: 0;
  }
`

const DescriptionImage = styled(Image)`
  width: 100%;
  height: 375px;
  border-radius: 10px;
  margin: 18px 0;
  object-fit: cover;
  ${mqMax('lg')} {
    margin: 10px 0;
  }
  ${mqMax('sm')} {
    margin: 5px 0;
    max-height: 180px;
  }
`

const AgeRange = styled.h2`
  color: var(--color-text, #38496c);
  /* Text - 16 */
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
`

const HowToGetText = styled.div`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.09px;
`

const Map = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${mqMax('md')} {
    gap: 8px;
  }
`

const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('xl')} {
    padding: 0 13px;
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
  gap: 20px;
  margin-top: 30px;
  ${mqMax('md')} {
    flex-direction: column;
    row-gap: 20px;
    margin-top: 20px;
  }
`

const DescriptionWrapper = styled.div`
  width: 100%;
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
  }
  ${mqMax('sm')} {
    margin-bottom: 8px;
    margin-top: -5px;
  }
`

const DescriptionText = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};
  ${mqMax('sm')} {
    font-size: 14px;
    line-height: 150%;
  }
`

const FilesWrapper = styled.div`
  max-width: 384px;
  width: 100%;
  ${mqMax('lg')} {
    max-width: 100%;
  }
`

const FilesTitle = styled(DescriptionTitle)``

const MapItem = ({ label, value }: { label: string; value?: string }) => (
  <>
    <HowToGetText>{label}</HowToGetText>
    <AgeRange>{value}</AgeRange>
    <Line />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { data } = await $apiCareer.careerVacanciesRead(query.slug as string, {
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
      careerVacancy: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'forms',
        'common',
        'buttons',
        'breadCrumbs',
        'validationForm',
      ])),
    },
  }
}

export default Vacancy
