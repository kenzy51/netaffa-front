import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { theme } from '@app/styles/theme'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

interface IMenuProps {
  menuItems: {
    id: number
    title: string
    link: string
  }[]
  isActive?: boolean
  children?: ReactNode
}

const Menu = ({ menuItems, children }: IMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Close the menu when navigating to a different route
    const handleCloseMenu = () => {
      setIsOpen(false)
    }

    router.events.on('routeChangeStart', handleCloseMenu)

    // Clean up the event listener when the component is unmounted
    return () => {
      router.events.off('routeChangeStart', handleCloseMenu)
    }
  }, [router.events])
  return (
    <Wrapper onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <ChildrenWrapper isOpen={isOpen}>{children}</ChildrenWrapper>
      <AnimatePresence>
        {isOpen && (
          <MenuContainer>
            {menuItems.map((item) => (
              <MenuItem key={item.id} href={item.link}>
                {item.title}
              </MenuItem>
            ))}
          </MenuContainer>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`
const ChildrenWrapper = styled.div<{ isOpen: boolean }>`
  background: ${(p) => (p.isOpen ? theme.colors.white : 'inherit')};
  transition: background 0.3s;
  border-radius: 5px;
  cursor: pointer;
`
const MenuContainer = styled(motion.nav)`
  position: absolute;
  left: 0;
  top: 80%;
  background-color: ${theme.colors.white};
  border-radius: 5px;
  z-index: 1;
`
const MenuItem = styled(Link)`
  display: block;
  padding: 5px 11px;
  margin: 5px 2px;
  white-space: nowrap;
  border-radius: 5px;
  &:hover {
    background-color: #e9e9e9;
  }
`
export default Menu
