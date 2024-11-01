import ShopInfo from '@/components/ShopInfo'
import ItemCard from '@/components/ItemCard'
import { getShopItem } from '@/app/utils'
import FormOrderNow from '@/components/FormOrderNow'
import ItemStatus from '@/components/ItemStatus'

export default async function ShopItem({
  params
}: {
  params: { shop: string; itemId: string }
}) {
  const { item, shop, prices } = await getShopItem(params.shop, params.itemId)

  return (
    <div className="p-2">
      <ShopInfo shop={shop} />
      {!item && <h1>Item no encontrado</h1>}
      {item && (
        <>
          <ItemCard item={item} fullWidth showDescription prices={prices} />
          <ItemStatus item={item} />
          <h1 className={'h1'}>Ordena ahora!</h1>

          <FormOrderNow
            item={{ ...item, shopImg: shop.img }}
            shop={shop}
            prices={prices}
            // onSubmit={onSubmit}
          />
        </>
      )}
    </div>
  )
}
