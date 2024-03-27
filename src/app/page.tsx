import Hero from '@/components/Hero'
import ItemsList from '@/components/ItemList'
import { Item } from '@/components/ItemLabel'
import { Shop } from './[shop]/page'
import { getItems, getShops } from './utils'

async function getData() {
  const items = await getItems()
  const shops = await getShops()

  return { items, shops }
}
export default async function Home() {
  const data = await getData()
  const formatItems: Item[] = data.items
    .map((item: Item) => {
      const shop: Shop = data.shops.find(
        (shop: { id: any }) => shop.id === item.storeId
      )
      return {
        id: item?.id,
        name: item?.name,
        shopName: shop?.name,
        shopVisible: !!shop?.marketVisible,
        shop,
        shopLink: `/${shop?.link}`,
        img: item.img
      }
    })
    .filter((item: Item) => item?.shopVisible)
  return (
    <main className="flex min-h-screen flex-col  justify-between ">
      <Hero item={formatItems[0]} />
      <ItemsList items={formatItems} />
    </main>
  )
}
