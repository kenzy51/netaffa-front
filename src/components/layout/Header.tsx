import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import Link from 'next/link'
import effafaIcon from 'public/images/svg/effafaIcon.svg'
import effafaSmallIcon from 'public/images/svg/effafaMobile.svg'
import locationIcon from 'public/images/svg/IconFrame.svg'
import arrowIcon from 'public/images/svg/arrows/arrowIcon.svg'
import russiaIcon from 'public/images/svg/russia.svg'
import engIcon from 'public/images/svg/flags/England.svg'
import uzIcon from 'public/images/svg/flags/Uzbek.svg'
import Menu from '@app/components/ui/Menu'
import { AnimatePresence, motion } from 'framer-motion'
import { useLockBodyScroll } from 'react-use'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { useRouter } from 'next/router'
import AccordionHeaderComponent from '@app/components/ui/AccordionHeader'
import dropdownIcon from 'public/images/svg/dropdownIcon.svg'
import { languages, MenuItemType, variants } from '@app/components/layout/consts'
import { dynamicLocalization } from '@app/lib/helpers/dynamicLocalization'
import { useLocations } from '@app/lib/store/locations'
import { defaultLanguage } from '@app/@types/languages'
import Cookies from 'js-cookie'
import useIsClient from "@app/hooks/useIsClient";

const flags = {
  ru: russiaIcon,
  en: engIcon,
  uz: uzIcon,
}

