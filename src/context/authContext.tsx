'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { authStateChanged, usersCRUD } from '@/firebase/auth'
import type UserType from '@/types/UserType'

const authContext = createContext<{
  user?: UserType | null
  refreshUser: () => Promise<void>
}>({
  user: undefined,
  refreshUser: async () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)

  // Inicializar la autenticación automáticamente cuando se monta el provider
  useEffect(() => {
    authStateChanged((user: UserType | null) => {
      setUser(user)
    })
  }, [])

  const refreshUser = async () => {
    if (user?.id) {
      const updatedUser = await usersCRUD.getItem(user.id)
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  return <authContext.Provider value={{ user, refreshUser }}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
