import React from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import EqualizerItem from '@app/components/ui/Equalizer/EqualizerItem'
import { theme } from '@app/styles/theme'

interface IEqualizerProps {
  count: number
}

const Equalizer = ({ count }: IEqualizerProps) => {
  return (
    <AnimatePresence>
      <Container>
        {Array.from(Array(count)).map((item, i) => (
          <EqualizerItem key={`key-${i}`} />
        ))}
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.ul)`
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
  overflow: hidden;
  ${theme.mqMax('lg')} {
    grid-gap: 5px;
  }
  ${theme.mqMax('sm')} {
    grid-gap: 2px;
  }
`

export default Equalizer
