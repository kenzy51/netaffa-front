import { defaultLanguage, TLanguage } from '@app/@types/languages'
import Cookies from 'js-cookie'

export const dynamicLocalization = (ru: string, en?: string | null, uz?: string | null): string => {
  const lang: TLanguage = (Cookies.get('i18nextLng') as TLanguage) || defaultLanguage
  switch (lang) {
    case 'ru':
      return ru
    case 'en':
      return en || ru
    case 'uz':
      return uz || ru
    default:
      return ru
  }
}
