import ShopHome from '@/components/ShopHome'
import { getShop } from '../utils'

export type Shop = {
  id: string
  name: string
  link: string
  description: string
  img: string
  marketVisible: boolean
}

export default async function Shop({
  params: { shop }
}: {
  params: { shop: string }
}) {
  const shopData = await getShop(shop)

  if (!shopData) {
    return <div>Shop not found</div>
  }
  return <ShopHome shop={shopData} />
}
