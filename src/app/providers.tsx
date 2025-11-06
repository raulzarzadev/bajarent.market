'use client'

import { AuthProvider } from '@/context/authContext'
import { OrdersProvider } from '@/context/ordersContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </AuthProvider>
  )
}
