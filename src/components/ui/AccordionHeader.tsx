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
  marginBottom?: any
  fontWeight?: any
}

const AccordionHeaderComponent = ({
  label,
  customArrow,
  children,
  styles = {
    accordionStyles: {},
    contentStyles: {},
    labelStyles: {},
  },
  marginBottom,
  fontWeight,
  ...other
}: DefaultDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AccordionWrapper marginBottom={marginBottom} {...other}>
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
const AccordionWrapper = styled.div<{ marginBottom: any }>`
  width: 100%;
  overflow: hidden;
  margin-bottom: ${(props) => props.marginBottom};
`
const AccordionHeader = styled.div<IStylesProps>`
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  gap: 10px;
  font-size: ${({ fontSize }) => fontSize};
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
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

export default AccordionHeaderComponent
