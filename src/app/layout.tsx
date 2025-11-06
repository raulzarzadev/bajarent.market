import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'bajarent',
  description:
    'Renta lo que sea. Renta de herramientas y equipo en línea. Lavadoras, Bicicletas, Herramientas, Motos, Autos, y más.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={'inter.className'}>
          <Analytics />
          <Navbar />

          <main className="container mx-auto">{children}</main>
        </body>
      </Providers>
    </html>
  )
}
