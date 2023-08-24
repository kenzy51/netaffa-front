import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useMediaQuery from '@app/hooks/useMediaQuery'
import Select from '@app/components/ui/Select'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import InlineSVG from 'react-inlinesvg'
import FilterIcon from 'public/images/svg/filter-icon.svg'
import { theme } from '@app/styles/theme'
import { useTranslation } from 'next-i18next'

interface ITopBarFiltersProps {
  onToggleMobileMenu?: () => void
  onAgeFilterChange: (value: string) => void
}
const TopFilters = (props: ITopBarFiltersProps) => {
  const { onToggleMobileMenu } = props
  const { query, replace } = useRouter()
  const xl = useMediaQuery('xl'),
    lg = useMediaQuery('lg')
  const { t } = useTranslation('common')
  const { t: tButton } = useTranslation('buttons')
  const data = {
    target_audience: [
      { label: t('everyone'), value: '' },
      { label: t('programChildren'), value: 'children' },
      { label: t('adultProgram'), value: 'adults' },
    ],
  }
  const target_audience = query.target_audience || ''
  const ageFilterHandler = (value: string) => {
    replace({
      query: {
        ...query,
        target_audience: value,
      },
    })
    props.onAgeFilterChange(value)
  }

  return (
    <Wrapper>
      {lg && (
        <DefaultButton
          onClick={onToggleMobileMenu}
          styles={{
            fontSize: 14,
            fontWeight: 400,
            padding: '15px 33px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {tButton('filter')}
          <InlineSVG src={FilterIcon.src} style={{ marginLeft: 5 }} />
        </DefaultButton>
      )}

      {xl ? (
        <Select
          options={data.target_audience}
          onSelected={ageFilterHandler}
          styles={{
            selectStyles: {
              border: 'none',
              background: 'transparent',
              color: theme.colors.primary,
            },
            wrapperStyles: {
              maxWidth: 300,
            },
          }}
        />
      ) : (
        <BtnsWrapper>
          {data.target_audience.map((item) => (
            <DefaultButton
              key={item.value}
              onClick={() => ageFilterHandler(item.value)}
              active={target_audience === item.value}
              styles={{
                padding: '20px 25px',
                fontSize: '20px',
              }}
            >
              {item.label}
            </DefaultButton>
          ))}
        </BtnsWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`
const BtnsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

export default TopFilters
