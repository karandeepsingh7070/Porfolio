import { GithubLogo, LinkedinLogo, MediumLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

export interface SocialLink {
  label: string
  href: string
  icon?: Icon
  imgSrc?: string
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/karandeepsingh7070', icon: GithubLogo },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karandeepsingh-engineer/', icon: LinkedinLogo },
  { label: 'Medium', href: 'https://medium.com/@karandeepsinghworkspace', icon: MediumLogo },
  { label: 'Dev.to', href: 'https://dev.to/karandeepsingh7070', imgSrc: 'https://cdn.simpleicons.org/devdotto' },
  { label: 'Instagram', href: 'https://www.instagram.com/karandeepsingh7070/', icon: InstagramLogo },
]

export const email = 'karandeepsinghworkspace@gmail.com'
export const resumeHref = '/Karandeep%20Singh%20FE%20Resume.pdf'
