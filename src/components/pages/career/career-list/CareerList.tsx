import { CareerVacanciesList200Response } from '@app/lib/api/gen'
import React from 'react'
import { styled } from 'styled-components'
import CareerItem from './CareerItem'
interface ICareerListProps {
  careerVacancies?: CareerVacanciesList200Response
}
const CareerList = (props: ICareerListProps) => {
  const { careerVacancies } = props
  return (
    <List>
      {careerVacancies?.results?.map((career) => (
        <CareerItem key={career.slug} careerVacancy={career} />
      ))}
    </List>
  )
}
const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px 0;
  justify-items: center;
`
export default CareerList
