'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'
import { ServiceOrders } from '@/firebase/ServiceOrders'
import type OrderType from '@/types/OrderType'
import { useAuth } from './authContext'

const ordersContext = createContext<{
  userRents: OrderType[] | null
  fetchOrders: () => Promise<void>
  isLoading: boolean
  error: string | null
}>({
  userRents: null,
  fetchOrders: async () => {},
  isLoading: false,
  error: null
})

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [userRents, setUserRents] = useState<OrderType[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    if (!user?.id) {
      setUserRents(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const orders = await ServiceOrders.getByUser(user.id)
      setUserRents(orders)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Error al cargar las órdenes')
      setUserRents(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ordersContext.Provider
      value={{
        userRents,
        fetchOrders,
        isLoading,
        error
      }}
    >
      {children}
    </ordersContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(ordersContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}
