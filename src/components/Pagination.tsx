import React from 'react'
import ArrowIcon from 'public/images/svg/arrows/pagination-arrow.svg'
import Image from 'next/image'
import styled from 'styled-components'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { theme } from '@app/styles/theme'
import { useTranslation } from 'next-i18next'

interface PaginationProps {
  currentPage: number
  count: number
  pageLimit?: number
  onChange: (page: number) => void
}

const Pagination = ({ currentPage, count, onChange, pageLimit = 10 }: PaginationProps) => {
  const isMobile = useMediaQuery('md'),
    sm = useMediaQuery('sm')
  const showPages = isMobile ? 3 : 7

  const totalPages = Math.ceil(count / pageLimit) // Calculate totalPages directly

  // const totalPages = React.useMemo(() => Math.ceil(count / pageLimit), [count, pageLimit])
  const firstPage = React.useMemo(() => Math.max(currentPage - Math.floor(showPages / 2), 1), [currentPage, showPages])
  const lastPage = React.useMemo(
    () => Math.min(firstPage + showPages - 1, totalPages),
    [firstPage, showPages, totalPages]
  )
  const pages = React.useMemo(
    () => Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i),
    [firstPage, lastPage]
  )
  const { t } = useTranslation('pagination')
  const handlePageChange = (pageNumber: number) => {
    onChange(pageNumber)
  }

  return (
    <nav>
      <List>
        {currentPage !== 1 && !sm && (
          <PrevBtn onClick={() => handlePageChange(currentPage - 1)}>
            <Image src={ArrowIcon} alt="arrow-left" />
            {t('back')}
          </PrevBtn>
        )}
        {firstPage > 1 && (
          <>
            <PageItem role="presentation" onClick={() => handlePageChange(1)}>
              1
            </PageItem>
            {firstPage > 2 && (
              <li className="disabled">
                <span>...</span>
              </li>
            )}
          </>
        )}
        {pages.map((pageNumber) => (
          <PageItem
            role="presentation"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            currentPage={pageNumber === currentPage}
          >
            {pageNumber}
          </PageItem>
        ))}
        {lastPage < totalPages && (
          <>
            {lastPage + 1 < totalPages && (
              <li className="disabled">
                <span style={{ marginRight: '10px' }}>...</span>
              </li>
            )}
            <li role="presentation" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </li>
          </>
        )}
        {currentPage !== totalPages && !sm && (
          <NextBtn onClick={() => handlePageChange(currentPage + 1)}>
            {t('next')}
            <Image src={ArrowIcon} alt="arrow-right" />
          </NextBtn>
        )}
      </List>
    </nav>
  )
}

const { colors } = theme
const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
`
const PageItem = styled.li<{ currentPage?: boolean }>`
  background: ${({ currentPage }) => (currentPage ? colors.primary : 'transparent')};
  color: ${({ currentPage }) => (currentPage ? colors.white : colors.dark)};
  border-radius: 60px;
  cursor: pointer;
  padding: 14.5px 16px;
  transition-duration: 0.3s;
`
const NextBtn = styled.button`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${colors.dark};
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin: 0 0 0 14px;
`
const PrevBtn = styled(NextBtn)`
  img {
    transform: rotate(180deg);
  }
  margin: 0 14px 0 0;
`

export default Pagination
