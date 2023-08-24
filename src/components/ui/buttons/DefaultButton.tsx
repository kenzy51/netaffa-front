import {ComponentPropsWithRef, CSSProperties} from 'react'
import styled from 'styled-components'
import {theme} from '@app/styles/theme'

interface IDefaultButtonProps extends ComponentPropsWithRef<'button'> {
    active?: boolean
    styles?: CSSProperties | undefined
}

const DefaultButton = (props: IDefaultButtonProps) => {
    const {styles = {}, children, active = true, ...other} = props
    return (
        <Button styles={styles} active={active} {...other}>
            {children}
        </Button>
    )
}

const {colors, mqMax} = theme

const Button = styled.button<IDefaultButtonProps>`
  font-family: 'Roboto', sans-serif;
  background: ${({active}) => (active ? colors.primary : colors.white)};
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 16px;
  color: ${({active}) => (active ? colors.white : colors.primary)};
  border-radius: 50px;
  padding: 30px 60px;
  width: fit-content;
  // hover styles
  // &:hover {
    //   background: ${({active}) => (active ? colors.white : colors.primary)};
    //   color: ${({active}) => (active ? colors.primary : colors.white)};
  //   transition: 0.3s;
  // }
  ${({styles}) => styles as never};

  ${mqMax('sm')} {
    font-size: 16px;
    padding: 15px 33px;
  }
`

export default DefaultButton

import React from 'react'

export const SmallButton = (props: IDefaultButtonProps) => {
    const {styles = {}, children, active = true, ...other} = props

    return (
        <SmallButton2 styles={styles} active={active} {...other}>
            {children}
        </SmallButton2>
    )
}
const ButtonColor = '#F8F8F8'
const SmallButton2 = styled.button<IDefaultButtonProps>`
  font-family: 'Roboto', sans-serif;
  background: ${({active}) => (active ? colors.primary : ButtonColor)};
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  line-height: 16px;
  color: ${({active}) => (active ? colors.white : colors.primary)};
  border-radius: 50px;
  padding: 20px 40px;
  width: fit-content;
  transition-duration: 0.3s;

  ${mqMax('sm')} {
    font-size: 14px;
    padding: 15px 40px;

    font-weight: 400;
    line-height: normal;
  }

  // hover styles
  // &:hover {
    //   background: ${({active}) => (active ? colors.white : colors.primary)};
    //   color: ${({active}) => (active ? colors.primary : colors.white)};
  //   transition: 0.3s;
  // }
  ${({styles}) => styles as never}
`
