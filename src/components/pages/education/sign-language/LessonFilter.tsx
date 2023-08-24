import React from 'react'
import { EducationLessonsList200Response } from '@app/lib/api/gen'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'
import InlineSVG from 'react-inlinesvg'
import CrossIcon from 'public/images/svg/crosses/white-cross.svg'

interface ISidebarFilterProps {
  lessons?: EducationLessonsList200Response
  onToggleMobileMenu: () => void
  mobileOpen: boolean
}

const LessonFilter = (props: ISidebarFilterProps) => {
  const { lessons, onToggleMobileMenu, mobileOpen } = props
  const lg = useMediaQuery('lg')
  const { query, replace } = useRouter()
  const order = Number(query.order) || 1

  React.useEffect(() => {
    const body = document?.querySelector('body')
    if (mobileOpen && body) body.style.overflowY = 'hidden'
    else if (body && !mobileOpen) body.style.overflowY = 'unset'

    return () => {
      if (body) {
        body.style.overflowY = 'unset'
      }
    }
  }, [mobileOpen])

  const allLessons = lessons?.results
  const changeLessonHandler = (lessonOrder: number) => {
    replace({
      query: {
        ...query,
        order: lessonOrder,
      },
    })
    onToggleMobileMenu()
  }

  return (
    <Wrapper mobileOpen={mobileOpen}>
      {lg && (
        <MobileHeader>
          <MobileHeaderTitle>Оглавление</MobileHeaderTitle>
          <InlineSVG onClick={onToggleMobileMenu} src={CrossIcon.src} />
        </MobileHeader>
      )}
      <Content>
        {allLessons?.map((lesson) => (
          <LessonItem key={lesson.id} onClick={() => lesson.order && changeLessonHandler(lesson.order)}>
            <VideoWrapper active={order === lesson.order}>
              <video src={lesson.video} width={146} height={64} style={{ borderRadius: '5px' }}>
                <track src={lesson.video} kind="captions" srcLang="en" label="English" default />
              </video>
            </VideoWrapper>
            {lesson.title}
          </LessonItem>
        ))}
      </Content>
    </Wrapper>
  )
}

const { mqMax, colors } = theme
const VideoWrapper = styled.div<{ active: boolean }>`
  border: 2px solid ${({ active }) => (active ? colors.primary : colors.white)};
  border-radius: 5px;
  display: flex;
`

const Content = styled.div`
  max-height: 95vh;
  overflow-y: auto;
  padding-bottom: 40px;
`
const LessonItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.324px;
  padding: 10px 20px;
  cursor: pointer;
  gap: 16px;
`

const Wrapper = styled.div<{ mobileOpen: boolean }>`
  transition: transform 0.3s ease-in-out;

  ${mqMax('lg')} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f8f8f8;
    z-index: 3001;
    min-height: 100vh;

    transform: translateX(${(props) => (props.mobileOpen ? '0' : '-100%')});
  }
`
const MobileHeader = styled.div`
  background-color: ${colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 13px;
  margin-bottom: 15px;
  svg {
    cursor: pointer;
  }
`
const MobileHeaderTitle = styled.h3`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${colors.white};
`
export default LessonFilter
