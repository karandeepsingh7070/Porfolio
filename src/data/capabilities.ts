export interface Capability {
  label: string
  group: string
  icon?: string
}

export const capabilities: Capability[] = [
  { label: 'React', group: 'Frontend', icon: 'react' },
  { label: 'Next.js', group: 'Frontend', icon: 'nextdotjs' },
  { label: 'TypeScript', group: 'Frontend', icon: 'typescript' },
  { label: 'JavaScript', group: 'Frontend', icon: 'javascript' },
  { label: 'Redux', group: 'Frontend', icon: 'redux' },
  { label: 'GraphQL', group: 'Frontend', icon: 'graphql' },
  { label: 'SSR', group: 'Realtime & data' },
  { label: 'WebSocket', group: 'Realtime & data' },
  { label: 'SSE', group: 'Realtime & data' },
  { label: 'Pub-Sub architecture', group: 'Realtime & data' },
  { label: 'Node.js', group: 'Platform', icon: 'nodedotjs' },
  { label: 'Go', group: 'Platform', icon: 'go' },
  { label: 'Webpack', group: 'Platform', icon: 'webpack' },
  { label: 'Rollup', group: 'Platform' },
  { label: 'AWS', group: 'Platform' },
  { label: 'PWA', group: 'Platform' },
  { label: 'Video.js', group: 'Media & ad tech' },
  { label: 'DRM (Widevine / PlayReady)', group: 'Media & ad tech' },
  { label: 'Prebid / header bidding', group: 'Media & ad tech' },
]
