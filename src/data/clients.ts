import cnbcLogo from '@/assets/logos/cnbc.webp'
import dbseLogo from '@/assets/logos/dbse.png'
import suplycmsLogo from '@/assets/logos/suplycms.png'
import dirtvisionLogo from '@/assets/logos/dirtvision.webp'
import type { StaticImageData } from 'next/image'

export interface ClientLogo {
  name: string
  logo?: StaticImageData
  logoSrc?: string
}

export interface ClientGroup {
  title: string
  featured?: boolean
  clients: ClientLogo[]
}

export const clientGroups: ClientGroup[] = [
  {
    title: 'Professional collaborations',
    featured: true,
    clients: [
      { name: 'DBSE · Delhi Government', logo: dbseLogo },
      { name: 'SuplyCMS', logo: suplycmsLogo },
    ],
  },
  {
    title: 'Through Viewlift, work reached',
    clients: [
      { name: 'CNBC', logo: cnbcLogo },
      { name: 'USA Network', logoSrc: '/logos/usa-network.svg' },
      { name: 'DIRTVision', logo: dirtvisionLogo },
    ],
  },
]
