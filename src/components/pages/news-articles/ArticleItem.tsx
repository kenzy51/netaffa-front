import React from 'react'
import _ from 'lodash'
import { styled } from 'styled-components'
import { Article, News } from '@app/lib/api/gen'
import Link from 'next/link'
import { theme } from '@app/styles/theme'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import InlineSVG from 'react-inlinesvg'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
interface INewsArticeProps {
  item: Article | News
}

interface IItemProps extends INewsArticeProps {
  link?: string
}

const ArticleItem = (props: IItemProps) => {
  const {
    item: { title, image, description, slug },
  } = props
  const link = `medicine/article/${slug}`
  const descriptionText = htmlToStr(description)
  const { t } = useTranslation('buttons')
  const imagePhoto = image ? image : ''
  return (
    <Item>
      <Link href={link}>
        <ImageS src={imagePhoto} alt={title} width={282} height={160} objectFit="cover" />
      </Link>
      <Content>
        <ContentBottom>
          <Description dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 75 }) }} />
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

const ContentBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Description = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  margin-top: 8px;
  letter-spacing: -0.09px;
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
export default ArticleItem
