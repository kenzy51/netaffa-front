import _ from 'lodash'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import LocationIcon from 'public/images/svg/location.svg'
import { MedicalOrganization } from '@app/lib/api/gen'
import { useTranslation } from 'next-i18next'

interface IChildrenCampProps {
  medicalOrganization: MedicalOrganization
  view?: 'tile' | 'list'
}

const MedicalOrganition = (props: IChildrenCampProps) => {
  const link = `/medicine/${props.medicalOrganization?.slug}`

  return props.view === 'list' ? <ListItem {...props} link={link} /> : <TileItem {...props} link={link} />
}

interface ITileItemProps extends IChildrenCampProps {
  link: string
}
const TileItem = (props: ITileItemProps) => {
  const {
    medicalOrganization: { name, image, description, addresses, city_name },
    link,
  } = props
  const descriptionText = htmlToStr(description)
  const { t } = useTranslation('buttons')
  return (
    <Item>
      <Link href={link}>{image && <ImageS src={image} alt={name} width={282} height={160} objectFit="cover" />}</Link>
      <Content>
        <ContentTop>
          <Link href={link}>
            <Title>{name}</Title>
          </Link>
        </ContentTop>
        <LocationWrapper>
          <InlineSVG src={LocationIcon.src} />
          <p>
            г. {city_name}, ул. {addresses?.[0].address}
          </p>
        </LocationWrapper>
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
  width: 200px;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.005em;
  margin-top: 15px;
  margin-bottom: 13px;
  /* white-space: nowrap; */
  overflow: hidden;
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

interface IListItemProps extends IChildrenCampProps {
  link: string
}
const ListItem = (props: IListItemProps) => {
  const {
    medicalOrganization: { name, image, description },
    link,
  } = props
  const descriptionText = htmlToStr(description)

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
            <LocationWrapperL>
              <InlineSVG src={LocationIcon.src} />
            </LocationWrapperL>
          </ContentTopL>
          <Description dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 325 }) }} />
        </div>
        <LinkSL href={link}>
          Подробнее
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
  justify-content: flex-start;
  flex-direction: column;
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
const LocationWrapperL = styled(LocationWrapper)``
// const DescriptionL = styled.p`
//   font-family: Roboto, sans-serif;
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 150%;
//   color: ${colors.gray_200};
//   margin-bottom: 20px;
// `
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

export default MedicalOrganition
