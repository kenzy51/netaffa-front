import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SoundEqualizerItem from '@app/components/ui/Equalizer/SoundEqualizer/SoundEqualizerItem'
import { TData } from './types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { theme } from '@app/styles/theme'

interface ISoundEqualizerProps {
  onActive?: (value: boolean) => void
}
const SoundEqualizer = ({ onActive }: ISoundEqualizerProps) => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const { t } = useTranslation('home')
  const data: TData = [
    {
      id: 1,
      text: t('birdSong'),
      background: '/images/png/song-bg/bird.png',
      song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 2,
      text: t('soundRain'),
      background: '/images/png/song-bg/bird.png',
      song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 3,
      text: t('cityNoise'),
      background: '/images/png/song-bg/bird.png',
      song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 4,
      text: t('music'),
      background: '/images/png/song-bg/bird.png',
      song: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ]

  useEffect(() => {
    onActive && onActive(!!activeId)
  }, [activeId, onActive])

  return (
    <AnimatePresence>
      <Wrapper>
        {data.map((item) => {
          const activeIndex = data.findIndex((item) => item.id === activeId),
            prevNeighbor = data[activeIndex - 1],
            nextNeighbor = data[activeIndex + 1],
            neighbors = activeId ? [prevNeighbor, nextNeighbor].filter((item) => item) : []

          return (
            <SoundEqualizerItem
              key={item.id}
              activeId={activeId}
              setActive={setActiveId}
              isNeighbor={neighbors.some((neighborItem) => item.id === neighborItem.id)}
              data={item}
            />
          )
        })}
      </Wrapper>
    </AnimatePresence>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -131px;
  grid-gap: 10px;
  height: 100%;

  ${theme.mqMax('sm')} {
    grid-gap: 2px;
  }
`

export default SoundEqualizer
