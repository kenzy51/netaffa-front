import React, { CSSProperties, useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import PlayBtnImage from 'public/images/png/play-btn.png'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface VideoPlayerProps {
  videoUrl: string
  height?: number
  heightVideo?: number
  bannerImage: StaticImageData | string
  styles?: {
    videoWrapper?: CSSProperties
    playWrapper?: CSSProperties
  }
  iframeOrVideo?: 'iframe' | 'video'
}

const VideoPlayer = ({
  videoUrl,
  bannerImage,
  styles,
  height,
  heightVideo,
  iframeOrVideo = 'iframe',
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { asPath } = useRouter()
  const { t } = useTranslation('buttons')

  const player =
    iframeOrVideo === 'iframe' ? (
      <iframe
        width="100%"
        height={height || 570}
        src={`${videoUrl}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="About effafa project"
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video width="100%" autoPlay height={heightVideo} controls>
        <source src={`${videoUrl}?autoplay=1`} type="video/mp4" title="About effafa project" />
      </video>
    )

  useEffect(() => {
    setIsPlaying(false)
  }, [asPath])

  return (
    <VideoWrapper styles={styles?.videoWrapper}>
      {isPlaying ? (
        player
      ) : (
        <>
          <PlayWrapper styles={styles?.playWrapper} onClick={() => setIsPlaying(true)}>
            <Image src={PlayBtnImage} alt="play btn" width={100} height={100} />
            <p>{t('watchVideo')}</p>
          </PlayWrapper>
          <Image src={bannerImage} alt="video banner" width={1200} height={570} />
        </>
      )}
    </VideoWrapper>
  )
}

interface IStylesProps {
  styles?: CSSProperties
}
const VideoWrapper = styled.div<IStylesProps>`
  position: relative;
  overflow: hidden;
  img,
  video {
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 570px;
    ${theme.mqMax('sm')} {
      max-height: 160px;
    }
  }

  ${theme.mqMax('xl')} {
    height: 300px;
  }
  ${theme.mqMax('sm')} {
    height: 200px;
    object-fit: contain;
    max-height: 170px;
  }
  ${({ styles }) => styles as never}
`
const PlayWrapper = styled.div<IStylesProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 18px;
  }
  p {
    color: ${theme.colors.white};
    text-align: center;
    font-size: 20px;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    line-height: 34px;
  }
  ${theme.mqMax('sm')} {
    img {
      margin-top: 20px;
      max-width: 50px;
      max-height: 50px;
    }
    p {
      color: ${theme.colors.white};
      text-align: center;
      font-size: 14px;
      font-family: Roboto, sans-serif;
      font-weight: 700;
      margin-top: -20px;
    }
  }
  ${({ styles }) => styles as never}
`

export default VideoPlayer
