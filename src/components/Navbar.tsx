import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-4 mb-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold">
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="https://admin.bajarent.app" className="font-bold">
          admin
        </Link>
        <Link href="/login" className="font-bold">
          Login
        </Link>
      </div>
    </nav>
  )
}
