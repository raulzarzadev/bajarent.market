'use client'

import { useAuth } from '@/context/authContext'
import MenuMain from './MenuMain'
import { logout } from '@/firebase/auth'

const MenuProfile = () => {
  const { user } = useAuth()
  return (
    <div>
      <MenuMain
        label={''}
        icon={'profile'}
        options={[
          {
            label: 'Ingresar',
            href: '/login',
            visible: !user,
            icon: 'profileAdd'
          },
          {
            label: 'Perfil',
            href: '/profile',
            visible: !!user,
            icon: 'profileFill'
          },
          {
            label: 'Salir',
            href: '/logout',
            visible: !!user,
            icon: 'profile',
            onClick: () => {
              logout()
            }
          }
        ]}
      />
    </div>
  )
}

export default MenuProfile
