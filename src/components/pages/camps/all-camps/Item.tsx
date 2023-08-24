import _ from 'lodash'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import LocationIcon from 'public/images/svg/location.svg'
import { Camp } from '@app/lib/api/gen'
import { format, parseISO } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IChildrenCampProps {
  camp: Camp
  view?: 'tile' | 'list'
}

const ChildrenCamp = (props: IChildrenCampProps) => {
  const link = `/camps/${props.camp?.slug}`
  return props.view === 'list' ? <ListItem {...props} link={link} /> : <TileItem {...props} link={link} />
}

interface ITileItemProps extends IChildrenCampProps {
  link: string
}
const TileItem = (props: ITileItemProps) => {
  const {
    camp: { name, images, description, age_range, city_name, start_date, end_date, price },
    link,
  } = props
  const descriptionText = htmlToStr(description)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const image: any = images && images[0]?.image
  const { t } = useTranslation('buttons')
  const { t: tCamp } = useTranslation('camps')
  const { locale } = useRouter()
  const formattedStartDate = format(parseISO(start_date), 'd MMMM', {
    locale: locale === 'ru' ? ru : enUS,
  })

  const formattedEndDate = format(parseISO(end_date), 'd MMMM', {
    locale: locale === 'ru' ? ru : enUS,
  })
  return (
    <Item>
      <Link href={link}>
        <ImageS src={image} alt={name} width={282} height={160} objectFit="cover" />
      </Link>
      <Content>
        <LocationWrapper>
          <InlineSVG src={LocationIcon.src} />
          <p>{city_name}</p>
          <div>
            <p>
              {formattedStartDate}
              &nbsp;
            </p>
            {'-'}
            <p>
              &nbsp;
              {formattedEndDate}
            </p>
          </div>
        </LocationWrapper>

        <ContentTop>
          <Link href={link}>
            <Title title={name}>{_.truncate(name, { length: 35 })}</Title>
          </Link>
          <AgeRange>
            {age_range} {tCamp('years')}
          </AgeRange>
        </ContentTop>
        <Price>{price} KGS</Price>

        <ContentBottom>
          <Description dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 125 }) }} />
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
  max-height: 400px;
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
  margin: 10px 0;

  a {
    display: inline-block;
  }
`
const Title = styled.h4`
  width: 200px;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.005em;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
`
const Price = styled(Title)`
  font-size: 16px;
`
const AgeRange = styled.p`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-radius: 50px;
  background-color: ${colors.white};
  color: ${colors.gray_200};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  white-space: nowrap;
`
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-top: 15px;
  p {
    font-size: 12px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: ${colors.gray_200};
  }
  div {
    display: flex;
    margin-left: 4px;
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
  margin-top: 10px;
  margin-bottom: 8px;
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

interface IListItemProps extends IChildrenCampProps {
  link: string
}
const ListItem = (props: IListItemProps) => {
  const {
    camp: { name, images, description, age_range, city_name },
    link,
  } = props
  const descriptionText = htmlToStr(description)
  const image = images && images[0]?.image
  const { t } = useTranslation('buttons')
  const { t: tCamp } = useTranslation('camps')

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
              {age_range} {tCamp('years')}
            </AgeRangeL>
          </ContentTopL>
          <LocationWrapperL>
            <InlineSVG src={LocationIcon.src} />
            <p>{city_name}</p>
          </LocationWrapperL>
          <DescriptionL dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 325 }) }} />
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
const LocationWrapperL = styled(LocationWrapper)`
  margin-bottom: 10px;
`
const DescriptionL = styled.div`
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

export default ChildrenCamp
