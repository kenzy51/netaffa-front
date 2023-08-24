import { EducationCoursesList200Response } from '@app/lib/api/gen'
import SignLangItem from './Item'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'

interface ISignLangListProps {
  courses?: EducationCoursesList200Response
  view: 'tile' | 'list'
  limit:number
}

const SignLangList = (props: ISignLangListProps) => {
  const { courses,view,limit } = props ;
  return (
      <List view={view}>
        {courses?.results?.slice(0, limit).map((course) => (
            <SignLangItem key={course.id} course={course} view={view} />
        ))}
      </List>
  )
}

const List = styled.ul<{ view: 'tile' | 'list' }>`
  display: flex;
  flex-direction: ${({ view }) => (view === 'list' ? 'column' : 'row')};
  flex-wrap: ${({ view }) => (view === 'list' ? 'nowrap' : 'wrap')};
  gap: ${({ view }) => (view === 'list' ? '32px 0' : '24px 20px')};
  ${theme.mqMax('lg')} {
    justify-content: center;
  }
`

export default SignLangList
