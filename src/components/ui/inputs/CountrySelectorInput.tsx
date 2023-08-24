import React from 'react'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import kg from 'public/images/svg/countries/kyrgyzstan.svg'
import ru from 'public/images/svg/countries/russia.svg'
import uz from 'public/images/svg/countries/uzbekistn.svg'
import { DefaultSelect } from '@app/components/ui/DefaultSelect'
import { useTranslation } from 'next-i18next'

interface IFormProps {
  formik: any
  phone_number: string
}

const countryOptions = [
  { name: 'Кыргызстан', mask: '+\\9\\96 (999) 999-999', abr: 'KG', icon: kg },
  { name: 'Узбекистан', mask: '+\\9\\98 (99) 999-9999', abr: 'UZ', icon: uz },
  { name: 'Россия', mask: '+7 (999) 999-99-99', abr: 'RU', icon: ru },
]

const CountrySelectorInput = ({ formik, phone_number }: IFormProps) => {
  const handleCountryChange = (selectedCountry: Record<any, any>) => {
    const selectedMask = countryOptions.find((option) => option.name === selectedCountry.name)?.mask
    formik.setFieldValue('phone_number', '')
    formik.setFieldTouched('phone_number', false)
    formik.setFieldValue('selected_country', selectedCountry.name)
    formik.setFieldValue('selected_mask', selectedMask)
  }
  const { t } = useTranslation('forms')

  return (
    <InputMaskWrapper>
      <Select width={formik.values.selected_mask ? 'min-content' : '100%'}>
        <DefaultSelect
          styles={{
            select: {
              width: '100%',
              padding: '0',
            },
          }}
          initialValue={t('chooseCountry')}
          onChange={handleCountryChange}
          options={countryOptions.map((item) => ({ label: item.abr, value: item.abr, ...item }))}
        />
      </Select>

      {formik.values.selected_mask ? (
        <InputMask
          mask={formik.values.selected_mask}
          alwaysShowMask
          onChange={formik.handleChange}
          value={phone_number}
          name="phone_number"
        />
      ) : null}
    </InputMaskWrapper>
  )
}

const { colors } = theme
const Select = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`
const InputMaskWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 17px 0;

  border-bottom: 1px solid ${colors.gray_200};

  &:focus-within {
    border-bottom: 1px solid ${colors.primary};
  }

  input {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: ${colors.gray_200};
    width: 100%;
    //margin-bottom: 10px;

    ${theme.mqMax('md')} {
      font-size: 14px;
    }
  }
`

export default CountrySelectorInput
