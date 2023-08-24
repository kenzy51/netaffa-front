import { Specialty } from '@app/lib/api/gen'
import { htmlToStr } from '@app/lib/helpers/htmlToStr'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import React from 'react'
import { styled } from 'styled-components'
import InlineSVG from 'react-inlinesvg'
import ArrowIcon from 'public/images/svg/arrows/blue-arrow.svg'
import LocationIcon from 'public/images/svg/location.svg'
import Image from 'next/image'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@app/hooks/useMediaQuery'

interface ICareerItemProps {
  careerVacancy: Specialty
}
const CareerItem = (props: ICareerItemProps) => {
  const isMobile = useMediaQuery('md')
  const { t } = useTranslation('buttons')
  const {
    careerVacancy: { name, description, image, slug, city_name },
  } = props
  const descriptionText = htmlToStr(description)
  const link = {
    pathname: '/career/[slug]',
    query: { slug },
  }

  return (
    <ItemL>
      {!!image && (
        <Link href={link}>
          <ImageWrapper>
            <ImageS src={image} alt={name} width={282} height={160} objectFit="cover" />
          </ImageWrapper>
        </Link>
      )}
      <ContentL>
        <div>
          {isMobile ? (
            <LocationWrapperL>
              {!!city_name && (
                <>
                  <InlineSVG src={LocationIcon.src} />
                  <p>{city_name}</p>
                </>
              )}
            </LocationWrapperL>
          ) : null}

          <ContentTopL>
            <Link href={link}>
              <TitleL>{name}</TitleL>
            </Link>
          </ContentTopL>

          {!isMobile && isMobile != undefined ? (
            <LocationWrapperL>
              {!!city_name && (
                <>
                  <InlineSVG src={LocationIcon.src} />
                  <p>{city_name}</p>
                </>
              )}
            </LocationWrapperL>
          ) : null}
          <DescriptionL dangerouslySetInnerHTML={{ __html: _.truncate(descriptionText, { length: 328 }) }} />
        </div>
        <LinkSL href={link}>
          {t('more')}
          <InlineSVG src={ArrowIcon.src} />
        </LinkSL>
      </ContentL>
    </ItemL>
  )
}
const { colors, mqMax } = theme

const ImageS = styled(Image)`
  border-radius: 10px;
  max-width: 282px;
  height: 100%;
  object-fit: cover;
  width: 100%;
`

const ItemL = styled.li`
  display: flex;
  width: 100%;
  min-height: 160px;
  column-gap: 25px;
  ${mqMax('md')} {
    flex-direction: column;
  }
`
const ImageWrapper = styled.div`
  border-radius: 10px;
  max-height: 160px;
  max-width: 282px;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    max-height: 160px;
    max-width: 282px;
    min-height: 160px;
    min-width: 282px;
  }
  ${mqMax('md')} {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
`
const ContentL = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const ContentTopL = styled(ContentTop)`
  justify-content: initial;
  //column-gap: 15px;
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

  ${mqMax('sm')} {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: -5px;
  }
`
const DescriptionL = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: ${colors.gray_200};
  margin-bottom: 20px;
  word-break: break-all;
  ${mqMax('sm')} {
    margin-bottom: 16px;
  }
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

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-top: 13px;
  margin-bottom: 5px;
  p {
    font-size: 12px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: ${colors.gray_200};
  }
  ${mqMax('md')} {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`
const LocationWrapperL = styled(LocationWrapper)``

export default CareerItem
