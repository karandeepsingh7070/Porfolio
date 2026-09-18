import type { Metadata } from 'next'
import { Bricolage_Grotesque, Outfit, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/navigation/Nav'
import SmoothScroll from '@/components/motion/SmoothScroll'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.karandeepsingh.info'),
  title: 'Karandeep Singh, Senior Software Engineer',
  description:
    'Senior Software Engineer building frontend architecture for high-traffic platforms and the open-source tools other engineers reach for.',
  openGraph: {
    title: 'Karandeep Singh, Senior Software Engineer',
    description:
      'Senior Software Engineer building frontend architecture for high-traffic platforms and the open-source tools other engineers reach for.',
    url: 'https://www.karandeepsingh.info/',
    siteName: 'Karandeep Singh',
    images: [
      {
        url: '/portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Karandeep Singh, Senior Software Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karandeep Singh, Senior Software Engineer',
    description:
      'Senior Software Engineer building frontend architecture for high-traffic platforms and the open-source tools other engineers reach for.',
    images: ['/portfolio.png'],
  },
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  )
}
