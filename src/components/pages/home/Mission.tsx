import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import InlineSVG from 'react-inlinesvg'
import MapImage from 'public/images/png/mapCountries.png'
import MissionSingIcon from 'public/images/svg/signs/mission.svg'
import BoyImage from 'public/images/png/boy-mission.png'
import WomenImage from 'public/images/png/women-mission.png'
import MIcon from 'public/images/svg/letters/м.svg'
import useMediaQuery from '@app/hooks/useMediaQuery'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import { useTranslation } from 'next-i18next'

const Mission = () => {
  const isMobile = useMediaQuery('sm')
  const { t: tHome } = useTranslation('home')
  const { t: tButton } = useTranslation('buttons')
  return (
    <Section>
      <MapImageWrapper>
        <Image src={MapImage} alt="map" width={!isMobile ? 1360 : 870} height={!isMobile ? 1024 : 662} />
      </MapImageWrapper>
      <Wrapper>
        <Container>
          <ContentWrapper>
            <MissionSingWrapper>
              <InlineSVG src={MissionSingIcon.src} />
              <Title>{tHome('mission')}</Title>
              <MIconWrapper>
                <InlineSVG src={MIcon.src} />
              </MIconWrapper>
            </MissionSingWrapper>

            <BoyImageWrapper>
              <Image src={BoyImage.src} alt="boy" width={255} height={435} />
            </BoyImageWrapper>

            <WomenImageWrapper>
              <Image src={WomenImage.src} alt="women" width={255} height={435} />
            </WomenImageWrapper>

            <FirstText>{tHome('missionDesc')}</FirstText>

            <BtnWrapperLink href="/#hero-form" scroll={false}>
              <DefaultButton type="button">{tButton('join')}</DefaultButton>
            </BtnWrapperLink>
          </ContentWrapper>
        </Container>
      </Wrapper>
    </Section>
  )
}

const { colors, mqMax } = theme

const Section = styled.section`
  position: relative;
  margin-top: -294px;
  ${mqMax('sm')} {
    padding-top: -200px;
    margin-top: -94px;
  }
`
const MapImageWrapper = styled.div`
  max-width: 1360px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  ${mqMax('lg')} {
  }
`
const Wrapper = styled.div`
  position: relative;
  padding-top: 160px;
`
const Container = styled.div`
  max-width: 1038px;
  margin: 0 auto;
`
const MissionSingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    z-index: 1;
  }

  ${mqMax('sm')} {
    svg {
      width: 28.24px;
      height: 60px;
    }
  }
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;
  color: ${colors.gray_900};
  ${mqMax('lg')} {
    font-size: 24px;
    line-height: 26px;
  }
`
const MIconWrapper = styled.div`
  position: absolute;
  top: 55px;
  z-index: 0;
  ${mqMax('lg')} {
    top: 36px;
    svg {
      width: 84.12px;
      height: 80px;
    }
  }
`
const BoyImageWrapper = styled.div`
  ${mqMax('lg')} {
    img {
      width: 74px;
      height: 126px;
    }
  }
`
const WomenImageWrapper = styled(BoyImageWrapper)`
  align-self: flex-end;
`
const FirstText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 34px;
  color: ${colors.gray_200};
  text-align: center;
  ${mqMax('lg')} {
    font-size: 12px;
    line-height: 18px;
    text-align: center;
  }
`
const BtnWrapperLink = styled(Link)`
  display: inline-block;
  justify-self: center;
  ${mqMax('lg')} {
    button {
      height: 56px;
      width: 294px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template: 275px 170px 200px / 255px minmax(100px, 431px) minmax(140px, 255px);
  grid-gap: 52px;
  grid-template-areas:
    'boy mission women'
    'boy firstText women'
    'boy button women';

  ${MissionSingWrapper} {
    grid-area: mission;
  }
  ${BoyImageWrapper} {
    grid-area: boy;
  }
  ${WomenImageWrapper} {
    grid-area: women;
  }
  ${FirstText} {
    grid-area: firstText;
  }
  ${BtnWrapperLink} {
    grid-area: button;
  }
  ${mqMax('lg')} {
    padding: 0 13px;
    grid-gap: 0 15px;
    grid-template: 120px 40px 1fr 56px / 74px 1fr 74px;
    grid-template-areas:
      'mission mission mission'
      'boy . .'
      'boy firstText women'
      'button button button';
  }
  ${mqMax('sm')} {
    margin-top: -130px;
  }
`

export default Mission
