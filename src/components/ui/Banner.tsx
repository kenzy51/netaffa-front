import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import InlineSVG from 'react-inlinesvg'
import IconType from 'public/images/svg/signs/sign-lang.svg'

interface IBannerProps {
  title?: string
  deafInfo?: {
    letter?: typeof IconType
    sign?: typeof IconType
    signStyles?: CSSProperties
  }
  image: string
  styles?: {
    wrapper?: CSSProperties
  }
}

const Banner = (props: IBannerProps) => {
  const { title, deafInfo, image, styles } = props
  return (
    <Wrapper image={image} styles={styles?.wrapper}>
      <Container>
        <DeafInfo>
          <SignWrapper signStyles={deafInfo?.signStyles}>
            <InlineSVG src={deafInfo?.sign.src} />
          </SignWrapper>

          <LetterWrapper>
            <InlineSVG src={deafInfo?.letter.src} />
          </LetterWrapper>
        </DeafInfo>
        <Title>{title}</Title>
      </Container>
    </Wrapper>
  )
}

const { colors, mqMax } = theme
const Wrapper = styled.div<{ image: string; styles?: CSSProperties }>`
  display: flex;
  align-items: center;
  background-image: url(${(p) => p.image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 300px;
  ${mqMax('md')} {
    height: 200px;
    padding: 0 13px;
  }
  ${mqMax('md')} {
    height: 130px;
  }
  ${(p) => p.styles as never}
`
const Container = styled.div`
  max-width: ${theme.containers.main};
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  column-gap: 30px;
  ${mqMax('md')} {
    column-gap: 10px;
  }
`
const DeafInfo = styled.div`
  width: 218px;
  height: 218px;
  background: ${colors.white};
  border-radius: 500px;
  overflow: hidden;
  position: relative;
  z-index: 100;
  min-width: 64px;
  min-height: 64px;

  ${mqMax('md')} {
    width: 130px;
    height: 130px;
  }
  ${mqMax('sm')} {
    width: 64px;
    height: 64px;
  }
`
const SignWrapper = styled.div<{ signStyles: CSSProperties | undefined }>`
  position: absolute;
  bottom: 8px;
  right: 20px;

  ${mqMax('md')} {
    bottom: 7px;
    right: 5px;
    svg {
      width: 68px;
      height: 78px;
    }
  }
  ${mqMax('sm')} {
    bottom: -1px;
    right: 4px;
    svg {
      width: 33px;
      height: 43px;
    }
  }

  ${({ signStyles }) => signStyles as never}
`
const LetterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  svg {
    ${mqMax('md')} {
      width: 50px;
      height: 68px;
    }
    ${mqMax('sm')} {
      width: 30px;
      height: 30px;
    }
  }
`
const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;
  letter-spacing: -0.005em;
  color: ${colors.white};
  ${mqMax('md')} {
    font-size: 24px;
    line-height: 26px;
    letter-spacing: -0.12px;
  }
`

export default Banner
