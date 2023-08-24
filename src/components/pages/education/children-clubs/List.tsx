import styled from 'styled-components'
import ChildrenClub from './Item'
import { ChildrenClubsChildrenClubsList200Response } from '@app/lib/api/gen'
import { theme } from '@app/styles/theme'

interface IChildrenClubsListProps {
  clubs?: ChildrenClubsChildrenClubsList200Response
  view: 'tile' | 'list'
  limit: number
}

const ChildrenClubsList = (props: IChildrenClubsListProps) => {
  const { clubs, view, limit } = props
  return (
    <List view={view}>
      {clubs?.results?.slice(0, limit).map((club) => (
        <ChildrenClub key={club.id} club={club} view={view} />
      ))}
    </List>
  )
}

const { mqMax } = theme
const List = styled.ul<{ view: 'tile' | 'list' }>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'list' ? '1fr' : 'repeat(4, 1fr)')};
  grid-gap: ${({ view }) => (view === 'list' ? '32px 0' : '40px 20px')};
  justify-items: center;
  ${mqMax('xl')} {
    grid-template-columns: ${({ view }) => (view === 'list' ? '1fr' : 'repeat(3, 1fr)')};
  }
  ${mqMax('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mqMax('sm')} {
    grid-template-columns: 1fr;
  }
`

export default ChildrenClubsList
