'use client'

import { useAuth } from '@/context/authContext'
import MenuMain from './MenuMain'
import { logout } from '@/firebase/auth'
import Avatar from './Avatar'
import Icon from './Icon'

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
            label: 'Mis ordenes',
            href: '/my-rents',
            visible: !!user,
            icon: 'list'
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
      >
        {user === undefined && (
          <div className="w-8  aspect-square rounded-full bg-gray-500"></div>
        )}
        {user === null && (
          <div className="w-8  aspect-square rounded-full justify-center items-center flex">
            <Icon icon="profileAdd" />
          </div>
        )}
        {user?.image && <Avatar src={user.image} size="sm" />}
        {user && !user.image && <Avatar label={user.name} size="sm" />}
      </MenuMain>
    </div>
  )
}

export default MenuProfile
