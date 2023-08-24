import React from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'
import locationIcon from 'public/images/svg/location-iconBlue.svg'
import clockIcon from 'public/images/svg/clock-icon.svg'
import phoneIcon from 'public/images/svg/phone-icon.svg'
import mailIcon from 'public/images/svg/mail-icon.svg'
import browserIcon from 'public/images/svg/browser-icon.svg'
import useMediaQuery from '@app/hooks/useMediaQuery'
import FacebookIcon from 'public/images/svg/social-media/facebook.svg'
import TwitterIcon from 'public/images/svg/social-media/twitter.svg'
import YoutubeIcon from 'public/images/svg/social-media/youtube.svg'
import TelegramIcon from 'public/images/svg/social-media/telegram.svg'
import MyMapComponent from '@app/components/ui/map/Map'
import Branches from '@app/components/pages/contacts/Branches'
import SeoText from '@app/components/ui/SeoText'
import ContactForm from '@app/components/pages/contacts/ContactForm'
import { GetServerSideProps } from 'next'
import { $apiCommon, $apiContacts } from '@app/lib/api'
import { Branch, CommonSeoTextList200Response, ContactsBranchesList200Response } from '@app/lib/api/gen'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IContactProps {
  contactsData: ContactsBranchesList200Response
  mainBranch: Branch
  seoData?: CommonSeoTextList200Response
}

const Contact = ({ contactsData, mainBranch, seoData }: IContactProps) => {
  const mainBranchLatitude: number = mainBranch.latitude
  const mainBranchLongitude: number = mainBranch.longitude
  const location = [mainBranchLatitude, mainBranchLongitude]
  const md = useMediaQuery('md')
  const { t } = useTranslation('contacts')
  const height = md ? '290px' : '500px'
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const contact = locale === 'ru' ? 'Контакты' : 'Contacts'
  const breadcrumb = [{ label: main, link: '/' }, { label: contact }]
  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        <Title>{t('contactTitle')}</Title>
        <h2>{!md ? '' : t('mainBranch')}</h2>
      </Container>
      <MapContainer>
        <MyMapComponent location={location} height={height} />
        <ContactInfo>
          <DescriptionTitle>{md ? '' : t('mainBranch')}</DescriptionTitle>
          <AllContacts>
            <ContactItem>
              <Image src={locationIcon} alt="contact icon" width={30} height={30} />
              <p>{mainBranch.address}</p>
            </ContactItem>
            <ContactItem>
              <Image src={clockIcon} alt="contact icon" width={30} height={30} />
              <p>{mainBranch.schedule}</p>
            </ContactItem>
            {mainBranch &&
              mainBranch.contacts?.map((contact, index) => (
                <ContactItem key={index}>
                  <Image src={phoneIcon} alt="contact icon" width={30} height={30} />
                  <p>{contact.phone_number}</p>
                </ContactItem>
              ))}
            <ContactItem>
              <Image src={mailIcon} alt="contact icon" width={30} height={30} />
              <Link href={`mailto:${mainBranch.email}`} target="_blank">
                {mainBranch.email}
              </Link>
            </ContactItem>{' '}
            <ContactItem>
              <Image src={browserIcon} alt="contact icon" width={30} height={30} />
              {!!mainBranch?.web_site && (
                <Link href={mainBranch?.web_site?.toString()} target="_blank">
                  {mainBranch.web_site}
                </Link>
              )}
            </ContactItem>
          </AllContacts>
          <Line />
          <SocialContainer>
            <HowToGetText>{t('socialMedias')}</HowToGetText>
            <FooterBottomLeft>
              {!!mainBranch.facebook && (
                <Link href={mainBranch?.facebook?.toString()} target="_blank">
                  <Image src={FacebookIcon} alt="icon" width={24} height={24} />
                </Link>
              )}
              {!!mainBranch.twitter && (
                <Link href={mainBranch?.twitter?.toString()} target="_blank">
                  <Image src={TwitterIcon} alt="icon" width={24} height={24} />
                </Link>
              )}
              {!!mainBranch.youtube && (
                <Link href={mainBranch?.youtube?.toString()} target="_blank">
                  <Image src={YoutubeIcon} alt="icon" width={24} height={24} />
                </Link>
              )}
              {!!mainBranch.telegram && (
                <Link href={mainBranch?.telegram?.toString()} target="_blank">
                  <Image src={TelegramIcon} alt="icon" width={24} height={24} />
                </Link>
              )}
            </FooterBottomLeft>
          </SocialContainer>
        </ContactInfo>
      </MapContainer>
      <Container>
        {md ? (
          <>
            <AllContacts>
              <ContactItem>
                <Image src={locationIcon} alt="contact icon" width={30} height={30} />
                <p>{mainBranch.address}</p>
              </ContactItem>
              <ContactItem>
                <Image src={clockIcon} alt="contact icon" width={30} height={30} />
                <p>{mainBranch.schedule}</p>
              </ContactItem>
              {mainBranch &&
                mainBranch.contacts?.map((contact, index) => (
                  <ContactItem key={index}>
                    <Image src={phoneIcon} alt="contact icon" width={30} height={30} />
                    <p>{contact.phone_number}</p>
                  </ContactItem>
                ))}
              <ContactItem>
                <Image src={mailIcon} alt="contact icon" width={30} height={30} />
                <Link href={`mailto:${mainBranch.email}`} target="_blank">
                  {mainBranch.email}
                </Link>
              </ContactItem>{' '}
              <ContactItem>
                <Image src={browserIcon} alt="contact icon" width={30} height={30} />
                {!!mainBranch?.web_site && (
                  <Link href={mainBranch?.web_site?.toString()} target="_blank">
                    {mainBranch.web_site}
                  </Link>
                )}
              </ContactItem>
            </AllContacts>
            <SocialContainer>
              <HowToGetText>{t('socialMedias')}</HowToGetText>
              <FooterBottomLeft>
                {!!mainBranch.facebook && (
                  <Link href={mainBranch?.facebook?.toString()} target="_blank">
                    <Image src={FacebookIcon} alt="icon" width={24} height={24} />
                  </Link>
                )}
                {!!mainBranch.twitter && (
                  <Link href={mainBranch?.twitter?.toString()} target="_blank">
                    <Image src={TwitterIcon} alt="icon" width={24} height={24} />
                  </Link>
                )}
                {!!mainBranch.youtube && (
                  <Link href={mainBranch?.youtube?.toString()} target="_blank">
                    <Image src={YoutubeIcon} alt="icon" width={24} height={24} />
                  </Link>
                )}
                {!!mainBranch.telegram && (
                  <Link href={mainBranch?.telegram?.toString()} target="_blank">
                    <Image src={TelegramIcon} alt="icon" width={24} height={24} />
                  </Link>
                )}
              </FooterBottomLeft>
            </SocialContainer>
          </>
        ) : null}
        <Branches branchText={t('branches')} branchesData={contactsData} />
      </Container>
      <ContactFormWrapper>
        <ContactForm />
      </ContactFormWrapper>
      <SeoText data={seoData} />
    </div>
  )
}

