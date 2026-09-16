export interface ExperienceEntry {
  title: string
  organisation: string
  context: string
  period: string
  points: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Senior Frontend Engineer',
    organisation: 'Viewlift (Nexgen IoT Solutions)',
    context: 'End-to-end OTT platform provider',
    period: 'Sept 2021 - Present',
    points: [
      'Promoted to Senior Frontend Engineer within 2.5 years.',
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
  },
]

export interface Highlight {
  text: string
  href?: string
  hrefLabel?: string
}

export const highlights: Highlight[] = [
  {
    text: 'Designed a publish-subscribe architecture package to enable efficient data sharing between components, removing the need for an external state management library.',
    href: 'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9',
    hrefLabel: 'Read the write-up',
  },
  {
    text: 'Collaborated across architecture and platform teams on a new codebase using React, SSR, GraphQL, and SSE, onboarding 5 new clients onto it.',
  },
]
