import Link from 'next/link'
import type { Shop } from '@/app/[shop]/page'
import Button from './Button'

export default function ShopInfo({ shop }: { shop?: Partial<Shop> }) {
  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl text-center font-bold my-4 items-center">{shop?.name}</h1>
        {/* <Link
          href={`/${shop?.link}`}
          className="text-sm ml-4 bg-green-400 px-2 rounded-full py-0.5 text-white"
        >
          visita
        </Link> */}
        <Button
          linkComponent={Link}
          href={`/${shop?.link}`}
          label="ver mas productos"
          variant="ghost"
        />
      </div>
      {/* <h3>{shop?.description}</h3> */}
    </div>
  )
}
