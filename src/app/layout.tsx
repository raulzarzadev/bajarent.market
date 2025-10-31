import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/authContext'

export const metadata: Metadata = {
  title: 'bajarent',
  description:
    'Renta lo que sea. Renta de herramientas y equipo en línea. Lavadoras, Bicicletas, Herramientas, Motos, Autos, y más.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={'inter.className'}>
        <Analytics />
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
