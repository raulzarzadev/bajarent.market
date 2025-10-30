import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import MenuProfile from './MenuProfile'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-2 mb-2">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold flex items-center space-x-2">
          <Image src="/logo.png" alt="bajarent" width={52} height={52} />
          <span className="hidden sm:block">BajaRentApp</span>
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
