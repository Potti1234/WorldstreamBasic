import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNavigation } from '@/components/bottom-navigation'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StreamApp - Live Streaming Platform',
  description: 'A minimal live streaming application'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <BottomNavigation />
        <Toaster />
      </body>
    </html>
  )
}
