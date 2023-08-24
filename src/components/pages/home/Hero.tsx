import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Equalizer from '../../ui/Equalizer'
import { theme } from '@app/styles/theme'
import LetterItem from '@app/components/ui/Equalizer/LetterItem'
import GirlImageSmile from 'public/images/png/hero-girl-smile.png'
import GirlImage from 'public/images/png/hero-girl.png'
import SoundEqualizer from '@app/components/ui/Equalizer/SoundEqualizer'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const Hero = () => {
  const [smileGirl, setSmileGirl] = useState(false)
  const isMobile = useMediaQuery('sm')
  const { t } = useTranslation('home')
  const { locale } = useRouter()
  return (
    <Section>
      <EqualizerWrapper>
        <Equalizer count={isMobile ? 5 : 16} />
      </EqualizerWrapper>
      <SoundEqualizerWrapper>
        <SoundEqualizer onActive={(value) => setSmileGirl(value)} />
      </SoundEqualizerWrapper>

      <EqualizerSecondWrapper>
        <Equalizer count={isMobile ? 1 : 2} />
      </EqualizerSecondWrapper>

      <TextWrapper>
        {locale === 'ru' ? (
          <TitleWrapper>
            <Title>
              Пом
              <LetterItem letter="о" transition={{ duration: 1.4 }} />
              чь
            </Title>
            <Title>
              глух
              <LetterItem letter="о" transition={{ duration: 1.8 }} />
              му
            </Title>
          </TitleWrapper>
        ) : (
          <TitleWrapper>
            <Title>
              emp
              <LetterItem letter="o" transition={{ duration: 1.4 }} />
              wering
            </Title>
            <Title>the</Title>
            <Title>deaf </Title>
          </TitleWrapper>
        )}
        <Subtitle>{t('comfort')}</Subtitle>
      </TextWrapper>
      <GirlWrapper>
        <GirlLeftEqualizer>
          <Equalizer count={4} />
        </GirlLeftEqualizer>
        <Image src={smileGirl ? GirlImageSmile : GirlImage} alt="girl" height={!isMobile ? 900 : 300} />
        <GirlRightEqualizer>
          <Equalizer count={7} />
        </GirlRightEqualizer>
      </GirlWrapper>
    </Section>
  )
}

const { colors, mqMax } = theme

const Section = styled.section`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1650px) {
    justify-content: initial;
  }
`
const EqualizerWrapper = styled.div`
  margin: 307px 2px 0 0;
  display: grid;
  min-width: 18px;
  ${mqMax('sm')} {
    margin-top: 85px;
    min-width: 10px;
  }
`
const EqualizerSecondWrapper = styled.div`
  margin: 307px 10px 0;
  ${mqMax('sm')} {
    margin: 85px 2px 0;
  }
`
const SoundEqualizerWrapper = styled.div`
  min-width: 430px;
  max-width: 430px;
  @media screen and (max-width: 1105px) {
    min-width: 350px;
  }
  ${mqMax('lg')} {
    min-width: 200px;
  }
  ${mqMax('md')} {
    min-width: 150px;
  }
  ${mqMax('sm')} {
    margin-top: 150px;
    min-width: 100px;
  }
`
const TextWrapper = styled.div`
  margin-top: 286px;
  ${mqMax('sm')} {
    margin-top: 80px;
  }
`
const TitleWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  @media screen and (max-width: 1450px) {
    margin-top: -30px;
    flex-direction: column;
  }
  ${mqMax('md')} {
    margin: 0;
  }
`
const Title = styled.h1`
  font-weight: 900;
  font-size: 48px;
  line-height: 62px;
  text-transform: uppercase;
  color: ${colors.dark};
  white-space: nowrap;
  display: flex;
  ${mqMax('lg')} {
    font-size: 32px;
    line-height: 43px;
  }
  ${mqMax('md')} {
    font-size: 20px;
    line-height: 23px;
  }
`
const Subtitle = styled.p`
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
  color: ${colors.dark};
  ${mqMax('lg')} {
    font-size: 22px;
    line-height: 25px;
  }
  ${mqMax('md')} {
    font-size: 16px;
    line-height: 19px;
  }
`
const GirlWrapper = styled.div`
  position: relative;
  margin-right: 14px;
  //  ${mqMax('sm')} {
  //  }
`
const GirlLeftEqualizer = styled.div`
  position: absolute;
  top: 34%;
  left: 25px;
  ${mqMax('sm')} {
    top: 28%;
    left: 11px;
  }
`
const GirlRightEqualizer = styled.div`
  position: absolute;
  top: 34%;
  right: -24px;
  ${mqMax('sm')} {
    top: 28%;
    right: -20px;
  }
`

export default Hero
