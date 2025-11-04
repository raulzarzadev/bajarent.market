'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { authStateChanged, usersCRUD } from '@/firebase/auth'
import { ServiceOrders } from '@/firebase/ServiceOrders'
import type OrderType from '@/types/OrderType'
import type UserType from '@/types/UserType'

const authContext = createContext<{
  user?: UserType | null
  userRents: OrderType[] | null
  fetchOrders: () => void
  refreshUser: () => Promise<void>
}>({
  user: undefined,
  userRents: null,
  fetchOrders: () => {},
  refreshUser: async () => {}
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

  const refreshUser = async () => {
    if (user?.id) {
      const updatedUser = await usersCRUD.getItem(user.id)
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  return (
    <authContext.Provider value={{ user, userRents, fetchOrders, refreshUser }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
