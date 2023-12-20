import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { appLabels } from './constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${appLabels.APP_TITLE}`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}>
        <h1 className="text-2xl">{appLabels.APP_TITLE}</h1>
        {children}
      </body>
    </html>
  )
}
