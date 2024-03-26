import { Shop } from '@/app/[shop]/page'
import Link from 'next/link'

export default function ShopInfo({ shop }: { shop?: Partial<Shop> }) {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl text-center font-bold my-4">{shop?.name}</h1>
        <Link
          href={`${shop?.link}`}
          className="text-sm ml-4 bg-green-400 px-2 rounded-full py-0.5 text-white"
        >
          visita
        </Link>
      </div>
      {/* <h3>{shop?.description}</h3> */}
    </div>
  )
}
