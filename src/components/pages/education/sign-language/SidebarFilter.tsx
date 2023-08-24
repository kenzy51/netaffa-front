import React, { useState } from 'react'
import Accordion from '@app/components/ui/Accordion'
import { Category, EducationCategoriesList200Response } from '@app/lib/api/gen'
import styled, { keyframes } from 'styled-components'
import Checkbox from '@app/components/ui/inputs/Checkbox'
import { useRouter } from 'next/router'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'
import InlineSVG from 'react-inlinesvg'
import CrossIcon from 'public/images/svg/crosses/white-cross.svg'
import { useLockBodyScroll } from 'react-use'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

interface ISidebarFilterProps {
  categories?: EducationCategoriesList200Response
  onToggleMobileMenu: () => void
  mobileOpen: boolean
  onClickCategory: (categoryIds: any[]) => void
}

const SidebarFilter = (props: ISidebarFilterProps) => {
  const { categories, onToggleMobileMenu, mobileOpen } = props
  const { query, replace } = useRouter()
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [checkedBox, setCheckedbox] = useState(false)
  const lg = useMediaQuery('lg')
  const category = query.category || ''
  const categoriesQuery = category ? (category as string).split(',') : []

  useLockBodyScroll(lg && mobileOpen)

  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
    const { checked } = e.target

    let newCategories: string[]
    if (checked) {
      newCategories = [...categoriesQuery]
      if (id) {
        newCategories.push(id)
        const category = categories?.results?.find((item) => item.id === +id)
        const childrenIds =
          category?.children?.map((child) => (child as never as Category).id).filter((item) => item) || []
        newCategories.push(...(childrenIds as never as string[]))
      }
    } else {
      newCategories = categoriesQuery.filter((item) => item !== id)
      if (id) {
        const category = categories?.results?.find((item) => item.id === +id)
        const childrenIds = category?.children?.map((child) => (child as never as Category).id) || []
        newCategories = newCategories.filter((item) => !childrenIds.includes(+item))
      }
      props.onClickCategory(newCategories)
    }

    const newQuery = newCategories.join(',')

    replace({
      query: {
        ...query,
        category: newQuery,
        page: 1,
      },
    })
  }

  const resetSelectedCategories = () => {
    setSelectedCategories([])
    replace({ query: { ...query, category: '' } })
  }

  const showPicturehover = () => {
    setCheckedbox((prev) => !prev)
  }

  selectedCategories
  const { t } = useTranslation('buttons')
  return (
    <Wrapper mobileOpen={mobileOpen}>
      {lg && (
        <MobileHeader>
          <MobileHeaderTitle>{t('filter')}</MobileHeaderTitle>
          <InlineSVG onClick={onToggleMobileMenu} src={CrossIcon.src} />
        </MobileHeader>
      )}
      <List>
        {categories?.results?.map((category) => (
          <Item
            key={category.id}
            onMouseEnter={() => category.id && setHoveredCategoryId(category.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <Accordion
              label={
                <div
                  onMouseEnter={() => category.id && setHoveredCategoryId(category.id)}
                  onMouseLeave={() => setHoveredCategoryId(null)}
                >
                  <Checkbox
                    checked={!!category.id && categoriesQuery.includes(String(category.id))}
                    label={category.name}
                    onChange={(e) => changeCategoryHandler(e, String(category.id))}
                    onClick={(e) => e.stopPropagation()}
                    styles={{
                      text: {
                        fontWeight: 700,
                        lineHeight: 0,
                      },
                    }}
                  />
                </div>
              }
              styles={{
                contentStyles: {
                  paddingTop: 10,
                },
                accordionStyles: {
                  overflow: 'inherit',
                },
              }}
            >
              <ItemChildList>
                {category.children?.map((item) => {
                  const child = item as never as Category
                  return (
                    <ItemChild
                      key={child.id}
                      onMouseEnter={() => child.id && setHoveredCategoryId(child.id)}
                      onMouseLeave={() => setHoveredCategoryId(null)}
                    >
                      <Checkbox
                        checked={!!child.id && categoriesQuery.includes(String(child.id))}
                        onChange={(e) => changeCategoryHandler(e, String(child.id))}
                        label={child.name}
                        styles={{
                          text: {
                            fontWeight: 400,
                            lineHeight: 0,
                          },
                        }}
                      />
                      {checkedBox
                        ? hoveredCategoryId === child.id &&
                          child?.images &&
                          child.images.length > 0 && (
                            <ImageHover>
                              {child.images?.map((image) => (
                                <Image
                                  key={image.id}
                                  src={image.image ? image?.image : ''}
                                  alt={child.name}
                                  width={100}
                                  height={67}
                                />
                              ))}
                            </ImageHover>
                          )
                        : null}
                    </ItemChild>
                  )
                })}
              </ItemChildList>
            </Accordion>
            {checkedBox
              ? hoveredCategoryId === category.id &&
                category?.images &&
                category.images.length > 0 && (
                  <ImageHover>
                    {category.images.map((image) => (
                      <Image
                        key={image.id}
                        src={image ? image?.image || '' : ''}
                        alt={category.name}
                        width={100}
                        height={67}
                      />
                    ))}
                  </ImageHover>
                )
              : null}
          </Item>
        ))}

        <ClearFilterButton onClick={resetSelectedCategories}>{t('cleanFilter')}</ClearFilterButton>
        <ShowImagesWrapper>
          <Checkbox
            label={t('showHover')}
            onChange={showPicturehover}
            checked={checkedBox}
            styles={{
              text: {
                fontWeight: 400,
                color: theme.colors.gray_200,
              },
              label: {
                alignItems: 'initial',
                padding: 4,
              },
            }}
          />
        </ShowImagesWrapper>
      </List>
    </Wrapper>
  )
}

const { mqMax, colors } = theme
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const ImageHover = styled.div`
  position: absolute;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(2, 1fr);
  width: 200px !important;
  height: 140px !important;
  margin-left: 100px;
  z-index: 100;
  column-gap: -3px;
  transition-duration: 0.3s;
  animation: ${fadeIn} 0.4s ease-in-out;
  img {
    border-radius: 1px;
    transition-duration: 0.3s;
    object-fit: fill;
  }
  img:nth-child(n + 3) {
    margin-bottom: 3px;
  }
`
const ClearFilterButton = styled.button`
  display: flex;
  padding: 15px 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 50px;
  border: 1px solid ${colors.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`
const Wrapper = styled.div<{ mobileOpen: boolean }>`
  transition: transform 0.3s ease-in-out;

  ${mqMax('lg')} {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f8f8f8;
    z-index: 2000;
    height: 100vh;
    transform: translateX(${(props) => (props.mobileOpen ? '0' : '-100%')});
  }
`
const MobileHeader = styled.div`
  background-color: ${colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 13px;
  margin-bottom: 15px;

  svg {
    cursor: pointer;
  }
`
const MobileHeaderTitle = styled.h3`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${colors.white};
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  ${mqMax('lg')} {
    padding: 0 13px;
  }
`
const Item = styled.li``
const ItemChildList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
const ItemChild = styled.li`
  padding-left: 27px;
`
const ShowImagesWrapper = styled.div`
  margin-top: 20px;
`

export default SidebarFilter
