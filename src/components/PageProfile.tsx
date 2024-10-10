'use client'
import { useAuth } from '@/context/authContext'
import PrivatePage from '@/hocs/PrivatePage'

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

export default PrivatePage(PageProfile)
