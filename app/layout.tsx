import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Embers UBC',
  description: 'A community for UBC business students navigating faith and ambition together.',
  icons: {
    icon: '/images/Group 44.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
