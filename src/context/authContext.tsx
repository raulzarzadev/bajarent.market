'use client'
import { authStateChanged } from '@/firebase/auth'
import UserType from '@/types/UserType'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const authContext = createContext<{ user?: UserType | null }>({
  user: undefined
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  useEffect(() => {
    authStateChanged((user: UserType | null) => {
      setUser(user)
    })
  }, [])
  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
