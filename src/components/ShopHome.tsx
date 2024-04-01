import { Shop } from '@/app/[shop]/page'
import ItemsList from './ItemList'
import Image from 'next/image'
import { getShopItems } from '@/app/utils'

export default async function ShopHome({ shop }: { shop: Partial<Shop> }) {
  const { name, description, img, id } = shop
  const data = await getShopItems((id as string) || '')
  return (
    <div className="">
      <div className="sm:flex my-6">
        <div className=" ">
          <Image
            src={img || '/forest-image.jpeg'}
            alt={'Shop Image'}
            width={160}
            height={160}
            className="sm:rounded-full rounded-md m-auto shadow-md shadow-black w-full max-w-44   "
          />
        </div>
        <div className="pl-4">
          <h1 className="font-bold text-4xl text-left">{name}</h1>
          <p className="text-left my-4 text-lg">{description}</p>
        </div>
      </div>

      <ItemsList items={data} />
    </div>
  )
}
