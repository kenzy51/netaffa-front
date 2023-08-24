import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { useRef, useState } from 'react'
import useMediaQuery from '@app/hooks/useMediaQuery'

const EqualizerItem = () => {
  const isMobile = useMediaQuery('sm')

  const { current: animations } = useRef([
    {
      width: [5],
      height: [5, 8, 5],
      transition: { duration: Math.floor(Math.random() * (3 - 1 + 1)) + 1 },
    },
    {
      width: [5, 8, 5],
      height: [5, 10, 5],
      transition: { duration: Math.floor(Math.random() * (3 - 1 + 1)) + 1 },
    },
  ])
  const { current: animationsBig } = useRef([
    {
      width: [12],
      height: [12, 22, 12],
      transition: { duration: Math.floor(Math.random() * (3 - 1 + 1)) + 1 },
    },
    {
      width: [12, 22, 12],
      height: [12, 24, 12],
      transition: { duration: Math.floor(Math.random() * (3 - 1 + 1)) + 1 },
    },
  ])

  const [selectedAnimation, setSelectedAnimation] = useState(Math.floor(Math.random() * animations.length))

  const handleAnimationComplete = () => {
    setSelectedAnimation((prev) => (prev === 1 ? 0 : 1))
  }

  return (
    <>
      {/*{isMobile ? (*/}
      {/*  <WrapperBar isMobile={isMobile}>*/}
      {/*    <Bar*/}
      {/*      isMobile={isMobile}*/}
      {/*      animate={animations[selectedAnimation]}*/}
      {/*      onAnimationComplete={handleAnimationComplete}*/}
      {/*    />*/}
      {/*  </WrapperBar>*/}
      {/*) : (*/}
      <WrapperBar isMobile={isMobile || false}>
        <Bar
          isMobile={isMobile || false}
          animate={animationsBig[selectedAnimation]}
          onAnimationComplete={handleAnimationComplete}
        />
      </WrapperBar>
      {/*)}*/}
    </>
  )
}

const WrapperBar = styled.li<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '5px' : '18px')};
  height: ${({ isMobile }) => (isMobile ? '16px' : '26px')};
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.mqMax('sm')} {
    padding: 15px 0;
  }
`

const Bar = styled(motion.div)<{ isMobile: boolean }>`
  background-color: ${theme.colors.primary};
  width: ${({ isMobile }) => (isMobile ? '5px' : '12px')};
  height: ${({ isMobile }) => (isMobile ? '5px' : '12px')};
  border-radius: 50.5px;
`

export default EqualizerItem
