'use client'
import { useAuth } from '@/context/authContext'

const PageProfile = () => {
  const { user } = useAuth()
  return (
    <div>
      <p>{user?.fullName || user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>
    </div>
  )
}

export default PageProfile
