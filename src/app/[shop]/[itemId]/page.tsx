import ShopInfo from '@/components/ShopInfo'
import { items, shops } from '../../../../DATA'
import ShopItemInfo from '@/components/ShopItemInfo'
import ItemCard from '@/components/ItemCard'

export default function ShopItem({
  params
}: {
  params: { shop: string; itemId: string }
}) {
  const shopData = shops?.find((shop) => shop.link === `/${params.shop}`)
  const itemData = items.find(
    (item) => item.shopLink === `/${params.shop}` && item.id === params.itemId
  )

  return (
    <div>
      <ShopInfo shop={shopData} />
      {itemData ? (
        <ItemCard item={itemData} fullWidth />
      ) : (
        <h1>Item no encontrado</h1>
      )}
    </div>
  )
}
