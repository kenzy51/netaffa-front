import React from 'react'
import { $apiCommon, $apiMedicine } from '@app/lib/api'
import { GetServerSideProps } from 'next'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Image from 'next/image'
import locationIcon from 'public/images/svg/location-iconBlue.svg'
import clockIcon from 'public/images/svg/clock-icon.svg'
import phoneIcon from 'public/images/svg/phone-icon.svg'
import mailIcon from 'public/images/svg/mail-icon.svg'
import browserIcon from 'public/images/svg/browser-icon.svg'
import SeoText from '@app/components/ui/SeoText'
import MyMapComponent from '@app/components/ui/map/Map'
import { CommonSeoTextList200Response, MedicalOrganization } from '@app/lib/api/gen'
import MedicineForm from '@app/components/pages/medicine/MedicineForm'
import { defaultLanguage } from '@app/@types/languages'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IMedicalOrgProps {
  medicalOrganization: MedicalOrganization
  seoData?: CommonSeoTextList200Response
}

const Medicine = (props: IMedicalOrgProps) => {
  const { medicalOrganization } = props
  const contacts = [
    {
      icon: locationIcon,
      text: medicalOrganization.addresses[0].address,
    },
    {
      icon: clockIcon,
      text: medicalOrganization.schedule,
    },
    {
      icon: phoneIcon,
      text: medicalOrganization.contacts[0].phone_number,
    },
    {
      icon: mailIcon,
      text: (
        <LinkItem target="_blank" href={medicalOrganization && medicalOrganization?.email?.toString()}>
          {medicalOrganization.email}
        </LinkItem>
      ),
    },
    {
      icon: browserIcon,
      text: (
        <LinkItem target="_blank" href={medicalOrganization.web_site?.toString()}>
          {medicalOrganization.web_site}
        </LinkItem>
      ),
    },
  ]
  const { t } = useTranslation('common')
  const { t: tContacts } = useTranslation('contacts')
  const { t: tForms } = useTranslation('forms')
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const medicalCare = locale === 'ru' ? 'Медицинское обслуживание' : 'Medical care'

  const breadcrumb = [
    { label: main, link: '/' },
    { label: medicalCare, link: '/medicine' },
    { label: medicalOrganization?.name || '' },
  ]

  const latitude = medicalOrganization?.addresses?.[0]?.latitude
  const longitude = medicalOrganization?.addresses?.[0]?.longitude
  const location = [latitude, longitude]
  const imageSource = medicalOrganization?.image || '/path/to/placeholder-image.jpg'

  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        <Title>{medicalOrganization?.name}</Title>
        <ImageWrapper>
          <Image src={imageSource} alt="name" height={570} width={1200} />
        </ImageWrapper>
      </Container>
      <Container>
        <Info>
          <AboutChildrenCamp>
            <DescriptionTitle>{t('description')}</DescriptionTitle>
            <DescriptionText dangerouslySetInnerHTML={{ __html: medicalOrganization?.description }} />
          </AboutChildrenCamp>
          <LeftBlock>
            <Contacts>
              <DescriptionTitle>{tContacts('contactTitle')}</DescriptionTitle>
              <AllContacts>
                {contacts.map((contact, index) => (
                  <ContactItem key={index}>
                    <Image src={contact.icon} alt="contact icon" width={30} height={30} />
                    <p>{contact.text}</p>
                  </ContactItem>
                ))}
              </AllContacts>
            </Contacts>
            <Map>
              <HowToGetText>{tContacts('howToGet')}</HowToGetText>
              <MapWrapper>
                <MyMapComponent location={location} height="294px" />
              </MapWrapper>
            </Map>
          </LeftBlock>
        </Info>
      </Container>
      <MedicineForm>{tForms('consultationTitle')}</MedicineForm>
      <SeoText data={props.seoData} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const { data } = await $apiMedicine.medicineMedicalOrganizationsRead(slug as string, {
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
      medicalOrganization: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'forms',
        'common',
        'buttons',
        'contacts',
        'validationForm',
      ])),
    },
  }
}

const { containers, mqMax, colors } = theme
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
`
const MapWrapper = styled.div`
  width: 384px;
  display: flex;
  ${mqMax('md')} {
    width: 100%;
  }
`
const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
`
export const ImageWrapper = styled.div`
  max-width: 1200px;
  border-radius: 110px;
  margin: 0 auto;
  height: auto;

  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }

  ${theme.mqMax('md')} {
    height: 300px;
  }

  ${theme.mqMax('sm')} {
    object-fit: contain;
    max-height: 153px;
    //width: 100vw;
  }
`
const AboutChildrenCamp = styled.div`
  max-width: 770px;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: Roboto, sans-serif;

  p {
    font-size: 16px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
  }

  ${mqMax('sm')} {
    p {
      font-size: 12px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
    }

    gap: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`

const AllContacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${mqMax('sm')} {
    gap: 8px;
  }
`
const Contacts = styled.div`
  align-items: flex-start;

  ${mqMax('md')} {
    display: flex;
    align-items: flex-start !important;
    flex-direction: column;
  }
`

const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;

  ${mqMax('xl')} {
    padding: 0 13px;
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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 108.333% */
    letter-spacing: -0.12px;
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
  }

  ${mqMax('sm')} {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.9px;
    margin-bottom: 8px;
    margin-top: -6px;
  }
`

const DescriptionText = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  max-width: 789px;
  color: ${colors.gray_200};

  ${mqMax('sm')} {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`

const BreadcrumbWrapper = styled.div`
  margin: 20px 0;

  ${mqMax('md')} {
    margin: 15px 0;
  }
`

const Info = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 40px;
  margin-bottom: 40px;

  ${mqMax('md')} {
    flex-direction: column;
    row-gap: 20px;
    margin-top: 20px;
  }

  ${mqMax('sm')} {
    margin-bottom: 40px;
  }
`

const LinkItem = styled.a`
  color: ${colors.primary};
`

export default Medicine
