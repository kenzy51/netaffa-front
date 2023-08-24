import React from 'react'

export const screenSizes = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
}

export type screenType = 'sm' | 'md' | 'lg' | 'xl' | 'custom'

export default function useMediaQuery(screen: screenType, customScreen?: string): boolean | undefined {
  const query = screen === 'custom' ? customScreen : `(max-width: ${screenSizes[screen]}px)`
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const media = window.matchMedia(query as string)
    setMatches(media.matches)

    const updateMatches = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', updateMatches)

    return () => media.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}
