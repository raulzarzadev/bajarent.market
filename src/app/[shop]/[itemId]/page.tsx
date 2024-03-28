import ShopInfo from '@/components/ShopInfo'
import ItemCard from '@/components/ItemCard'
import { getShopItem } from '@/app/utils'
import Link from 'next/link'

export default async function ShopItem({
  params
}: {
  params: { shop: string; itemId: string }
}) {
  const { shop, item } = await getShopItem(params.shop, params.itemId)

  return (
    <div>
      <ShopInfo shop={shop} />
      {item ? <ItemCard item={item} fullWidth /> : <h1>Item no encontrado</h1>}
      <div className=" pt-1 pb-2  bg-white">
        <Link
          href={`/rent-now/${shop.link}/${item.id}`}
          className="block font-semibold mx-auto hover:scale-105 text-center bg-blue-500 text-white p-3 py-2 w-fit text-xl  rounded-full shadow-lg uppercase "
        >
          Rentar ahora
        </Link>
      </div>
    </div>
  )
}
