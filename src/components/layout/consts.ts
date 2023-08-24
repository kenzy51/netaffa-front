import { ReactNode } from 'react'
import russiaIcon from '../../../public/images/svg/russia.svg'
import engIcon from '../../../public/images/svg/flags/England.svg'

export interface MenuItemType {
  title?: ReactNode
  id: number
  name: string
  link?: string
  items?: {
    id: number
    title: string
    link: string
  }[]
}

export const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

export const languages: any[] = [
  { id: 1, name: 'ru', icon: russiaIcon },
  { id: 2, name: 'en', icon: engIcon },
]
