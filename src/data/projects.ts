import overwatchBanner from '@/assets/overwatch.png'
import overwatchDocs from '@/assets/overwatch-docs.png'
import npm from '@/assets/npm.png'
import type { StaticImageData } from 'next/image'

export interface CaseStudy {
  slug: string
  name: string
  organisation?: string
  role?: string
  thumbnail?: StaticImageData
  problem: string
  thinking: string
  solution: string
  result: string
  tech: string[]
  links: { label: string; href: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'monumental-sports-network',
    name: 'Monumental Sports Network',
    organisation: 'Viewlift',
    role: 'Led a team of 5',
    problem:
      'A high-traffic sports OTT platform needed a frontend that could handle live and on-demand video, subscriptions, and paid content without buckling under peak traffic.',
    thinking:
      'Rather than bolting payments and playback on as afterthoughts, the architecture leaned on GraphQL to keep data-fetching predictable, and pub-sub patterns to keep state changes from turning into prop-drilling.',
    solution:
      'A React and TypeScript frontend with SSR, GraphQL, Stripe billing, and real-time updates over SSE, built with a team of five I led through the delivery.',
    result: 'Shipped as monumentalsportsnetwork.com and used to onboard new clients onto the platform.',
    tech: ['React', 'TypeScript', 'GraphQL', 'SSR', 'Stripe', 'Pub-Sub'],
    links: [{ label: 'Visit site', href: 'https://www.monumentalsportsnetwork.com/' }],
  },
  {
    slug: 'overwatch-ts',
    name: 'Overwatch TS',
    organisation: 'Open source',
    role: 'Author',
    thumbnail: overwatchBanner,
    problem:
      'Most React apps reach for a heavyweight state library long before they need one, and the pub-sub pattern that actually solves it rarely ships with proper TypeScript support, batching, or devtools.',
    thinking:
      "I'd already built this pattern once at work to remove a dependency. Turning it into a real open-source library meant it had to hold up to strangers' code, not just mine.",
    solution:
      'Overwatch TS, a minimal, type-safe pub-sub state library with immutability, batching, and devtools, published to npm with its own documentation site and blog.',
    result: 'Live on npm as overwatch-ts, with a public repo and dedicated docs site under WisdomBits.',
    tech: ['TypeScript', 'Pub-Sub architecture', 'Next.js'],
    links: [
      { label: 'Visit site', href: 'https://overwatchts.in/' },
      { label: 'Documentation', href: 'https://docs.overwatchts.in/docs' },
      { label: 'GitHub', href: 'https://github.com/WisdomBits/overwatch' },
      {
        label: 'Write-up',
        href: 'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9',
      },
    ],
  },
  {
    slug: 'stash-share',
    name: 'Stash Share',
    organisation: 'Open source',
    role: 'Author',
    problem:
      'Pairing with a teammate on a different machine meant a work-in-progress change had no good way to travel, too rough for a commit, too much friction for a manual patch file.',
    thinking:
      'Git already tracks stashes locally. The only missing piece was moving one from my machine to someone else’s without turning it into a branch or a commit.',
    solution:
      "A VS Code extension that sends and receives git stashes directly over the local network, so a work-in-progress change reaches a teammate's editor in one step.",
    result: 'Published to the VS Code Marketplace as Stash Share, with a public GitHub repo.',
    tech: ['VS Code API', 'WebSocket', 'JavaScript'],
    links: [
      { label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=WisdomBits.share-stash' },
      { label: 'GitHub', href: 'https://github.com/karandeepsingh7070/share-stash-VS-code-extention' },
    ],
  },
]

export interface IndexProject {
  name: string
  description: string
  thumbnail?: StaticImageData
  tech: string[]
  links: { label: string; href: string }[]
}

export const indexProjects: IndexProject[] = [
  {
    name: 'LivGolf+',
    description: 'OTT platform for LIV Golf, with video, subscriptions, and GraphQL-driven content.',
    tech: ['React', 'TypeScript', 'Video.js', 'Stripe', 'GraphQL'],
    links: [{ label: 'Visit site', href: 'https://livgolfplus.com/' }],
  },
  {
    name: 'My Outdoor TV',
    description: 'Outdoor sports streaming platform with live data and analytics integration.',
    tech: ['React', 'Video.js', 'WebSocket', 'SSE', 'Adobe Analytics'],
    links: [{ label: 'Visit site', href: 'https://app.myoutdoortv.com/' }],
  },
  {
    name: 'Overwatch Docs',
    description: 'The documentation site for Overwatch TS, built on Nextra.',
    thumbnail: overwatchDocs,
    tech: ['Nextra', 'Next.js', 'TypeScript'],
    links: [
      { label: 'Visit site', href: 'https://docs.overwatchts.in/docs' },
      { label: 'GitHub', href: 'https://github.com/WisdomBits/overwatch-docs' },
    ],
  },
  {
    name: 'Pub-Sub Architecture',
    description: 'A simplified publish-subscribe implementation for event and data handling in any app.',
    thumbnail: npm,
    tech: ['Publish-Subscribe', 'JavaScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/karandeepsingh7070/Pubsub-architecture' },
      {
        label: 'Write-up',
        href: 'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9',
      },
    ],
  },
  {
    name: 'Monetisation SDK',
    description: 'A plug-and-play Stripe payments package with a configuration-driven UI and webhook handling over WebSocket.',
    thumbnail: npm,
    tech: ['Stripe', 'TypeScript', 'React', 'Avalara'],
    links: [],
  },
  {
    name: 'DRM Encoder',
    description: 'A Go web app that encodes video into DRM-protected formats via Shaka Packager and tests playback through Shaka Player.',
    tech: ['Go', 'Shaka Packager', 'Shaka Player'],
    links: [],
  },
  {
    name: 'CKEditor Custom Plugins',
    description: 'A custom super-build of the CKEditor 5 rich text editor with bespoke plugins.',
    tech: ['CKEditor 5', 'Webpack', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/karandeepsingh7070/CKEditor-custom-plugin-super-build' }],
  },
]
