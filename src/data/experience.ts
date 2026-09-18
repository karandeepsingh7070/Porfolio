import dbseLogo from '@/assets/logos/dbse.png'
import type { StaticImageData } from 'next/image'

export interface ExperienceEntry {
  title: string
  organisation: string
  context: string
  period: string
  points: string[]
  logo?: StaticImageData
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Senior Software Engineer',
    organisation: 'Viewlift (Nexgen IoT Solutions)',
    context: 'End-to-end OTT platform provider',
    period: 'Sept 2021 - Present',
    points: [
      'Promoted to Senior Software Engineer within 2.5 years.',
      'Led a team of 5 engineers delivering the frontend for Monumental Sports Network.',
      'Recognised as Employee of the Month multiple times.',
    ],
  },
  {
    title: 'Frontend Developer',
    organisation: 'Nexgen IoT Solutions',
    context: 'End-to-end OTT platform provider',
    period: 'March 2021 - Sept 2021',
    points: [
      'Built an EdTech platform frontend from the ground up.',
      'Interfaced persisted GraphQL queries to cut data over-fetching and reduce server load.',
    ],
  },
  {
    title: 'Frontend Developer',
    organisation: 'Delhi Board of School Education (Delhi Government)',
    context: 'Public sector education portal',
    period: 'Dec 2020 - March 2021',
    points: [
      "Built DBSE's primary website for notices, academic papers, and student and teacher resources.",
    ],
    logo: dbseLogo,
  },
]

export interface WritingEntry {
  title: string
  description: string
  source: string
  href: string
}

export const writing: WritingEntry[] = [
  {
    title: 'Redux Toolkit vs Zustand vs Overwatch: who wins the performance benchmark?',
    description:
      'Built Overwatch, a small pub-sub state library, then benchmarked it head-to-head against Redux Toolkit and Zustand to see how it held up.',
    source: 'Medium',
    href: 'https://medium.com/@karandeepsinghworkspace/redux-toolkit-vs-zustand-vs-overwatch-who-wins-the-performance-benchmark-e090a504b1e7',
  },
  {
    title: 'I lost my git stash, so I built a tool to share it',
    description: 'The story behind Stash Share, a VS Code extension for beaming a work-in-progress stash straight to a teammate.',
    source: 'Medium',
    href: 'https://medium.com/@karandeepsinghworkspace/i-lost-my-git-stash-so-i-built-a-tool-to-share-it-188f6cb17164',
  },
  {
    title: 'Working with HTML elements in TypeScript: a complete guide',
    description: 'A practical walkthrough of typing DOM elements correctly in TypeScript.',
    source: 'Dev.to',
    href: 'https://dev.to/wisdombits/working-with-html-elements-in-typescript-a-complete-guide13-1b3k',
  },
]
