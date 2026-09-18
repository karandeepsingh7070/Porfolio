import type { Metadata } from 'next'
import { Bricolage_Grotesque, Outfit, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/navigation/Nav'
import SmoothScroll from '@/components/motion/SmoothScroll'
import StructuredData from '@/components/seo/StructuredData'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
  adjustFontFallback: false,
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

const title = 'Karandeep Singh (Karan) — Freelance Software & Frontend Engineer'
const description =
  'Karan (Karandeep Singh) is a freelance software engineer and frontend engineer in New Delhi, building React and Next.js architecture for high-traffic platforms, plus the open-source tools other engineers reach for.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.karandeepsingh.info'),
  title,
  description,
  keywords: [
    'Karandeep Singh',
    'Karan',
    'Karan Singh',
    'freelance software engineer',
    'freelance frontend engineer',
    'frontend engineer',
    'software engineer',
    'senior software engineer',
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'OTT frontend architecture',
    'open source developer',
    'Overwatch TS',
    'state management library',
    'New Delhi software engineer',
    'remote frontend engineer',
    'hire freelance frontend engineer',
  ],
  authors: [{ name: 'Karandeep Singh', url: 'https://www.karandeepsingh.info' }],
  creator: 'Karandeep Singh',
  publisher: 'Karandeep Singh',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title,
    description,
    url: 'https://www.karandeepsingh.info/',
    siteName: 'Karandeep Singh',
    locale: 'en_US',
    images: [
      {
        url: '/portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Karandeep Singh, freelance software & frontend engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/portfolio.png'],
  },
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
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
        <StructuredData />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  )
}
