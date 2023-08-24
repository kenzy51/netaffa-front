/* eslint-disable jsx-a11y/media-has-caption */
// import React, { Dispatch, SetStateAction } from 'react'
// import styled from 'styled-components'
// import { AnimatePresence, motion } from 'framer-motion'
// import { IDataItem } from './types'
// import { theme } from '@app/styles/theme'
// import { useAudio } from 'react-use'
// import useMediaQuery from '@app/hooks/useMediaQuery'

// interface ISoundEqualizerItemProps {
//   activeId: number | null
//   setActive: Dispatch<SetStateAction<number | null>>
//   isNeighbor: boolean
//   data: IDataItem
// }

// const SoundEqualizerItem = ({ activeId, setActive, isNeighbor, data }: ISoundEqualizerItemProps) => {
//   const { text, song, background, id } = data
//   const xl = useMediaQuery('custom', '(max-width: 1105px)')
//   const [audio, state, controls] = useAudio({
//     src: song,
//   })
//   const isActive = activeId === id && state.playing
//   const variants = {
//     active: xl ? { width: 'auto', height: 139 } : { width: 200, height: 574 },
//     disabled: {
//       width: isNeighbor && activeId ? 40 : 101,
//       height: xl ? [200, 63, 200] : [574, 126, 574],
//       transition: { duration: Math.random() * (2 - 0.7 + 1) + 0.7, delay: 1, repeat: Infinity },
//     },
//   }

//   const playControl = () => {
//     controls.play()
//     setActive(id)
//   }
//   return (
//     <AnimatePresence>
//       <Wrapper
//         animate={isActive ? 'active' : 'disabled'}
//         variants={variants}
//         onMouseLeave={() => {
//           controls.pause()
//           setActive(null)
//         }}
//         onClick={playControl}
//         active={isActive}
//         background={background}
//       >
//         {audio}
//         <Title>{(!activeId || state.playing) && text}</Title>
//       </Wrapper>
//     </AnimatePresence>
//   )
// }

// const { colors, mqMax } = theme
// const Wrapper = styled(motion.div)<{ active: boolean; background: string }>`
//   background: ${({ active, background }) => (active ? `url(${background}) center center no-repeat` : colors.primary)};
//   border-radius: ${({ active }) => (active ? 100 : 50)}px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: 0.4s;
//   cursor: pointer;
//   overflow: hidden;
// `
// const Title = styled.h4`
//   font-family: 'Oswald', sans-serif;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 16px;
//   text-transform: uppercase;
//   color: ${colors.white};
//   padding: 0 10px;
//   white-space: nowrap;
//   ${mqMax('lg')} {
//     display: none;
//   }
// `

// export default SoundEqualizerItem

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { IDataItem } from './types'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'

interface ISoundEqualizerItemProps {
  activeId: number | null
  setActive: Dispatch<SetStateAction<number | null>>
  isNeighbor: boolean
  data: IDataItem
}

const SoundEqualizerItem = ({ activeId, setActive, isNeighbor, data }: ISoundEqualizerItemProps) => {
  const { text, song, background, id } = data
  const lg = useMediaQuery('lg')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      if (isPlaying) {
        audioElement.play()
      } else {
        audioElement.pause()
        audioElement.currentTime = 0
      }
    }
  }, [isPlaying])

  useEffect(() => {
    setIsPlaying(activeId === id)
  }, [activeId, id])

  const handleMouseEnter = () => {
    if (lg) return
    setActive(id)
    setIsPlaying(true)
  }

  const handleMouseLeave = () => {
    setActive(null)
    setIsPlaying(false)
  }

  const variants = {
    active: lg ? { width: 'auto', height: 139 } : { width: 200, height: 574 },
    disabled: {
      width: isNeighbor && activeId ? 40 : 101,
      height: lg ? [200, 63, 200] : [574, 126, 574],
      transition: { duration: Math.random() * (2 - 0.7 + 1) + 0.7, delay: 1, repeat: Infinity },
    },
  }

  return (
    <AnimatePresence>
      <Wrapper
        animate={activeId === id ? 'active' : 'disabled'}
        variants={variants}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        active={activeId === id && isPlaying}
        background={background}
      >
        <audio ref={audioRef} src={song} />
        <Title>{(!activeId || isPlaying) && text}</Title>
      </Wrapper>
    </AnimatePresence>
  )
}

const { colors, mqMax } = theme
const Wrapper = styled(motion.div)<{ active: boolean; background: string }>`
  background: ${({ active, background }) => (active ? `url(${background}) center center no-repeat` : colors.primary)};
  border-radius: ${({ active }) => (active ? 100 : 50)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;
  overflow: hidden;
`

const Title = styled.h4`
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${colors.white};
  padding: 0 10px;
  white-space: nowrap;
  ${mqMax('lg')} {
    display: none;
  }
`

export default SoundEqualizerItem
