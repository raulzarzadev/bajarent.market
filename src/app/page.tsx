import type { Item } from '@/components/ItemLabel'
import ItemsList from '@/components/ItemList'
import type { Shop } from './[shop]/page'
import { getItems, getShops } from './utils'
export const revalidate = 360
async function getData() {
  const items = await getItems()
  const shops = await getShops()

  return { items, shops }
}
export default async function Home() {
  const { items = [], shops = [] } = await getData()

  const formatItems: Item[] = items
    .map((item: Item) => {
      const shop: Shop = shops?.find((shop: { id: any }) => shop.id === item.storeId)
      return {
        id: item?.id,
        name: item?.name,
        shopName: shop?.name,
        shopVisible: !!shop?.marketVisible,
        shop,
        shopLink: `${shop?.link}`,
        img: item.img,
        shopImg: shop?.img
      }
    })
    .filter((item: Item) => item?.shopVisible)
  return (
    <main className="flex min-h-screen sm: flex-col  justify-start">
      <ItemsList items={formatItems} />
    </main>
  )
}
