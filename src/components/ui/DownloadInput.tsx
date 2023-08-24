import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import search from 'public/images/svg/search.svg'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

type OnSearchFunction = (query: string) => void

interface DownloadInputProps {
  onSearch: OnSearchFunction
}

const DownloadInput = ({ onSearch }: DownloadInputProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { t } = useTranslation('dowload')
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    onSearch(event.target.value)
  }
  const placeHolder = t('search')
  return (
    <StyledInput>
      <input type="text" placeholder={placeHolder} value={searchQuery} onChange={handleInputChange} />
      <button>
        <Image src={search} alt="search" height={24} width={24} />
      </button>
    </StyledInput>
  )
}

const StyledInput = styled.div`
  width: 100%;
  border-radius: 50px;
  border: 1px solid black;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;

  input {
    background: none;
    height: 56px;
    padding: 16px 0;
    width: 100%;
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      color: #38496c;
      margin-top: 8px; /* You can also use margin-top to adjust the position */
    }
  }
`
export default DownloadInput
