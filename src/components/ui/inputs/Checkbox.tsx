//import { ChangeEvent, ComponentPropsWithRef, CSSProperties, ReactNode } from 'react'
//import styled from 'styled-components'
//import { theme } from '@app/styles/theme'
//import checkbox from 'public/svg/чек.svg'
//
//interface IStylesProps {
//  label?: CSSProperties
//  input?: CSSProperties
//  text?: CSSProperties
//}
//
//interface ICheckboxProps extends ComponentPropsWithRef<'input'> {
//  label: ReactNode
//  value?: string
//  checked: boolean
//  onChange: (e: ChangeEvent<HTMLInputElement>) => void
//  styles?: IStylesProps
//}
//
//const Checkbox = ({ label, value = '', checked, onChange, styles, ...other }: ICheckboxProps) => {
//  return (
//    <CheckboxLabel styles={styles}>
//      <input type="checkbox" name="type" value={value} checked={checked} onChange={onChange} {...other} />
//      <span>{label}</span>
//    </CheckboxLabel>
//  )
//}
//
//const { colors } = theme
//const CheckboxLabel = styled.label<{
//  styles?: IStylesProps
//}>`
//  display: flex;
//  align-items: center;
//  column-gap: 10px;
//  cursor: pointer;
//  ${({ styles }) => styles?.label as never}
//
//  span {
//    font-size: 14px;
//    font-family: Roboto, sans-serif;
//    font-weight: 700;
//    line-height: 150%;
//    color: ${colors.dark};
//    ${({ styles }) => styles?.text as never}
//  }
//  input[type='checkbox'] {
//    cursor: pointer;
//    width: 18px;
//    height: 18px;
//    background-image: url(${checkbox.src});
//    ${({ styles }) => styles?.input as never}
//  }
//`
//
//export default Checkbox

import { ChangeEvent, ComponentPropsWithRef, CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import checkbox from 'public/images/svg/чек.svg'
import { IStylesProps } from '@app/@types/common'

interface ICheckboxStylesProps {
  label?: CSSProperties
  checkbox?: CSSProperties
  text?: CSSProperties
}

interface ICheckboxProps extends ComponentPropsWithRef<'input'> {
  label: ReactNode
  value?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  styles?: ICheckboxStylesProps
}

const Checkbox = ({ label, value = '', checked, onChange, styles, ...other }: ICheckboxProps) => {
  return (
    <CheckboxLabel styles={styles?.label}>
      <StyledCheckbox checked={checked}>
        <HiddenCheckbox type="checkbox" name="type" value={value} checked={checked} onChange={onChange} {...other} />
        <CheckmarkIcon checked={checked} src={checkbox.src} alt="Checked" />
      </StyledCheckbox>
      <Text styles={styles?.text}>{label}</Text>
    </CheckboxLabel>
  )
}

const { colors } = theme
const CheckboxLabel = styled.label<IStylesProps>`
  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  ${({ styles }) => styles as never}
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`
const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  min-width: 18px;
  height: 18px;
  border: 1px solid ${colors.gray_200};
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? colors.primary : 'transparent')};
`
const CheckmarkIcon = styled.img<{ checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  display: ${({ checked }) => (checked ? 'block' : 'none')};
`
const Text = styled.span<IStylesProps>`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 150%;
  color: ${colors.dark};
  ${({ styles }) => styles as never}
`

export default Checkbox
