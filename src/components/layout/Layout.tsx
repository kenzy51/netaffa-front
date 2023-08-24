import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import { useLocations } from '@app/lib/store/locations'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { defaultLanguage, TLanguage } from '@app/@types/languages'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { locale } = useRouter()
  const [fetchCities, fetchCountries] = useLocations((state) => [state.fetchCities, state.fetchCountries])

  useEffect(() => {
    ;(async () => {
      await fetchCities((locale as unknown as TLanguage) || defaultLanguage)
      await fetchCountries((locale as unknown as TLanguage) || defaultLanguage)
    })()
  }, [fetchCities, fetchCountries, locale])

  //NProgress
  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])

  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    flex: 1;
  }
`

export default Layout
