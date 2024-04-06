import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import MenuProfile from './MenuProfile'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-2 mb-2">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold">
          Home
        </Link>
      </div>
      <div className="flex justify-center px-4">
        {/* <input
          placeholder="Buscar"
          className="border-black border border-solid rounded-xl p-1 pl-2 border-opacity-30 w-full"
        ></input> */}
      </div>
      <div className="flex items-center space-x-4">
        <Link href="https://admin.bajarent.app" className="font-bold">
          admin
        </Link>
        <MenuProfile />
      </div>
    </nav>
  )
}