const { containers, mqMax, colors } = theme

const BreadcrumbWrapper = styled.div`
  margin: 20px 0;
  ${mqMax('md')} {
    margin: 15px 0;
  }
`
const MapContainer = styled.div`
  position: relative;
  width: 100%;
`
const SocialContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${mqMax('md')} {
    margin-bottom: 40px;
  }
`
const ContactInfo = styled.div`
  padding: 30px;
  position: absolute;
  margin-top: 45px;
  margin-bottom: 35px;
  margin-right: 300px;
  background: white;
  right: 0;
  top: 0;
  width: 414px;
  height: 420px;
  border-radius: 10px;

  ${mqMax('xxl')} {
    margin-right: 100px;
  }
  ${mqMax('xl')} {
    margin-right: -20px;
    transform: scale(0.8);
  }
  ${mqMax('md')} {
    display: none;
  }
`
const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 351px;
  margin-top: 20px;
`

const HowToGetText = styled.div`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.09px;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: Roboto, sans-serif;
  a {
    color: ${colors.primary};
  }
  p {
    font-size: 16px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    color: ${colors.gray_200};
  }
  ${mqMax('sm')} {
    p {
      font-size: 14px;
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
  ${mqMax('md')} {
    margin-top: 8px;
    gap: 8px;
  }
`

const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  h2 {
    margin-top: -10px;
    margin-bottom: 5px;
  }
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
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
  }
`

const FooterBottomLeft = styled.div`
  display: flex;
  gap: 32px;

  ${mqMax('md')} {
    margin-top: 0;
  }
`

const DescriptionTitle = styled.h4`
  font-size: 24px;
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
`

const ContactFormWrapper = styled.div`
  margin-top: 70px;

  ${theme.mqMax('md')} {
    margin-top: 40px;
  }
`
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await $apiContacts.contactsBranchesList()
  const branchData = await $apiContacts.contactsBranchesRead(1)
  const { data: seoData } = await $apiCommon.commonSeoTextList('contacts', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      contactsData: data,
      mainBranch: branchData.data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, ['contacts', 'forms', 'buttons', 'validationForm'])),
    },
  }
}
export default Contact
