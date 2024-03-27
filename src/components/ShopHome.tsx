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
      {/* <div className=" pt-1 pb-2  bg-white">
        <Link
          href={`/rent-now/${link}`}
          className="block font-semibold mx-auto hover:scale-105 text-center bg-blue-500 text-white p-2 py-4 w-52 text-2xl  rounded-full shadow-lg uppercase "
        >
          Renta ahora
        </Link>
      </div> */}
      <ItemsList items={data} />
    </div>
  )
}
