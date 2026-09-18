import cnbcLogo from '@/assets/logos/cnbc.webp'
import dbseLogo from '@/assets/logos/dbse.png'
import suplycmsLogo from '@/assets/logos/suplycms.png'
import type { StaticImageData } from 'next/image'

export interface ClientLogo {
  name: string
  logo?: StaticImageData
  logoSrc?: string
}

export interface ClientGroup {
  title: string
  clients: ClientLogo[]
}

export const clientGroups: ClientGroup[] = [
  {
    title: 'Through Viewlift, work reached',
    clients: [
      { name: 'CNBC', logo: cnbcLogo },
      { name: 'USA Network', logoSrc: '/logos/usa-network.svg' },
    ],
  },
  {
    title: 'Worked with',
    clients: [
      { name: 'Delhi Board of School Education', logo: dbseLogo },
      { name: 'SuplyCMS', logo: suplycmsLogo },
    ],
  },
]
