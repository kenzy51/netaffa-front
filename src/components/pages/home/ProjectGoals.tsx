import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import Image from 'next/image'
import Goal_1 from 'public/images/svg/projectGoal/icon1.svg'
import Goal_2 from 'public/images/svg/projectGoal/icon2.svg'
import Goal_3 from 'public/images/svg/projectGoal/icon3.svg'
import Goal_4 from 'public/images/svg/projectGoal/icon4.svg'
import Goal_5 from 'public/images/svg/projectGoal/icon5.svg'
import Goal_6 from 'public/images/svg/projectGoal/icon6.svg'
import InlineSVG from 'react-inlinesvg'
import SingIcon from 'public/images/svg/signs/project-goals.svg'
import React from 'react'
import LetterIcon from 'public/images/svg/letters/ц.svg'
import { useTranslation } from 'next-i18next'

interface IProjectGoalsProps {
  showSign?: boolean
}

const ProjectGoals = ({ showSign = true }: IProjectGoalsProps) => {
  const { t } = useTranslation('projectGoal')
  const goals = [
    {
      title: t('positiveChangesTitle'),
      description: t('positiveChangesDesc'),
      imageSrc: Goal_1,
    },
    {
      title: t('understandingTitle'),
      description: t('understandingDesc'),
      imageSrc: Goal_2,
    },
    {
      title: t('improvedFinancialTitle'),
      description: t('improvedFinancialDesc'),
      imageSrc: Goal_3,
    },
    {
      title: t('globalOptimizationTitle'),
      description: t('globalOptimizationDesc'),
      imageSrc: Goal_4,
    },
    {
      title: t('communicationTitle'),
      description: t('communicationDesc'),
      imageSrc: Goal_5,
    },
    {
      title: t('optimismTitle'),
      description: t('optimismDesc'),
      imageSrc: Goal_6,
    },
  ]
  return (
    <Section>
      <Container>
        <SingWrapper>
          {showSign && (
            <IconWrapper>
              <InlineSVG src={SingIcon.src} />
            </IconWrapper>
          )}
          <Title>{t('projectGoalTitle')}</Title>
          {showSign && (
            <LetterWrapper>
              <InlineSVG src={LetterIcon.src} />
            </LetterWrapper>
          )}
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
  ${mqMax('md')} {
    margin-top: 40px;
  }
`
const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  ${mqMax('lg')} {
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
const IconWrapper = styled.div`
  ${mqMax('md')} {
    display: block;
    svg {
      width: 40.05px;
      height: 59.95px;
    }
  }
`

const LetterWrapper = styled.div`
  position: absolute;
  top: 55px;
  z-index: 0;
  ${mqMax('md')} {
    display: block;
    top: 36px;
    svg {
      width: 61.32px;
      height: 79.93px;
    }
  }
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;
  color: ${colors.gray_900};
  z-index: 12;
  ${mqMax('lg')} {
    font-size: 24px;
    line-height: 26px;
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
`
const Item = styled.li`
  grid-column-gap: 41px;
  display: flex;
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
  display: grid;
  gap: 15px;
  align-content: start;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: ${colors.dark};
  max-width: 400px;
  ${mqMax('md')} {
    font-size: 16px;
    line-height: 18px;
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
    line-height: 18px;
  }
`

export default ProjectGoals
