import React, { CSSProperties } from 'react'
import { useClickAway } from 'react-use'
import InlineSVG from 'react-inlinesvg'
import { RuleSet, styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import ArrowDownIcon from 'public/images/svg/arrows/arrowIcon.svg'
import { IStylesProps } from '@app/@types/common'

type TStyles = {
  select?: CSSProperties
  label?: CSSProperties
  placeholder?: CSSProperties
  dropDown?: CSSProperties
  option?: RuleSet<object>
  arrow?: CSSProperties
}
type TOption = { value: string; label: string; disabled?: boolean } & Record<any, any>
interface DefaultSelectProps {
  label?: string
  initialValue?: string
  errorMessage?: string | false | undefined
  disabled?: boolean
  styles?: TStyles
  value?: { value: string; label: string } | null
  options: TOption[]
  onChange?: (value: { value: string; label: string }) => void
  customArrowSrc?: string
}

export const DefaultSelect = ({
  initialValue,
  value: selectValue,
  options,
  onChange,
  styles,
  label,
  disabled = false,
  customArrowSrc,
}: DefaultSelectProps) => {
  const [value, setValue] = React.useState(selectValue)
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  const dropDownToggle = () => {
    if (disabled) return
    setIsOpen((prev) => !prev)
  }
  const handleSelectChange = (value: { value: string; label: string; disabled?: boolean }) => {
    if (value?.disabled) return

    onChange && onChange(value)
    setValue(value)
    setIsOpen(false)
  }

  useClickAway(selectRef, () => {
    setIsOpen(false)
  })

  return (
    <Wrapper>
      {label ? <Label styles={styles?.label}>{label}</Label> : null}

      <Select ref={selectRef}>
        <SelectHead onClick={dropDownToggle} role="presentation" select={styles?.select}>
          <div>
            {value?.label ||
              (initialValue && <Placeholder styles={styles?.placeholder}>{initialValue}</Placeholder>) ||
              options?.[0].label}
          </div>

          <Arrow styles={styles?.arrow} isUp={isOpen} src={customArrowSrc || ArrowDownIcon.src} />
        </SelectHead>

        {isOpen ? (
          <Dropdown styles={styles?.dropDown}>
            {options.map((item) => (
              <Option
                onClick={() => handleSelectChange(item)}
                css={styles?.option}
                disabled={item?.disabled}
                key={item.value}
              >
                {item.label}
              </Option>
            ))}
          </Dropdown>
        ) : null}
      </Select>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const Label = styled.p<IStylesProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  ${theme.mqMax('md')} {
    font-size: 14px;
  }
  ${({ styles }) => styles as never}
`
const Select = styled.div`
  position: relative;
  width: 100%;
`
const SelectHead = styled.div<TStyles>`
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 10px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  ${({ select }) => select as never}
`

const Placeholder = styled.p<IStylesProps>`
  color: #6e6f6f;
  font-size: 18px;

  ${theme.mqMax('md')} {
    font-size: 14px;
  }
  ${({ styles }) => styles as never}
`

interface IArrowProps {
  isUp: boolean
}
const Arrow = styled(InlineSVG)<IArrowProps & IStylesProps>`
  width: 8px;
  height: 8px;
  transition: 0.2s;
  ${({ styles }) => styles as never}
  ${({ isUp }) => (isUp ? 'transform: rotate(180deg)' : null)}
`

const Dropdown = styled.div<IStylesProps>`
  position: absolute;
  min-width: 100%;
  z-index: 101;
  margin-top: 3px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 400px;
  padding: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ styles }) => styles as never}
`

interface IOption {
  disabled?: boolean
}
const Option = styled.div<IOption & { css?: RuleSet<object> }>`
  border: none;
  margin-top: -1px;
  cursor: pointer;
  color: black;
  background: white;
  padding: 6px 11px;
  transition: 0.2s;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background: ${theme.colors.grey};
  }
  ${({ disabled }) =>
    disabled
      ? `cursor: not-allowed;
    color: #dadcdc;`
      : null}
  ${({ css }) => css}
`
