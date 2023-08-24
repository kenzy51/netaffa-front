import { CampsCampsList200Response } from '@app/lib/api/gen'
import { useRouter } from 'next/router'
import React from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import ChildrenCamp from './Item'
interface IChildrenCampsProps {
  camps?: CampsCampsList200Response
}
const CampsList = (props: IChildrenCampsProps) => {
  const { camps } = props
  const { query } = useRouter()
  const view = query?.view === 'list' ? 'list' : 'tile'
  return (
    <>
      <List view={view}>
        {camps?.results?.map((camp) => (
          <ChildrenCamp key={camp.id} camp={camp} view={view} />
        ))}
      </List>
    </>
  )
}
const { mqMax } = theme
const List = styled.ul<{ view: 'tile' | 'list' }>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'list' ? '1fr' : 'repeat(4, 1fr)')};
  grid-gap: ${({ view }) => (view === 'list' ? '32px 0' : '30px 24px')};
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

export default CampsList
