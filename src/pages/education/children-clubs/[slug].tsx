import React, { useRef } from 'react'
import { GetServerSideProps } from 'next'
import { $apiChildrenClubs, $apiCommon } from '@app/lib/api'
import { ChildrenClub, CommonSeoTextList200Response } from '@app/lib/api/gen'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'
import InlineSVG from 'react-inlinesvg'
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
import ChildrenClubForm from '@app/components/pages/education/children-clubs/ChildrenClubForm'
import SeoText from '@app/components/ui/SeoText'
import { defaultLanguage } from '@app/@types/languages'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface IChildrenClubProps {
  childrenClub?: ChildrenClub
  seoData?: CommonSeoTextList200Response
}

const Club = (props: IChildrenClubProps) => {
  const { childrenClub } = props
  const md = useMediaQuery('md')
  const latitude = childrenClub?.addresses?.[0]?.latitude
  const longitude = childrenClub?.addresses?.[0]?.longitude
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const education = locale === 'ru' ? 'Учеба' : 'Education'
  const clubsText = locale === 'ru' ? 'Кружки для детей' : 'Children clubs'
  const { t: tContacts } = useTranslation('contacts')
  const { t: tClub } = useTranslation('childrenClub')
  const { t: tForm } = useTranslation('forms')
  const { current: breadcrumb } = useRef([
    { label: main, link: '/' },
    { label: education },
    { label: clubsText, link: '/education/children-clubs' },
    { label: childrenClub?.name || '' },
  ])

  const location = [latitude, longitude]
  const socialMedia = [
    {
      icon: FacebookIcon,
      link: childrenClub?.facebook,
    },
    {
      icon: TwitterIcon,
      link: childrenClub?.twitter,
    },
    {
      icon: YoutubeIcon,
      link: childrenClub?.youtube,
    },
    {
      icon: TelegramIcon,
      link: childrenClub?.telegram,
    },
  ]
  const contacts = [
    {
      icon: locationIcon,
      text: childrenClub?.addresses?.[0]?.address || '',
    },
    {
      icon: clockIcon,
      text: childrenClub?.youtube,
    },
    {
      icon: phoneIcon,
      text: childrenClub?.contacts?.[0]?.phone_number || '',
    },
    {
      icon: mailIcon,
      text: (
        <Link href={childrenClub?.email ? `mailto:${childrenClub.email.toString()}` : ''}>{childrenClub?.email}</Link>
      ),
    },
    {
      icon: browserIcon,
      text: <Link href={childrenClub?.web_site ? childrenClub.web_site.toString() : ''}>{childrenClub?.web_site}</Link>,
    },
  ]
  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        {!md && <Title>{childrenClub && childrenClub.name}</Title>}
      </Container>
      <ImageBanner banner={childrenClub && childrenClub.banner} />
      <Container>
        <Info>
          <AboutChildrenCamp>
            <DescriptionTitle>{tClub('aboutClub')}</DescriptionTitle>
            {md != undefined && childrenClub?.description ? (
              <DescriptionText dangerouslySetInnerHTML={{ __html: childrenClub.description }} />
            ) : (
              <DescriptionText>{childrenClub?.description}</DescriptionText>
            )}

            <DescriptionTitle style={{ marginTop: '30px' }}>{tClub('requirements')}</DescriptionTitle>
            {md != undefined && childrenClub?.requirements ? (
              <DescriptionText dangerouslySetInnerHTML={{ __html: childrenClub.requirements }} />
            ) : (
              <DescriptionText>{childrenClub?.requirements}</DescriptionText>
            )}
          </AboutChildrenCamp>
          <Contacts>
            <DescriptionTitle>{tContacts('contactTitle')}</DescriptionTitle>
            <AllContacts>
              {contacts.map((contact, index) => (
                <ContactItem key={index}>
                  {/* <InlineSVG /> */}
                  <Image src={contact.icon} alt="contact icon" width={30} height={30} />
                  <p>{contact.text}</p>
                </ContactItem>
              ))}
            </AllContacts>

            <Map>
              <HowToGetText>{tContacts('howToGet')}</HowToGetText>
              <MapWrapper>
                <MyMapComponent location={location} height="294px" />
              </MapWrapper>

              <HowToGetText>{tContacts('age')}</HowToGetText>
              <AgeRange>
                {' '}
                {childrenClub && childrenClub.age_range} {tContacts('years')}
              </AgeRange>
              <Line />
              <HowToGetText>{tContacts('socialMedias')}</HowToGetText>
              <FooterBottomLeft>
                {socialMedia.map((item, i) => (
                  <Link href={item.link || ''} key={i}>
                    <InlineSVG src={item.icon.src} />
                  </Link>
                ))}
              </FooterBottomLeft>
            </Map>
          </Contacts>
        </Info>
      </Container>
      <ChildrenClubForm>
        {tForm('sign')}
        <br />
        {tForm('inClub')}
      </ChildrenClubForm>
      <SeoText data={props.seoData} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const { data } = await $apiChildrenClubs.childrenClubsChildrenClubsRead(slug as string, {
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('children_club', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      childrenClub: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'childrenClub',
        'contacts',
        'forms',
        'buttons',
        'validationForm',
      ])),
    },
  }
}

const { containers, mqMax, colors } = theme

const MapWrapper = styled.div`
  ${mqMax('md')} {
    width: 100%;
    margin-bottom: 20px;
  }
  ${mqMax('sm')} {
    margin-bottom: 15px;
  }
`
const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 381px;
  //margin-top: 20px;
  ${mqMax('md')} {
    margin-top: 0;
    width: 100%;
  }
`

const AgeRange = styled.h2`
  font-size: 24px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.12px;
  color: var(--color-text, #38496c);

  ${mqMax('sm')} {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
  }
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
    width: 100%;
    gap: 8px;
    min-width: 270px;
  }
`

const ImageBanner = styled.div<{ banner?: string }>`
  width: 100%;
  height: 500px;
  background-image: ${({ banner }) => `url(${banner})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  ${mqMax('md')} {
    height: 200px;
    padding: 0 13px;
  }
  ${mqMax('md')} {
    height: 130px;
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
  ${mqMax('sm')} {
    margin-top: -4px;
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
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
    margin-bottom: 5px;
    margin-top: -5px;
  }
`

const DescriptionText = styled.p`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
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
  margin-bottom: 70px;
  ${mqMax('md')} {
    flex-direction: column;
    row-gap: 20px;
    margin-top: 20px;
  }
  ${mqMax('sm')} {
    margin-bottom: 40px;
  }
`

const FooterBottomLeft = styled.div`
  display: flex;
  gap: 32px;

  ${mqMax('md')} {
    margin-top: 0;
  }
`

export default Club
