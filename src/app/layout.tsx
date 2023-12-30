
import './theme.scss'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Karandeep Singh',
  description: 'Frontend Engineer Karandeep Singh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
