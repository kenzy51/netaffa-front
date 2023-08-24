import { ChildrenClub } from '@app/lib/api/gen'
import _ from 'lodash'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import LocationIcon from 'public/images/svg/location.svg'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IChildrenClubProps {
  club: ChildrenClub
  view?: 'tile' | 'list'
}

const ChildrenClub = (props: IChildrenClubProps) => {
  const link = `/education/children-clubs/${props.club.slug}`

  return props.view === 'list' ? <ListItem {...props} link={link} /> : <TileItem {...props} link={link} />
}

interface ITileItemProps extends IChildrenClubProps {
  link: string
}
const TileItem = (props: ITileItemProps) => {
  const {
    club: { name, image, description, age_range, city_name },
    link,
  } = props
  const descriptionText = htmlToStr(description)
  const { t } = useTranslation('buttons')
  const { locale } = useRouter()
  return (
    <Item>
      {!!image && (
        <Link href={link}>
          <ImageS src={image} alt={name} width={282} height={160} objectFit="cover" />
        </Link>
      )}
      <Content>
        <ContentTop>
          <Link href={link}>
            <Title>{name}</Title>
          </Link>
          <AgeRange>
            {age_range} {locale === 'ru' ? 'лет' : 'years'}
          </AgeRange>
        </ContentTop>
        <LocationWrapper>
          <InlineSVG src={LocationIcon.src} />
          <p>{city_name}</p>
        </LocationWrapper>
        <ContentBottom>
          <Description>{_.truncate(descriptionText, { length: 105 })}</Description>
          <LinkS href={link}>
            {t('more')}
            <InlineSVG src={ArrowIcon.src} />
          </LinkS>
        </ContentBottom>
      </Content>
    </Item>
  )
}

const { colors, mqMax } = theme
const Item = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 282px;
  width: 100%;
  //max-height: 338px;
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
  margin-top: 17px;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const AgeRange = styled.p`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-radius: 50px;
  background-color: ${colors.white};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
`
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 10px;
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
const Description = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0;
  color: ${colors.gray_200};
`
const LinkS = styled(Link)`
  margin-top: 30px;
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
  ${mqMax('sm')} {
    margin-top: 20px;
  }
`

interface IListItemProps extends IChildrenClubProps {
  link: string
}
const ListItem = (props: IListItemProps) => {
  const {
    club: { name, image, description, age_range, city_name },
    link,
  } = props
  const descriptionText = htmlToStr(description)
  const { t } = useTranslation('buttons')
  const { locale } = useRouter()
  return (
    <ItemL>
      <ImageWrapper>
        {!!image && (
          <Link href={link}>
            <ImageS src={image} alt={name} width={282} height={160} objectFit="cover" />
          </Link>
        )}
      </ImageWrapper>
      <ContentL>
        <div>
          <ContentTopL>
            <Link href={link}>
              <TitleL>{name}</TitleL>
            </Link>
            <AgeRangeL>
              {age_range} {locale === 'ru' ? 'лет' : 'years'}
            </AgeRangeL>
          </ContentTopL>
          <LocationWrapperL>
            <InlineSVG src={LocationIcon.src} />
            <p>{city_name}</p>
          </LocationWrapperL>
          <DescriptionL>{_.truncate(descriptionText, { length: 328 })}</DescriptionL>
        </div>
        <LinkSL href={link}>
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
const ContentTopL = styled(ContentTop)`
  justify-content: initial;
  column-gap: 15px;
  margin-bottom: 13px;
`
const TitleL = styled.h4`
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const AgeRangeL = styled(AgeRange)``
const LocationWrapperL = styled(LocationWrapper)``
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

export default ChildrenClub
