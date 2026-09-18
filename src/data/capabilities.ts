export interface Capability {
  label: string
  group: string
  icon?: string
  iconSrc?: string
}

export const capabilities: Capability[] = [
  { label: 'React', group: 'Frontend', icon: 'react' },
  { label: 'Next.js', group: 'Frontend', icon: 'nextdotjs' },
  { label: 'TypeScript', group: 'Frontend', icon: 'typescript' },
  { label: 'JavaScript', group: 'Frontend', icon: 'javascript' },
  { label: 'Sass', group: 'Frontend', icon: 'sass' },

  { label: 'Redux', group: 'State management', icon: 'redux' },
  { label: 'Zustand', group: 'State management' },

  { label: 'Node.js', group: 'Backend', icon: 'nodedotjs' },
  { label: 'Express.js', group: 'Backend', icon: 'express' },
  { label: 'Go', group: 'Backend', icon: 'go' },

  { label: 'Google Analytics', group: 'Analytics', icon: 'googleanalytics' },
  { label: 'Datadog', group: 'Analytics', icon: 'datadog' },
  { label: 'Adobe Media Analytics', group: 'Analytics' },
  { label: 'Comscore', group: 'Analytics' },

  { label: 'GraphQL', group: 'API & data', icon: 'graphql' },
  { label: 'REST APIs', group: 'API & data' },
  { label: 'WebSocket', group: 'API & data' },
  { label: 'SSE', group: 'API & data' },
  { label: 'SSR', group: 'API & data' },

  { label: 'Webpack', group: 'Build & deploy', icon: 'webpack' },
  { label: 'Rollup', group: 'Build & deploy', icon: 'rollupdotjs' },
  { label: 'GitHub', group: 'Build & deploy', icon: 'github' },
  { label: 'AWS', group: 'Build & deploy', iconSrc: '/icons/aws-cloud.svg' },
  { label: 'CI/CD Pipelines', group: 'Build & deploy' },
  { label: 'PWA', group: 'Build & deploy' },

  { label: 'Jest', group: 'Testing & debugging', icon: 'jest' },
  { label: 'Chrome DevTools', group: 'Testing & debugging', icon: 'googlechrome' },
  { label: 'Lighthouse', group: 'Testing & debugging', icon: 'lighthouse' },

  { label: 'Video.js', group: 'Media & ad tech' },
  { label: 'Bitmovin', group: 'Media & ad tech' },
  { label: 'CKEditor', group: 'Media & ad tech' },
  { label: 'DRM', group: 'Media & ad tech' },
]
