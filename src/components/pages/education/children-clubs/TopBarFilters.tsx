import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import Select from '@app/components/ui/Select'
import { useLocations } from '@app/lib/store/locations'

const TopBarFilters = () => {
  const { query, replace, locale } = useRouter()
  const [citiesStore, countriesStore] = useLocations((state) => [state.cities, state.countries])
  const chooseCityText = locale === 'ru' ? 'Выбрать город' : 'Select city'
  const chooseCountryText = locale === 'ru' ? 'Выбрать страну' : 'Select country'

  const cities = citiesStore.map((city) => ({ label: city.name, value: `${city.id}` })),
    countries = countriesStore.map((country) => ({ label: country.name, value: `${country.id}` }))
  cities.unshift({ label: chooseCityText, value: '' })
  countries.unshift({ label: chooseCountryText, value: '' })

  const handleOptionSelect = (queryName: string, option: string) => {
    replace({
      query: {
        ...query,
        [queryName]: option,
      },
    })
  }

  return (
    <Wrapper>
      <SelectsWrapper>
        <SelectWrapper>
          <Select options={countries} onSelected={(option) => handleOptionSelect('country', option)} />
        </SelectWrapper>
        <SelectWrapper>
          <Select options={cities} onSelected={(option) => handleOptionSelect('city', option)} />
        </SelectWrapper>
      </SelectsWrapper>
    </Wrapper>
  )
}

const { mqMax } = theme
const Wrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`
const SelectsWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  flex: 1;
  ${mqMax('md')} {
    row-gap: 10px;
    flex-direction: column;
    align-items: center;
  }
`
const SelectWrapper = styled.div`
  max-width: 286px;
  width: 100%;
`

export default TopBarFilters
