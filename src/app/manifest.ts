import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karandeep Singh — Freelance Software & Frontend Engineer',
    short_name: 'Karandeep Singh',
    description:
      'Karan (Karandeep Singh) is a freelance software engineer and frontend engineer building React and Next.js architecture and open-source developer tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#ff5a36',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
