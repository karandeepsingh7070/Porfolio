
import PageTransition from './Components/ScrollProgressBar/PageTransition'
import ScrollProgressBar from './Components/ScrollProgressBar/ScrollProgressBar'
import './theme.scss'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Karandeep Singh',
  description: 'Frontend Engineer Karandeep Singh',
  openGraph: {
    title: 'Karandeep Singh | Frontend Developer',
    description: 'Senior Software Engineer | Frontend Engineer - Karandeep Singh',
    url: 'https://www.karandeepsingh.info/',
    siteName: 'Karandeep Singh',
    images: [
      {
        url: 'https://www.karandeepsingh.info/portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Karandeep Singh',
      },
    ],
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScrollProgressBar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
