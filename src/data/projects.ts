import overwatchBanner from '@/assets/overwatch.png'
import overwatchSite from '@/assets/overwatch-site.webp'
import overwatchDocs from '@/assets/overwatch-docs.png'
import llmRecallAvatar from '@/assets/llm-recall-avatar.webp'
import llmRecallPlayground from '@/assets/llm-recall-playground.webp'
import npm from '@/assets/npm.png'
import type { StaticImageData } from 'next/image'

export interface CaseStudy {
  slug: string
  name: string
  heading?: string
  badge?: string
  organisation?: string
  role?: string
  thumbnail?: StaticImageData
  gallery?: { src: StaticImageData; alt: string }[]
  problem: string
  thinking: string
  solution: string
  result: string
  tech: string[]
  links: { label: string; href: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'overwatch-ts',
    name: 'Overwatch TS',
    heading: 'State Management Library',
    badge: 'Open Source',
    organisation: 'Open source',
    role: 'Author',
    thumbnail: overwatchBanner,
    gallery: [
      { src: overwatchBanner, alt: 'Overwatch TS mascot' },
      { src: overwatchSite, alt: 'Overwatch TS landing page' },
      { src: overwatchDocs, alt: 'Overwatch TS documentation site' },
    ],
    problem:
      "Most React apps reach for a heavy state library before they actually need one, and the lightweight pattern that solves it rarely comes with real TypeScript support or devtools.",
    thinking:
      "I'd already used this pattern at work to drop a dependency. Turning it into a proper open-source package meant going from a dev to devs, building it for strangers' code, not just mine.",
    solution:
      'So I built Overwatch TS: a small, type-safe state library with batching and devtools baked in, published to npm with its own docs site and blog.',
    result: "It's live on npm with a public GitHub repo and a dedicated docs site under WisdomBits.",
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
    slug: 'llm-recall-api',
    name: 'LLM Recall API',
    heading: 'Memory Layer for AI',
    badge: 'Open Source',
    organisation: 'Open source',
    role: 'Author',
    thumbnail: llmRecallAvatar,
    gallery: [
      { src: llmRecallAvatar, alt: 'LLM Recall API, built with Claude, ChatGPT, Gemini, and Antigravity' },
      { src: llmRecallPlayground, alt: 'The Memory Bank playground UI' },
    ],
    problem:
      "Every AI app I've used has the same problem - you either paste your whole context back in every prompt, or you pay a vendor to remember it for you.",
    thinking: 'So I built something in between. I wanted it to run entirely on my own machine, no API keys.',
    solution:
      'LLM Recall a self-hosted memory engine that extracts atomic facts from raw text and embeds them locally. It ships a REST API, an MCP server for Claude Desktop and Cursor, and a live playground for testing it.',
    result: 'Fully open source, runs offline once the models are cached, with hybrid vector and keyword search over everything it remembers.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'pgvector', 'Hono', 'transformers.js', 'MCP'],
    links: [{ label: 'GitHub', href: 'https://github.com/karandeepsingh7070/LLM-Recall-API' }],
  },
]

export interface IndexProject {
  name: string
  description: string
  thumbnail?: StaticImageData
  viewlift?: boolean
  tech: string[]
  links: { label: string; href: string }[]
}

export const indexProjects: IndexProject[] = [
  {
    name: 'Monumental Sports Network',
    description: 'A sports streaming platform with live video, subscriptions, and paid content, built with a team of five I led.',
    viewlift: true,
    tech: ['React', 'TypeScript', 'GraphQL', 'SSR', 'Stripe'],
    links: [{ label: 'Visit site', href: 'https://www.monumentalsportsnetwork.com/' }],
  },
  {
    name: 'My Outdoor TV',
    description: 'A streaming platform for outdoor sports fans, with live data and analytics wired in.',
    viewlift: true,
    tech: ['React', 'Video.js', 'WebSocket', 'SSE', 'Adobe Analytics'],
    links: [{ label: 'Visit site', href: 'https://app.myoutdoortv.com/' }],
  },
  {
    name: 'Overwatch Docs',
    description: 'The docs site for Overwatch TS, built on Nextra.',
    thumbnail: overwatchDocs,
    tech: ['Nextra', 'Next.js', 'TypeScript'],
    links: [
      { label: 'Visit site', href: 'https://docs.overwatchts.in/docs' },
      { label: 'GitHub', href: 'https://github.com/WisdomBits/overwatch-docs' },
    ],
  },
  {
    name: 'Pub-Sub Architecture',
    description: 'A tiny publish-subscribe helper for wiring up events and shared data in any app.',
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
    description: 'A drop-in Stripe payments package with a config-driven UI and webhook handling.',
    thumbnail: npm,
    tech: ['Stripe', 'TypeScript', 'React', 'Avalara'],
    links: [],
  },
  {
    name: 'DRM Encoder',
    description: 'A Go app that encodes video into DRM-protected formats and tests playback with Shaka Player.',
    tech: ['Go', 'Shaka Packager', 'Shaka Player'],
    links: [],
  },
  {
    name: 'CKEditor Custom Plugins',
    description: 'A custom build of the CKEditor 5 rich text editor with a few plugins I needed that didn’t exist yet.',
    tech: ['CKEditor 5', 'Webpack', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/karandeepsingh7070/CKEditor-custom-plugin-super-build' }],
  },
  {
    name: 'Stash Share',
    description: "A VS Code extension that beams a git stash straight to a teammate's editor over the network, no commit needed.",
    tech: ['VS Code API', 'WebSocket', 'JavaScript'],
    links: [
      { label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=WisdomBits.share-stash' },
      { label: 'GitHub', href: 'https://github.com/karandeepsingh7070/share-stash-VS-code-extention' },
    ],
  },
]
