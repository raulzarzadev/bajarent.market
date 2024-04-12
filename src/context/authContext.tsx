'use client'
import { OrderNowProps } from '@/components/FormRentNow'
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
}>({
  user: undefined,
  userRents: null
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
    if (!!user) {
      ServiceOrders.getByUser(user.id).then(setUserRents)
    }
  }, [user])

  return (
    <authContext.Provider value={{ user, userRents }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
