import { ChangeEvent, ComponentPropsWithRef, CSSProperties, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/arrowIcon.svg'

interface CustomSelectProps extends ComponentPropsWithRef<'select'> {
  options: {
    label: string
    value: string
  }[]
  onSelected: (option: string) => void
  customArrow?: ReactNode
  styles?: {
    selectStyles?: CSSProperties
    wrapperStyles?: CSSProperties
    optionStyles?: CSSProperties
  }
}

const Select = (props: CustomSelectProps) => {
  const { options, onSelected, styles, customArrow, ...other } = props
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value
    setSelectedOption(option)
    onSelected(option)
  }

  return (
    <Wrapper styles={styles?.wrapperStyles}>
      <SelectS {...other} styles={styles?.selectStyles} value={selectedOption} onChange={handleOptionSelect}>
        {options &&
          options.map((option) => (
            <Option styles={styles?.optionStyles} key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
      </SelectS>

      <ArrowWrapper>{customArrow ? customArrow : <InlineSVG src={ArrowIcon.src} />}</ArrowWrapper>
    </Wrapper>
  )
}

interface IStylesProps {
  styles?: CSSProperties
}

const { colors, mqMax } = theme
const Wrapper = styled.div<IStylesProps>`
  position: relative;
  width: 100%;

  ${({ styles }) => styles as never}
`
const SelectS = styled.select<IStylesProps>`
  padding: 16px 45px 16px 20px;
  width: 100%;
  cursor: pointer;
  height: 56px;
  border-radius: 50px;
  border: 1px solid ${colors.gray_200};
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  background: none;
  //  line-height: 6px;
  ${mqMax('sm')} {
    height: 44px;
    padding: 10px 20px;
    font-size: 14px;
  }
  color: ${colors.dark};
  ${({ styles }) => styles as never}
`
const Option = styled.option<IStylesProps>`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  transition: background-color 0.2s;
  color: ${colors.dark};
  ${({ styles }) => styles as never}
`
const ArrowWrapper = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 30px;
  pointer-events: none;
`

export default Select
