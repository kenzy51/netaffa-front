import React, { useRef } from 'react'
import styled from 'styled-components'
import LogoIcon from 'public/images/svg/effafaIcon.svg'
import InlineSVG from 'react-inlinesvg'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import FacebookIcon from 'public/images/svg/social-media/facebook.svg'
import TwitterIcon from 'public/images/svg/social-media/twitter.svg'
import YoutubeIcon from 'public/images/svg/social-media/youtube.svg'
import TelegramIcon from 'public/images/svg/social-media/telegram.svg'
import { dynamicLocalization } from '@app/lib/helpers/dynamicLocalization'
import useIsClient from '@app/hooks/useIsClient'

const Footer = () => {
  const isClient = useIsClient()
  const navList = {
    careerCamp: [
      {
        title: dynamicLocalization('КАРЬЕРА', 'CAREER'),
        link: '/career',
      },
      {
        title: dynamicLocalization('ЛАГЕРЯ', 'CAMPS'),
        link: '/camps',
      },
    ],
    education: [
      {
        title: dynamicLocalization('УЧЕБА', 'EDUCATION'),
        link: '/education/sign-language',
      },
      {
        title: dynamicLocalization('Язык жестов', 'Sign language'),
        link: '/education/sign-language',
      },
      {
        title: dynamicLocalization('Кружки', 'Children clubs'),
        link: '/education/children-clubs',
      },
    ],
    medicine: [
      {
        title: dynamicLocalization('МЕД ОБСЛУЖИВАНИЕ', 'MEDICAL SERVICE'),
        link: '/medicine',
      },
      {
        title: dynamicLocalization('ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ', 'PSYCHOLOGICAL ASSISTANCE'),
        link: '/psycho-support',
      },
    ],
    withoutItems: [
      {
        title: dynamicLocalization('СКАЧАТЬ', 'DOWNLOAD'),
        link: '/download',
      },
      {
        title: dynamicLocalization('СПОНСОРУ', 'TO SPONSOR'),
        link: '/sponsor',
      },
      {
        title: dynamicLocalization('РОДИТЕЛИ', 'PARENTS'),
        link: '/parents',
      },
      {
        title: dynamicLocalization('КОНТАКТЫ', 'CONTACTS'),
        link: '/contacts',
      },
    ],
  }
  const { current: socialMedia } = useRef([
    {
      icon: FacebookIcon,
      link: 'https://www.deepl.com/en/translator',
    },
    {
      icon: TwitterIcon,
      link: 'https://www.deepl.com/en/translator',
    },
    {
      icon: YoutubeIcon,
      link: 'https://www.deepl.com/en/translator',
    },
    {
      icon: TelegramIcon,
      link: 'https://www.deepl.com/en/translator',
    },
  ])

  if (!isClient) return null

  return (
    <FooterBlock>
      <Container>
        <FooterTop>
          <LogoWrapper>
            <Link href={'/'}>
              <InlineSVG src={LogoIcon.src} />
            </Link>
          </LogoWrapper>
          <Nav>
            <List>
              <EducationList>
                {navList.careerCamp.map((item) => (
                  <Link key={item.link} href={item.link}>
                    <ItemTitle>{item.title}</ItemTitle>
                  </Link>
                ))}
              </EducationList>
              <EducationList>
                {navList.education.map((item) => (
                  <Link key={item.link} href={item.link}>
                    <ItemTitle>{item.title}</ItemTitle>
                  </Link>
                ))}
              </EducationList>
              {navList.withoutItems.length > 0 && (
                <Link href={navList.withoutItems[0].link}>
                  <ItemTitle>{navList.withoutItems[0].title}</ItemTitle>
                </Link>
              )}
              {navList.withoutItems.length > 0 && (
                <Link href={navList.withoutItems[1].link}>
                  <ItemTitle>{navList.withoutItems[1].title}</ItemTitle>
                </Link>
              )}
              <EducationList>
                {navList.medicine.map((item) => (
                  <Link href={item.link} key={item.title}>
                    <ItemTitle>{item.title}</ItemTitle>
                  </Link>
                ))}
              </EducationList>
              <ParentsAndContacts>
                {navList.withoutItems.length > 0 && (
                  <Link key={navList.withoutItems[2].link} href={navList.withoutItems[2].link}>
                    <ItemTitle>{navList.withoutItems[2].title}</ItemTitle>
                  </Link>
                )}
                {navList.withoutItems.length > 0 && (
                  <Link key={navList.withoutItems[3].link} href={navList.withoutItems[3].link}>
                    <ItemTitle>{navList.withoutItems[3].title}</ItemTitle>
                  </Link>
                )}
              </ParentsAndContacts>
            </List>
          </Nav>
        </FooterTop>
        <FooterBottom>
          <FooterBottomRight>
            <InfoText>© 2023 EFFAFA</InfoText>
            <InfoText>{dynamicLocalization('Информация о разработчике', 'Information about the developer')}</InfoText>
          </FooterBottomRight>
          <FooterBottomLeft>
            {socialMedia.map((item, i) => (
              <Link href={item.link} target="_blank" key={i}>
                <InlineSVG src={item.icon.src} />
              </Link>
            ))}
          </FooterBottomLeft>
        </FooterBottom>
      </Container>
    </FooterBlock>
  )
}

const { colors, containers, mqMax } = theme
const FooterBlock = styled.footer`
  padding-top: 61px;

  ${mqMax('sm')} {
    padding-top: 27px;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const FooterTop = styled.div`
  display: flex;
  column-gap: 30px;
  padding-bottom: 40px;
  border-bottom: 1px solid #bdbdbd;
  ${mqMax('md')} {
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
  }
`
const Nav = styled.nav`
  display: flex;
`
const List = styled.div`
  display: flex;
  padding-top: 14px;
  gap: 44px;
  align-items: flex-start;
  ${mqMax('lg')} {
    gap: 20px;
  }
  ${mqMax('md')} {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ItemTitle = styled.h4`
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${colors.dark};
`
const ParentsAndContacts = styled.div`
  display: flex;
  gap: 44px;
  ${mqMax('lg')} {
    flex-direction: column;
    gap: 15px;
  }
`
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 0 56px;
  row-gap: 26px;

  ${mqMax('lg')} {
    align-items: center;
    flex-direction: column;
  }
`
const FooterBottomRight = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  row-gap: 10px;

  ${mqMax('md')} {
    align-items: center;
    flex-direction: column;
  }
`
const FooterBottomLeft = styled.div`
  display: flex;
  column-gap: 32px;
  margin-right: 32px;

  ${mqMax('lg')} {
    margin-right: 0;
  }
`
const InfoText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  color: ${colors.gray_200};
`
const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const LogoWrapper = styled.div``

export default Footer
