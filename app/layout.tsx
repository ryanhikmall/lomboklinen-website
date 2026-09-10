import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Lomboklinen | Hotel Supplier & Interior Design',
  description: 'Elevating Lombok Hospitality with Premium Linens & Design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className='scroll-smooth'>
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-brand-bg text-brand-dark antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}