const Header = () => {
  const [cities] = useLocations((state) => [state.cities])
  const [selectedCity, setSelectedCity] = useState<number | undefined>(Number(Cookies.get('cityId')) || cities?.[0]?.id)
  const [selectedLanguage, setSelectedLanguage] = useState<string>(Cookies.get('i18nextLng') || defaultLanguage)
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownLanguage, setShowDropdownLanguage] = useState(false)
  const isClient = useIsClient()

  const dropdownRef = useRef<any>(null)
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
        setShowDropdown(false)
        setShowDropdownLanguage(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const lg = useMediaQuery('lg')
  const isMobile = useMediaQuery('sm')
  const router = useRouter()
  const { locale, pathname } = useRouter()

  // useEffect(() => {
  //   const currentRoute = router.pathname.split('/')[1]
  //   setActivePage(currentRoute)
  // }, [router.pathname])

  useEffect(() => {
    const closeMenu = () => {
      setMenuVisible(false)
    }
    router.events.on('routeChangeStart', closeMenu)
    return () => {
      router.events.off('routeChangeStart', closeMenu)
    }
  }, [router])

  useLockBodyScroll(isMenuVisible)

  const isLinkActive = (link: string) => {
    // const linkRoute = link.split('/')[1]
    // return activePage === linkRoute
    return pathname.startsWith(link)
  }

  const toggleMenu = () => setMenuVisible((prev) => !prev)

  const handleSelectClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleCitySelect = (cityId: number) => {
    setSelectedCity(cityId)
    Cookies.set('cityId', cityId.toString())
    setShowDropdown(false)
  }

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language)
    setShowDropdownLanguage(false)
    Cookies.set('i18nextLng', language)
    router.replace({ pathname, query: router.query }, router.asPath, { locale: language })
  }

  const navbarItems: MenuItemType[] = [
    {
      id: 1,
      name: dynamicLocalization('КАРЬЕРА', 'CAREER'),
      link: '/career',
    },
    {
      id: 9,
      name: dynamicLocalization('ЛАГЕРЯ', 'CAMPS'),
      link: '/camps',
    },

    {
      id: 2,
      name: dynamicLocalization('УЧЕБА', 'EDUCATION'),
      items: [
        {
          id: 1,
          title: dynamicLocalization('Язык жестов', 'Sign language'),
          link: '/education/sign-language',
        },
        {
          id: 2,
          title: dynamicLocalization('Кружки', 'Children clubs'),
          link: '/education/children-clubs',
        },
      ],
    },
    {
      id: 3,
      name: dynamicLocalization('СКАЧАТЬ', 'DOWNLOAD'),
      link: '/download',
    },
    {
      id: 4,
      name: dynamicLocalization('СПОНСОРУ', 'TO SPONSOR'),
      link: '/sponsor',
    },
    {
      id: 5,
      name: dynamicLocalization('МЕД ОБСЛУЖИВАНИЕ', 'MEDICAL SERVICE'),
      link: '/medicine',
    },
    {
      id: 8,
      name: dynamicLocalization('КОНТАКТЫ', 'CONTACTS'),
      link: '/contacts',
    },
  ]

  if (!isClient) return null

  return (
    <Wrapper ref={dropdownRef}>
      <Container>
        <HeaderContent>
          {lg && (
            <BurgerMenu onClick={toggleMenu} isMenuVisible={isMenuVisible}>
              <span />
            </BurgerMenu>
          )}
          <IconAndCity>
            <EffafaIconLink href="/">
              <Image src={isMobile ? effafaSmallIcon : effafaIcon} alt="Effafa icon" />
            </EffafaIconLink>
            <CityLink>
              <CityBlock>
                <Image src={locationIcon} alt="Location icon" />
                <SelectContainer>
                  <SelectButton onClick={handleSelectClick}>
                    {cities.find((item) => item.id === selectedCity)?.name ||
                      dynamicLocalization('Выберите город', 'Select city', 'Shaharni tanlang')}{' '}
                    <Image src={arrowIcon} alt={'arrow'} />
                  </SelectButton>
                  {showDropdown && (
                    <>
                      <DropdownIcon>
                        <Image src={dropdownIcon} alt="" />
                      </DropdownIcon>
                      <DropdownList>
                        {cities.map((city) => (
                          <DropdownItem key={city.id} onClick={() => city.id && handleCitySelect(city.id)}>
                            {dynamicLocalization(city.name)}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </>
                  )}
                </SelectContainer>
              </CityBlock>
            </CityLink>
          </IconAndCity>
          <HeaderMenu>
            {navbarItems.map((item: MenuItemType) =>
              item.items ? (
                <IsActive key={item.id} active={!!item.items.find((i) => isLinkActive(i.link))}>
                  <Menu menuItems={item.items}>
                    {item.link ? (
                      <Link href={item.link}>
                        <LinkItem>{item.name}</LinkItem>
                      </Link>
                    ) : (
                      <LinkItem style={{ padding: '10px 14px' }}>{item.name}</LinkItem>
                    )}
                  </Menu>
                </IsActive>
              ) : (
                <Link href={item.link || '/'} key={item.id}>
                  <LinkItem active={isLinkActive(item.link || '')}>{item.name}</LinkItem>
                </Link>
              )
            )}
          </HeaderMenu>
          <SelectorLanguage>
            {!isMobile && <Image alt="Icon of flag" src={flags[locale as keyof typeof flags] || russiaIcon} />}
            <SelectContainer>
              <SelectButtonLanguage onClick={() => setShowDropdownLanguage((prev) => !prev)}>
                {locale
                  ? locale.charAt(0).toUpperCase() + locale.slice(1)
                  : selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                <Image src={arrowIcon} alt={'arrow'} />
              </SelectButtonLanguage>
              {showDropdownLanguage && (
                <>
                  <DropdownIconLanguage>
                    <Image src={dropdownIcon} alt="" />
                  </DropdownIconLanguage>
                  <DropdownList>
                    {languages.map((language) => (
                      <LanguageItem key={language.id} onClick={() => handleLanguageSelect(language.name)}>
                        <Image src={language.icon} alt={'icon'} />
                        {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
                      </LanguageItem>
                    ))}
                  </DropdownList>
                </>
              )}
            </SelectContainer>
            <AnimatePresence>
              {lg && (
                <MobileMenu animate={isMenuVisible ? 'open' : 'closed'} variants={variants} initial={{ x: '-100%' }}>
                  <MobileCityBlock>
                    <Image src={locationIcon} alt="Location icon" />
                    <SelectContainer>
                      <SelectButton onClick={handleSelectClick}>
                        {cities.find((item) => item.id === selectedCity)?.name ||
                          dynamicLocalization('Выберите город', 'Select city', 'Shaharni tanlang')}{' '}
                        <Image src={arrowIcon} alt={'arrow'} />
                      </SelectButton>
                      {showDropdown && (
                        <div>
                          <DropdownIcon>
                            <Image src={dropdownIcon} alt="" />
                          </DropdownIcon>
                          <DropdownList>
                            {cities.map((city) => (
                              <DropdownItem key={city.id} onClick={() => city.id && handleCitySelect(city.id)}>
                                {city.name}
                              </DropdownItem>
                            ))}
                          </DropdownList>
                        </div>
                      )}
                    </SelectContainer>
                  </MobileCityBlock>
                  <MobileMenuList>
                    <InnerMobile>
                      {navbarItems.map((item: MenuItemType) => (
                        <React.Fragment key={item.id}>
                          {item.items ? (
                            <AccordionHeaderComponent
                              label={item.name}
                              styles={{
                                labelStyles: {
                                  fontWeight: 600,
                                  color: theme.colors.dark,
                                },
                              }}
                              fontSize="14px"
                              marginBottom="20px"
                            >
                              <MobileSubMenu>
                                {item.items.map((subItem: MenuItemType | any) => (
                                  <Link href={subItem.link} key={subItem.id}>
                                    <MobileMenuItem>{subItem.title}</MobileMenuItem>
                                  </Link>
                                ))}
                              </MobileSubMenu>
                            </AccordionHeaderComponent>
                          ) : (
                            <Link href={item.link || '/'} key={item.id}>
                              <MobileMenuItem>{item.name}</MobileMenuItem>
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </InnerMobile>
                  </MobileMenuList>
                </MobileMenu>
              )}
            </AnimatePresence>
          </SelectorLanguage>
        </HeaderContent>
      </Container>
    </Wrapper>
  )
}
const MobileSubMenu = styled(motion.div)`
  margin-top: 8px;
  padding: 8px;
`
const Wrapper = styled.header`
  top: 0;
  left: 0;
  position: relative;
  z-index: 3000;
  padding-bottom: 10px;

  ${theme.mqMax('lg')} {
    padding-top: 10px;
  }
`
const Container = styled.div`
  max-width: ${theme.containers.main};
  margin: 0 auto;
  width: 100%;
  padding-top: 24px;
  z-index: 100;
  ${theme.mqMax('xl')} {
    padding: 0 25px;
  }
`
const EffafaIconLink = styled(Link)`
  display: flex;
  justify-content: center;

  ${theme.mqMax('lg')} {
    width: 100%;
    transform: scale(0.95);
    margin-left: 51.5px;
  }
  ${theme.mqMax('sm')} {
    margin-left: 50px;
  }
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`
const IconAndCity = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  ${theme.mqMax('md')} {
    flex-basis: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }
`
const InnerMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const CityLink = styled.div`
  flex-grow: 1;
`
const CityBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  margin-left: 29px;
  ${theme.mqMax('md')} {
    justify-content: center;
  }
  ${theme.mqMax('lg')} {
    display: none;
  }
`
const MobileCityBlock = styled(CityBlock)`
  display: flex;
  margin: 0 auto;
`
const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 20px;
  /* 1600 */
  ${theme.mqMax('xxl2')} {
    flex-wrap: wrap;
    width: 1300px;
  }
  /* 1200 */
  ${theme.mqMax('xl')} {
    gap: 10px;
  }
  /* 992 */
  ${theme.mqMax('lg')} {
    display: none;
  }
`
const LinkItem = styled.h4<{ active?: boolean }>`
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  &:after {
    content: '';
    display: ${(props: any) => (props.active ? 'block' : 'none')};
    width: 5px;
    height: 5px;
    background-color: ${theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    margin-top: 26px;
  }
  ${theme.mqMax('lg')} {
    margin-bottom: 20px;
    margin-left: 2%;
  }
`

const IsActive = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  &:after {
    content: '';
    display: ${(props: any) => (props.active ? 'block' : 'none')};
    width: 5px;
    height: 5px;
    background-color: ${theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    bottom: 28px;
    ${theme.mqMax('xxl2')} {
      bottom: 46px;
    }
    ${theme.mqMax('xl')} {
      bottom: 41px;
    }
  }
`

const SelectorLanguage = styled.div`
  width: 77px;
  display: flex;
  align-items: center;
  padding: 12px 0;
  margin-left: 40px;
  ${theme.mqMax('xl')} {
    margin-left: 20px;
  }
  ${theme.mqMax('md')} {
  }
`
const BurgerMenu = styled.div<{ isMenuVisible: boolean }>`
  position: relative;
  cursor: pointer;
  height: 16px;
  min-width: 23px;
  display: flex;
  align-items: center;
  span {
    display: ${(p) => (p.isMenuVisible ? 'none' : 'block')};
    height: 2px;
    width: 100%;
    background-color: ${theme.colors.primary};
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 23px;
    height: 2px;
    background-color: ${theme.colors.primary};
    transition: transform 0.2s ease;
  }
  &:before {
    transform: ${(p) => (p.isMenuVisible ? 'rotate(45deg)' : 'rotate(0)')};
    top: 0;
  }
  &:after {
    transform: ${(p) => (p.isMenuVisible ? 'rotate(-45deg)' : 'rotate(0)')};
    bottom: ${(p) => (!p.isMenuVisible ? 0 : 'initial')};
    top: ${(p) => (p.isMenuVisible ? 0 : 'initial')};
  }
`

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`
const MobileMenuList = styled.ul`
  margin: 0 auto;
`
const MobileMenuItem = styled(LinkItem)`
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${theme.colors.dark};
`
const DropdownIcon = styled.div`
  position: absolute;
  top: 28px;
  left: 40px;
`
const DropdownIconLanguage = styled.div`
  position: absolute;
  top: 28px;
  left: 10px;
`
const DropdownList = styled.ul`
  top: 100%;
  position: absolute;
  left: -30px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border-top: none;
  z-index: 10;
  border-radius: 5px;
  padding: 2px;
`

const DropdownItem = styled.li`
  padding: 6px 11px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: var(--grey, #e6e6e6);
  }
`
const SelectContainer = styled.div`
  position: relative;
`
const SelectButton = styled.button`
  width: 160px;
  height: 37px;
  display: flex;
  padding: 6px 11px;
  font-size: 16px;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
  cursor: pointer;
`
const SelectButtonLanguage = styled.button`
  width: 104px;
  height: 37px;
  display: flex;
  padding: 6px 11px;
  font-size: 16px;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
  cursor: pointer;
`
const LanguageItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 6px 11px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: var(--grey, #e6e6e6);
  }
`

export default Header
