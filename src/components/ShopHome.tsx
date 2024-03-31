import { Shop } from '@/app/[shop]/page'
import ItemsList from './ItemList'
import Image from 'next/image'
import { getShopItems } from '@/app/utils'

export default async function ShopHome({ shop }: { shop: Partial<Shop> }) {
  const { name, description, img, id } = shop
  const data = await getShopItems((id as string) || '')
  return (
    <div>
      <h1 className="font-bold text-4xl text-center">{name}</h1>
      <div className="relative w-full aspect-square">
        <Image src={img || '/forest-image.jpeg'} alt={'Shop Image'} fill />
      </div>
      <p className="text-center my-4 text-lg">{description}</p>

      <ItemsList items={data} />
    </div>
  )
}
