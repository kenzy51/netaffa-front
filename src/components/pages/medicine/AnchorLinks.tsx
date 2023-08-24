import React from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Image from 'next/image'
import { Link as ScrollLink, scroller } from 'react-scroll'
import iconHospital from 'public/images/svg/medOrganizations/Icon_Hospital.svg'
import iconVideo from 'public/images/svg/medOrganizations/Icon_Video.svg'
import iconTranslator from 'public/images/svg/medOrganizations/Icon_translator-service.svg'
import iconNews from 'public/images/svg/medOrganizations/Icon_news_atricles.svg'
import { useTranslation } from 'next-i18next'

const AnchorLinks = () => {
  const { t } = useTranslation('medicalCare')
  const arrayItems = [
    {
      name: t('healthOrganis'),
      icon: iconHospital,
      link: 'medList',
    },
    {
      name: t('video'),
      icon: iconVideo,
      link: 'video',
    },
    {
      name: t('interpreterService'),
      icon: iconTranslator,
      link: 'translate',
    },
    {
      name: t('newsArticles'),
      icon: iconNews,
      link: 'news',
    },
  ]

  const handleSmoothScroll = (link: string) => {
    scroller.scrollTo(link, {
      duration: 800, // Duration of the smooth scroll animation in milliseconds
      offset: -100, // Offset from the top of the target element after scrolling (adjust as needed)
      smooth: 'easeInOutQuart', // Easing function for the scroll animation
    })
  }

  return (
    <LinksWrapper>
      <Container>
        <InnerWrapper>
          {arrayItems.map((item) => (
            <AnchorBlock key={item.name}>
              <Image src={item.icon} alt="icon" width={45} height={45} />
              <ScrollLink
                activeClass="active"
                to={item.link}
                spy
                smooth
                offset={-100}
                duration={700}
                onClick={() => handleSmoothScroll(item.link)}
              >
                {item.name}
              </ScrollLink>
            </AnchorBlock>
          ))}
        </InnerWrapper>
      </Container>
    </LinksWrapper>
  )
}

const { containers, mqMax } = theme

const AnchorBlock = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;

  a {
    font-size: 18px;
    font-weight: bold;
  }
`
const LinksWrapper = styled.div`
  padding-top: 40px;
  ${mqMax('xl')} {
    padding-top: 16px;
  }
  ${mqMax('md')} {
    overflow-x: scroll;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  gap: 56px;
  padding-bottom: 10px;
  margin-right: 10px;
`
export default AnchorLinks
