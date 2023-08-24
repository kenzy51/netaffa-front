import React from 'react'
import _ from 'lodash'
import { styled } from 'styled-components'
import { Article, News } from '@app/lib/api/gen'
import Link from 'next/link'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import InlineSVG from 'react-inlinesvg'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
interface INewsArticeProps {
  item: Article | News
}

interface IItemProps extends INewsArticeProps {
  link?: string
}

const NewsItem = (props: IItemProps) => {
  const {
    item: { title, image, description, slug, created_at },
  } = props
  const link = `medicine/news/${slug}`
  const descriptionText = htmlToStr(description)
  const imagePhoto = image ? image : ''
  const { t } = useTranslation('buttons')
  return (
    <Item>
      <Link href={link}>
        <ImageS src={imagePhoto} alt={title} width={282} height={160} objectFit="cover" />
      </Link>
      <Content>
        <LocationWrapper>
          {!!created_at && (
            <p>
              {format(parseISO(created_at), 'd MMMM yyyy г', {
                locale: ru,
              })}
            </p>
          )}
        </LocationWrapper>
        <ContentTop>
          <Link href={link}>
            <Title>{title}</Title>
          </Link>
        </ContentTop>
        <ContentBottom>
          <Description dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 105 }) }} />
          <LinkS href={link}>
            {t('more')}
            <InlineSVG src={ArrowIcon.src} />
          </LinkS>
        </ContentBottom>
      </Content>
    </Item>
  )
}

const { colors } = theme
const Item = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 282px;
  width: 100%;
  max-height: 338px;
  min-height: 338px;
`
const ImageS = styled(Image)`
  border-radius: 10px;
  max-width: 282px;
  height: 160px;
  object-fit: cover;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    display: inline-block;
  }
`
const Title = styled.h4`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.005em;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin: 8px 0;
  p {
    font-size: 12px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: ${colors.gray_200};
  }
`
const ContentBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Description = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0;
  color: ${colors.gray_200};
  word-break: break-all;
`
const LinkS = styled(Link)`
  color: #1b31ff;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  line-height: 140%;
  display: flex;
  align-items: center;
  svg {
    display: inline-block;
    margin-left: 4px;
  }
`
export default NewsItem
