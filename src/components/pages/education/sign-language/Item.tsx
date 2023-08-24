import { Course } from '@app/lib/api/gen'
import _ from 'lodash'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import InlineSVG from 'react-inlinesvg'
import { useTranslation } from 'next-i18next'

interface ISignLangItemProps {
  course: Course
  view?: 'tile' | 'list'
}

const SignLangItem = (props: ISignLangItemProps) => {
  const link = `/education/sign-language/${props.course.slug}`

  return props.view === 'list' ? <ListItem {...props} link={link} /> : <TileItem {...props} link={link} />
}

interface ITileItemProps extends ISignLangItemProps {
  link: string
}
const TileItem = (props: ITileItemProps) => {
  const {
    course: { title, image, description },
    link,
  } = props
  const { t } = useTranslation('buttons')
  return (
    <Item>
      {!!image && (
        <Link href={link}>
          <ImageS src={image} alt={title} width={282} height={160} objectFit="cover" />
        </Link>
      )}
      <Content>
        <Link href={link}>
          <Title>{title}</Title>
        </Link>
        <ContentBottom>
          <Description>{_.truncate(description, { length: 105 })}</Description>
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
const Title = styled.h4`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.005em;
  margin-top: 17px;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ContentBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Description = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0;
  color: ${colors.gray_200};
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

interface IListItemProps extends ISignLangItemProps {
  link: string
}
const ListItem = (props: IListItemProps) => {
  const { t } = useTranslation('buttons')
  return (
    <ItemL>
      <ImageWrapper>
        {!!props.course.image && (
          <Link href={props.link}>
            <ImageS src={props.course.image} alt={props.course.title} width={282} height={160} objectFit="cover" />
          </Link>
        )}
      </ImageWrapper>
      <ContentL>
        <div>
          <Link href={props.link}>
            <TitleL>{props.course.title}</TitleL>
          </Link>
          <DescriptionL>{_.truncate(props.course.description, { length: 328 })}</DescriptionL>
        </div>
        <LinkSL href={props.link}>
          {t('more')}
          <InlineSVG src={ArrowIcon.src} />
        </LinkSL>
      </ContentL>
    </ItemL>
  )
}

const ItemL = styled.li`
  display: flex;
  width: 100%;
  max-height: 172px;
  min-height: 172px;
  column-gap: 25px;
`
const ImageWrapper = styled.div`
  border-radius: 10px;
  max-width: 282px;
  height: 160px;
  object-fit: cover;
  width: 100%;
`
const ContentL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`
const TitleL = styled.h4`
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.12px;
  margin-bottom: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DescriptionL = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: ${colors.gray_200};
  margin-bottom: 20px;
`
const LinkSL = styled(Link)`
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

export default SignLangItem
