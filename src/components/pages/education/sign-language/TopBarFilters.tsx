import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'
import Select from '@app/components/ui/Select'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import InlineSVG from 'react-inlinesvg'
import TileIcon from 'public/images/svg/tile-icon.svg'
import ListIcon from 'public/images/svg/list-icon.svg'
import FilterIcon from 'public/images/svg/filter-icon.svg'
import { useTranslation } from 'next-i18next'

interface ITopBarFiltersProps {
  onToggleMobileMenu: () => void
  onAgeFilterChange: (value: string) => void
}
const TopBarFilters = (props: ITopBarFiltersProps) => {
  const { onToggleMobileMenu } = props
  const { query, replace } = useRouter()
  const xl = useMediaQuery('xl'),
    lg = useMediaQuery('lg')
  const { t: tCommon } = useTranslation('common')
  const { t: tButton } = useTranslation('buttons')
  const { current: data } = useRef({
    target_audience: [
      { label: tCommon('everyone'), value: '' },
      { label: tCommon('programChildren'), value: 'children' },
      { label: tCommon('adultProgram'), value: 'adults' },
    ],
    view: [
      { icon: TileIcon, value: 'tile' },
      { icon: ListIcon, value: 'list' },
    ],
  })
  const target_audience = query.target_audience || '',
    view = query.view || 'tile'

  const ageFilterHandler = (value: string) => {
    replace({
      query: {
        ...query,
        target_audience: value,
        page: 1,
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

      {!lg && (
        <ViewWrapper>
          {data.view.map((item) => (
            <DefaultButton
              key={item.value}
              onClick={() =>
                replace({
                  query: {
                    ...query,
                    view: item.value,
                  },
                })
              }
              active={view === item.value}
              styles={{
                fontSize: '20px',
                borderRadius: '50%',
                width: 56,
                height: 56,
                padding: 0,
              }}
            >
              <IconWrapper active={view === item.value}>
                <InlineSVG src={item.icon.src} />
              </IconWrapper>
            </DefaultButton>
          ))}
        </ViewWrapper>
      )}
    </Wrapper>
  )
}

const { colors } = theme
const Wrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`
const BtnsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`
const ViewWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`
const IconWrapper = styled.div<{ active: boolean }>`
  svg path {
    fill: ${({ active }) => (active ? colors.white : colors.primary)};
  }
`

export default TopBarFilters
