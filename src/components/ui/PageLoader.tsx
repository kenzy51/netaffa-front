import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import 'nprogress/nprogress.css'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { useLockBodyScroll } from 'react-use'

export const ProgressLoader = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // default variant
  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(true))
    router.events.on('routeChangeComplete', () => setOpen(false))
  }, [router.events])

  useLockBodyScroll(open)

  return (
    <LoaderContainer isOpen={open}>
      <Spinner
        animate={loaderAnimation}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const Spinner = styled(motion.div)`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const loaderAnimation = {
  rotate: 360,
  borderRadius: ['50%', '50%', '50%', '50%', '50%'],
}
