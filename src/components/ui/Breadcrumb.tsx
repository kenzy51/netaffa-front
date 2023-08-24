import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/breadcrumb-arrow.svg'
import { theme } from '@app/styles/theme'
import Link from 'next/link'

interface IBreadcrumbProps {
  items: { label: string; link?: string }[]
}

const Breadcrumb = ({ items }: IBreadcrumbProps) => {
  return (
    <BreadcrumbWrapper>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <Link href={item.link}>
              <BreadcrumbItem>{item.label}</BreadcrumbItem>
            </Link>
          ) : (
            <BreadcrumbItem
              styles={{
                cursor: 'no-drop',
              }}
            >
              {item.label}
            </BreadcrumbItem>
          )}
          {index !== items.length - 1 && (
            <Separator>
              <InlineSVG src={ArrowIcon.src} />
            </Separator>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbWrapper>
  )
}

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
`
const BreadcrumbItem = styled.div<{ styles?: CSSProperties | undefined }>`
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${theme.colors.gray_200};
  ${({ styles }) => styles as never};
  ${theme.mqMax('sm')} {
    font-size: 10px;
  }
`
const Separator = styled.span`
  margin: 0 14px;
  display: flex;
  align-items: center;
  ${theme.mqMax('sm')} {
    margin: 0 5px;
  }
`

export default Breadcrumb
