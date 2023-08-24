import { useRef } from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import VideoPlayer from '@app/components/ui/Video'
import Banner from 'public/images/jpg/video-banner.jpg'

const VideoSection = () => {
  const { current: videoUrl } = useRef('https://www.youtube.com/embed/pRJ-Dai3oB0')

  return (
    <Section>
      <Container>
        <VideoPlayer
          videoUrl={videoUrl}
          bannerImage={Banner}
          height={640}
          heightVideo={640}
          styles={{
            videoWrapper: { height: 640 },
          }}
        />
      </Container>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  margin-top: 89px;
  ${theme.mqMax('sm')} {
    margin-top: 60px;
  }
`
const Container = styled.div`
  max-width: ${theme.containers.main};
  margin: 0 auto;
  ${theme.mqMax('xl')} {
    padding: 0 13px;
  }
  ${theme.mqMax('sm')} {
    display: flex;
    justify-content: center;
  }
`

export default VideoSection
