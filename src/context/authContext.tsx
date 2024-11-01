'use client'

import { ServiceOrders } from '@/firebase/ServiceOrders'
import { authStateChanged } from '@/firebase/auth'
import OrderType from '@/types/OrderType'
import UserType from '@/types/UserType'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const authContext = createContext<{
  user?: UserType | null
  userRents: OrderType[] | null
  fetchOrders: () => void
}>({
  user: undefined,
  userRents: null,
  fetchOrders: () => {}
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
    <authContext.Provider value={{ user, userRents, fetchOrders }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
