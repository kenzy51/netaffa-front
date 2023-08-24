import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import InlineSVG from 'react-inlinesvg'
import SingIcon from 'public/images/svg/signs/capabilities.svg'
import LetterIcon from 'public/images/svg/letters/в.svg'
import Image_1 from 'public/images/svg/capabilities/1.svg'
import Image_2 from 'public/images/svg/capabilities/2.svg'
import Image_3 from 'public/images/svg/capabilities/3.svg'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import Link from 'next/link'
import { theme } from '@app/styles/theme'
import { useTranslation } from 'next-i18next'

const Capabilities = () => {
  const { t: tOpportunities } = useTranslation('opportunities')
  const { t: tButtons } = useTranslation('buttons')
  const capabilitiesData = [
    {
      title: tOpportunities('specialtiesTitle'),
      description: tOpportunities('specialtiesDesc'),
      image: Image_1,
      link: '/career',
    },
    {
      title: tOpportunities('studyTitle'),
      description: tOpportunities('studyDesc'),
      image: Image_2,
      link: '/education/sign-language',
    },
    {
      title: tOpportunities('med'),
      description: tOpportunities('medDesc'),
      image: Image_3,
      link: '/medicine',
    },
  ]

  return (
    <Section>
      <Container>
        <SingWrapper>
          <IconWrapper>
            <InlineSVG src={SingIcon.src} />
          </IconWrapper>
          <Title>{tOpportunities('opportunities')}</Title>
          <LetterWrapper>
            <InlineSVG src={LetterIcon.src} />
          </LetterWrapper>
        </SingWrapper>
        <List>
          {capabilitiesData.map((capability) => (
            <Item key={capability.title}>
              <ItemImageWrapper>
                <Image
                  src={capability.image}
                  alt={capability.title}
                  width={capability.image.width}
                  height={capability.image.height}
                />
              </ItemImageWrapper>
              <TitleWrapper>
                <ItemTitle>{capability.title}</ItemTitle>
                <ItemDescription>{capability.description}</ItemDescription>
              </TitleWrapper>
              <BtnLinkWrapper href={capability.link}>
                <DefaultButton type="button">{tButtons('more')}</DefaultButton>
              </BtnLinkWrapper>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}
const { mqMax, colors, containers } = theme

const Section = styled.section`
  margin-top: 80px;
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`

const SingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  align-items: center;
  * {
    z-index: 1;
  }
  ${mqMax('md')} {
    margin-bottom: 44px;
  }
`
const TitleWrapper = styled.div`
  height: 254px;
  ${mqMax('lg')} {
    height: auto;
  }
`
const IconWrapper = styled.div`
  ${mqMax('md')} {
    svg {
      width: 40.05px;
      height: 59.95px;
    }
  }
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;

  color: ${colors.gray_900};
  ${mqMax('md')} {
    font-size: 24px;
    line-height: 26px;
  }
`
const LetterWrapper = styled.div`
  position: absolute;
  top: 55px;
  z-index: 0;
  ${mqMax('md')} {
    top: 36px;
    svg {
      width: 61.32px;
      height: 79.93px;
    }
  }
`
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  ${mqMax('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Item = styled.li`
  margin-top: -15px;
  display: flex;
  max-width: 360px;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${mqMax('lg')} {
    max-width: 100%;
  }
  ${mqMax('md')} {
    margin-top: 5px;
  }
`
const ItemImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 22px;
  img {
    object-fit: cover;
  }
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  color: ${colors.dark};
  margin-bottom: 5px;
  ${mqMax('md')} {
    font-size: 18px;
  }
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: ${colors.gray_200};
  margin-bottom: 31px;
  ${mqMax('md')} {
    font-size: 14px;
  }
`
const BtnLinkWrapper = styled(Link)`
  ${mqMax('sm')} {
    width: 100%;
    button {
      width: 100%;
    }
  }
`
export default Capabilities
