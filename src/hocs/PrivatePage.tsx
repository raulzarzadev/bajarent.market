'use client'
import { useRouter } from 'next/navigation'
import { type ComponentType, useEffect } from 'react'
import { useAuth } from '@/context/authContext'

const PrivatePage = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter()
    const { user } = useAuth() // Usa tu hook de autenticación
    const loading = user === undefined
    const isAuthenticated = !!user
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login') // Redirige a la página de login si no está autenticado
      }
    }, [isAuthenticated, loading, router])

    if (loading || !isAuthenticated) {
      return <div>Loading...</div> // Muestra un mensaje de carga mientras se verifica la autenticación
    }

    return <WrappedComponent {...props} />
  }

  return ComponentWithAuth
}

export default PrivatePage
