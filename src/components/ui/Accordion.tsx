/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import InlineSVG from 'react-inlinesvg'
import ArrowDefault from 'public/images/svg/arrows/arrowIcon.svg'

interface IStylesProps {
  accordionStyles?: CSSProperties
  contentStyles?: CSSProperties
  labelStyles?: CSSProperties
  fontSize?: any
}
interface DefaultDropdownProps extends ComponentPropsWithRef<'div'> {
  label: ReactNode
  customArrow?: ReactNode
  styles?: IStylesProps
  fontSize?: string
}

const Accordion = ({
  label,
  customArrow,
  children,
  styles = {
    accordionStyles: {},
    contentStyles: {},
    labelStyles: {},
  },
  ...other
}: DefaultDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AccordionWrapper {...other} styles={styles?.accordionStyles}>
      <AccordionHeader styles={styles?.accordionStyles} onClick={handleToggle}>
        <Label styles={styles?.labelStyles}>{label}</Label>
        <ArrowContainer active={isOpen}>
          {customArrow ? customArrow : <InlineSVG src={ArrowDefault.src} />}
        </ArrowContainer>
      </AccordionHeader>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Content styles={styles?.contentStyles}>{children}</Content>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionWrapper>
  )
}

interface IStylesProps {
  styles?: CSSProperties
}
const AccordionWrapper = styled.div<IStylesProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${(props) => props.styles as never};
`
const AccordionHeader = styled.div<IStylesProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 4px;
  font-size: ${({ fontSize }) => fontSize};
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-align: left;
`
const Label = styled.span<IStylesProps>``
const ArrowContainer = styled.div<{
  active: boolean
}>`
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0deg)')};
`
const Content = styled.div<IStylesProps>`
  ${({ styles }) => styles as never}
`

export default Accordion
