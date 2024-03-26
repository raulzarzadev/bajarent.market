import ItemsList from '@/components/ItemList'
import Image from 'next/image'
import Link from 'next/link'
import { items, shops } from '../../../DATA'

export type Shop = {
  id: string
  name: string
  link: string
  description: string
  img: string
}
export default function Shop({
  params: { shop }
}: {
  params: { shop: string }
}) {
  const shopData: Shop | undefined = shops?.find(
    (s) => s.id === shop || s.link === `/${shop}`
  )
  if (!shopData) {
    return <div>Shop not found</div>
  }
  const { name, description, img } = shopData
  return (
    <div>
      <h1 className="font-bold text-4xl text-center">{name}</h1>
      <div className="relative w-full aspect-square">
        <Image src={img || '/forest-image.jpeg'} alt={'Shop Image'} fill />
      </div>
      <p className="text-center my-4 text-lg">{description}</p>
      <div className=" pt-1 pb-2  bg-white">
        <Link
          href={`/rent-now/${shop}`}
          className="block font-semibold mx-auto hover:scale-105 text-center bg-blue-500 text-white p-2 py-4 w-52 text-2xl  rounded-full shadow-lg uppercase "
        >
          Renta ahora
        </Link>
      </div>
      <ItemsList items={items} />
    </div>
  )
}
