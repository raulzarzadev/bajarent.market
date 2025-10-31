'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { authStateChanged } from '@/firebase/auth'
import { ServiceOrders } from '@/firebase/ServiceOrders'
import type OrderType from '@/types/OrderType'
import type UserType from '@/types/UserType'

const authContext = createContext<{
  user?: UserType | null
  userRents: OrderType[] | null
  fetchOrders: () => void
}>({
  user: undefined,
  userRents: null,
  fetchOrders: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  const [userRents, setUserRents] = useState<OrderType[] | null>(null)
  useEffect(() => {
    authStateChanged((user: UserType | null) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    if (user) {
      ServiceOrders.getByUser(user.id).then(setUserRents)
    } else {
      console.log('no user')
    }
  }

  return (
    <authContext.Provider value={{ user, userRents, fetchOrders }}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
