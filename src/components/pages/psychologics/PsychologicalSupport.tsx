import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { useRef } from 'react'
import Image from 'next/image'
import family from 'public/images/svg/psychSupport/family.svg'
import career from 'public/images/svg/psychSupport/career.svg'
import acceptance from 'public/images/svg/psychSupport/selfAcceptance.svg'
import emotions from 'public/images/svg/psychSupport/emotions.svg'
import { useTranslation } from 'next-i18next'

const PsychoSupportItems = () => {
  const { t } = useTranslation('psychologicalHelp')
  const { current: goals } = useRef([
    {
      title: t('familyRelationships'),
      description: t('familyRelationshipsDesc'),
      imageSrc: family,
    },
    {
      title: t('selfAcceptance'),
      description: t('selfAcceptanceDesc'),
      imageSrc: acceptance,
    },
    {
      title: t('careerSelfRealization'),
      description: t('careerSelfRealizationDesc'),
      imageSrc: career,
    },
    {
      title: t('emotions'),
      description: t('emotionsDesc'),
      imageSrc: emotions,
    },
  ])

  return (
    <Section>
      <Container>
        <SingWrapper>
          <Title>{t('whatHelpTitle')}</Title>
        </SingWrapper>
        <List>
          {goals.map((goal) => (
            <Item key={goal.title}>
              <ImageWrapper>
                <Image src={goal.imageSrc} alt={goal.title} width={goal.imageSrc.width} height={goal.imageSrc.height} />
              </ImageWrapper>
              <TextWrapper>
                <ItemTitle>{goal.title}</ItemTitle>
                <ItemDescription>{goal.description}</ItemDescription>
              </TextWrapper>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}

const { colors, containers, mqMax } = theme

const Section = styled.section`
  margin-top: 80px;
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
`
const SingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 60px;
  align-items: center;
  * {
    z-index: 1;
  }
  ${mqMax('md')} {
    margin-bottom: 44px;
  }
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 46px;
  line-height: 62px;
  color: ${colors.gray_900};
  ${mqMax('md')} {
    font-size: 24px;
    line-height: 26px;
  }
  ${mqMax('sm')} {
    margin-top: -40px;
    margin-bottom: -30px;
  }
`

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px 25px;
  ${mqMax('lg')} {
    grid-template-columns: 1fr;
  }
  ${mqMax('md')} {
    grid-gap: 20px 0;
  }
  ${mqMax('sm')} {
    grid-gap: 10px 0;
  }
`
const Item = styled.li`
  grid-column-gap: 41px;
  display: flex;
  align-items: center;
  z-index: 2;
  ${mqMax('md')} {
    grid-column-gap: 10px;
  }
`
const ImageWrapper = styled.div`
  border-radius: 50.5px;
  max-width: 86px;
  width: 100%;
  height: 126px;
  background-color: ${colors.aquamarine};
  display: flex;
  align-items: center;
  justify-content: center;
  ${mqMax('sm')} {
    max-width: 51px;
    height: 74.72px;
    img {
      transform: scale(0.6);
    }
  }
`
const TextWrapper = styled.div`
  max-width: 350px;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.005em;
  margin-bottom: 15px;
  color: ${colors.dark};
  max-width: 400px;
  ${mqMax('md')} {
    font-size: 16px;
    margin-bottom: 5px;
  }
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: ${colors.gray_200};
  ${mqMax('md')} {
    font-size: 12px;
  }
  ${mqMax('sm')} {
    line-height: 18px;
  }
`

export default PsychoSupportItems
