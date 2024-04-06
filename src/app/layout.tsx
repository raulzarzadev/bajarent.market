import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bajarent',
  description:
    'Renta lo que sea. Renta de herramientas y equipo en línea. Lavadoras, Bicicletas, Herramientas, Motos, Autos, y más.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={'inter.className'}>
        <AuthProvider>
          <nav className="sticky top-0 z-10 bg-white">
            <Navbar />
          </nav>
          <main className=" max-w-[480px] mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
