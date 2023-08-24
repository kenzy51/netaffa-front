import React, { useRef } from 'react'
import { $apiCamps, $apiCommon } from '@app/lib/api'
import { GetServerSideProps } from 'next'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'
import InlineSVG from 'react-inlinesvg'
import locationIcon from 'public/images/svg/location-iconBlue.svg'
import phoneIcon from 'public/images/svg/phone-icon.svg'
import mailIcon from 'public/images/svg/mail-icon.svg'
import browserIcon from 'public/images/svg/browser-icon.svg'
import FacebookIcon from 'public/images/svg/social-media/facebook.svg'
import TwitterIcon from 'public/images/svg/social-media/twitter.svg'
import YoutubeIcon from 'public/images/svg/social-media/youtube.svg'
import TelegramIcon from 'public/images/svg/social-media/telegram.svg'
import SeoText from '@app/components/ui/SeoText'
import MyMapComponent from '@app/components/ui/map/Map'
import { Camp, CommonSeoTextList200Response } from '@app/lib/api/gen'
import CampForm from '@app/components/pages/camps/CampForm'
import SwiperBanner from '@app/components/pages/camps/SwiperBanner'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultLanguage } from '@app/@types/languages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IChildrenCampProps {
  childrenCamp?: Camp
  seoData: CommonSeoTextList200Response
}

const Camp = (props: IChildrenCampProps) => {
  const { childrenCamp } = props
  const { t: tCommon } = useTranslation('common')
  const { t: tCamps } = useTranslation('camps')
  const { t: tContacts } = useTranslation('contacts')
  const { t: tForms } = useTranslation('forms')
  const socialMedia = useRef([
    {
      icon: FacebookIcon,
      link: childrenCamp?.facebook || '#',
    },
    {
      icon: TwitterIcon,
      link: childrenCamp?.twitter || '#',
    },
    {
      icon: YoutubeIcon,
      link: childrenCamp?.youtube || '#',
    },
    {
      icon: TelegramIcon,
      link: childrenCamp?.telegram || '#',
    },
  ])
  const email = childrenCamp?.email ?? ''
  const website = childrenCamp?.web_site ?? ''
  const contacts = [
    {
      icon: locationIcon,
      text: `${childrenCamp?.city_name}, ${childrenCamp?.addresses?.[0].address}`,
    },
    {
      icon: phoneIcon,
      text: childrenCamp?.contacts?.[0]?.phone_number || '',
    },
    {
      icon: mailIcon,
      text: (
        <LinkItem target="_blank" href={`mailto:${childrenCamp?.email}`}>
          {email}
        </LinkItem>
      ),
    },
    {
      icon: browserIcon,
      text: (
        <LinkItem target="_blank" href={website}>
          {website}
        </LinkItem>
      ),
    },
  ]

  const latitude = childrenCamp?.addresses?.[0]?.latitude
  const longitude = childrenCamp?.addresses?.[0]?.longitude
  const location = [latitude, longitude]
  const { locale } = useRouter()
  const main = locale === 'ru' ? 'Главная' : 'Home'
  const camps = locale === 'ru' ? 'Лагеря' : 'Camps'
  const campsChildren = locale === 'ru' ? 'Лагеря для детей' : 'Camps for children'
  const breadcrumb = [
    { label: main, link: '/' },
    { label: camps, link: '/camps' },
    { label: campsChildren },
    { label: childrenCamp?.name || '' },
  ]

  const description = childrenCamp?.description
  return (
    <div>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        <Title>{childrenCamp?.name}</Title>
      </Container>
      <SwiperBanner banners={childrenCamp?.banners ?? []} />
      <Container>
        <Info>
          <AboutChildrenCamp>
            <DescriptionTitle>{tCamps('aboutCamp')}</DescriptionTitle>
            <DescriptionText dangerouslySetInnerHTML={{ __html: description || '' }} />
            <DescriptionTitle style={{ marginTop: '30px' }}>{tCommon('requirements')}</DescriptionTitle>
            <MenuList>
              {childrenCamp?.requirements?.map((req) => (
                <MenuItem key={req.id}>
                  <span />
                  <DescriptionText>
                    {req.name}: {req.description}
                  </DescriptionText>
                </MenuItem>
              ))}
            </MenuList>
          </AboutChildrenCamp>
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
            <Map>
              <HowToGetText>{tContacts('howToGet')}</HowToGetText>
              <MapWrapper>
                <MyMapComponent location={location} height="294px" />
              </MapWrapper>
              <HowToGetText>{tContacts('age')}</HowToGetText>
              <AgeRange>
                {childrenCamp?.age_range} {tContacts('years')}
              </AgeRange>
              <Line />
              <HowToGetText>{tContacts('campDuration')}</HowToGetText>
              <AgeRange>
                {!!childrenCamp?.start_date &&
                  format(parseISO(childrenCamp.start_date), 'd MMMM', {
                    locale: ru,
                  })}
                {' - '}
                {!!childrenCamp?.end_date &&
                  format(parseISO(childrenCamp.end_date), 'd MMMM', {
                    locale: ru,
                  })}
              </AgeRange>
              <Line />
              <HowToGetText>{tContacts('price')}</HowToGetText>
              <AgeRange>{childrenCamp?.price} KGS</AgeRange>
              <Line />
              <HowToGetText>{tContacts('campInSocial')}</HowToGetText>
              <FooterBottomLeft>
                {socialMedia.current.map((item, i) => (
                  <Link target="_blank" href={item.link} key={i}>
                    <InlineSVG src={item.icon.src} />
                  </Link>
                ))}
              </FooterBottomLeft>
            </Map>
          </Contacts>
        </Info>
      </Container>
      <CampForm>
        {' '}
        {tForms('sign')}
        <br />
        {tForms('inCamp')}
      </CampForm>
      <SeoText data={props.seoData} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const { data } = await $apiCamps.campsCampsRead(slug as string, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('camp', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      childrenCamp: data,
      seoData: seoData,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'camps',
        'contacts',
        'common',
        'forms',
        'buttons',
        'validationForm',
      ])),
    },
  }
}

const { containers, mqMax, colors } = theme

const MenuList = styled.ul`
  list-style: circle;
  padding-left: 10px;
`

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 7px;

  span {
    width: 4px;
    height: 4px;
    background: ${colors.gray_200};
    border-radius: 100%;
    //padding: 5px;
  }
`

const MapWrapper = styled.div`
  ${mqMax('sm')} {
    width: 100%;
    margin-bottom: 15px;
  }
`
const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 381px;
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

const AboutChildrenCamp = styled.div`
  max-width: 770px;
`

const ContactItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
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
    margin-top: -10px;
  }
`
const Contacts = styled.div`
  align-items: flex-start;

  ${mqMax('md')} {
    display: flex;
    flex-direction: column;
  }

  ${mqMax('sm')} {
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
  ${mqMax('md')} {
    font-size: 32px;
    margin-bottom: 10px;
    line-height: 38px;
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
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.9px;
  }
`

const DescriptionText = styled.div`
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
  margin-bottom: 50px;

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
  column-gap: 32px;
`

const LinkItem = styled(Link)`
  color: ${colors.primary};
`

export default Camp
