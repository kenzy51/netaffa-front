import React from 'react'
import { css } from 'styled-components'
import { DefaultSelect } from '@app/components/ui/DefaultSelect'
import { useRouter } from 'next/router'

interface SelectProps {
  value: string
  onChange: (value: { value: string; label: string }) => void
  options: string[]
}

const OptionCss = css`
  &:hover {
    background-color: #e6e6e6;
    color: #000;
  }
`

const PartnerSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const { locale } = useRouter()
  const newOptions = options.map((option) => ({ label: option, value: option }))
  newOptions.unshift({ label: 'Выбрать программу', value: '' })

  return (
    <>
      <DefaultSelect
        styles={{
          select: {
            height: 56,
            width: '100%',
            border: '1px solid #38496C',
            padding: '20px 30px',
            borderRadius: 50,
            fontSize: 20,
          },
          placeholder: {
            color: '#000',
            fontSize: 20,
          },
          arrow: {
            width: 12,
            height: 12,
          },
          dropDown: {
            padding: 2,
            borderRadius: 5,
            maxHeight: 255,
          },
          option: OptionCss,
        }}
        initialValue={locale === 'ru' ? 'Выбрать программу' : 'Select program'}
        onChange={onChange}
        options={newOptions}
      />
    </>
  )
}

export default PartnerSelect
