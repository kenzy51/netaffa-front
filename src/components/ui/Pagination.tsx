import React from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import arrowIcon from 'public/images/svg/paginationArrow/paginationArrow.svg'
import Image from "next/image";
interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: IPaginationProps) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber)
  }

  const getPageNumbers = () => {
    const pageNumbers: number[] = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }
  const pageNumbers = getPageNumbers()
  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) => (
        <PageNumber key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
          {pageNumber}
        </PageNumber>
      ))}
      {currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)}>Вперед <Image src={arrowIcon} alt='arrow' width={8} height={20}/></NextButton>}{' '}
    </PaginationContainer>
  )
}
const { colors } = theme
const PaginationContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 20px 0;
`
const NextButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  border: none;
  gap:5px;
  margin-left: 10px;
  line-height: 150%; 
  font-weight: 400;
`
interface IPageNumberProps {
  active: boolean
}

const PageNumber = styled.li<IPageNumberProps>`
  width: 40px;
  height: 53px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: ${({ active }) => (active ? colors.white : 'black')};
  background-color: ${({ active }) => (active ? colors.primary : '#F8F8F8')};
  font-size: 14px;
  transition-duration: .3s;
`

export default Pagination
