import React, { useState } from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import MedicalOrganition from './Item'
import { IMedicalOrganizations } from '@app/pages/medicine'
import { MedicalOrganization } from '@app/lib/api/gen'
import arrow from 'public/images/svg/arrows/arrowIcon.svg'
import InlineSVG from 'react-inlinesvg'
import { useTranslation } from 'next-i18next'

const MedicalOrganizationList = (props: IMedicalOrganizations) => {
  const { medicalOrganizations } = props
  const { t } = useTranslation('medicalCare')
  const [visibleItems, setVisibleItems] = useState(8)
  const medicalResults = medicalOrganizations?.results || []

  const handleLoadMore = () => {
    const plus = medicalResults.length - visibleItems > 4 ? 4 : medicalResults.length - visibleItems
    setVisibleItems((prevVisibleItems) => prevVisibleItems + plus)
  }

  if (!medicalResults.length) return <h2>Нет доступных клиник</h2>

  return (
    <>
      <List>
        {medicalResults.slice(0, visibleItems).map((med: MedicalOrganization) => (
          <MedicalOrganition key={med.id} medicalOrganization={med}  />
        ))}
      </List>
      {visibleItems < medicalResults.length && (
        <LoadMoreButton onClick={handleLoadMore}>
          {t('showMore')} <InlineSVG src={arrow.src} width={10} height={10} />
        </LoadMoreButton>
      )}
    </>
  )
}
const { mqMax } = theme
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px 20px;
  justify-items: center;
  margin-bottom: 20px;
  ${mqMax('xl')} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${mqMax('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mqMax('sm')} {
    grid-template-columns: 1fr;
  }
`
const LoadMoreButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  color: black;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`

export default MedicalOrganizationList
