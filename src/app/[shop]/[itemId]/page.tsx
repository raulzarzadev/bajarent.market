import { getShopItem } from '@/app/utils'
import FormOrderNow from '@/components/FormOrderNow'
import ItemCard from '@/components/ItemCard'
import ItemStatus from '@/components/ItemStatus'
import ShopInfo from '@/components/ShopInfo'
import catchError from '@/libs/catchError'

export default async function ShopItem({
  params
}: {
  params: { shop: string; itemId: string }
}) {
  const { shop: shopName, itemId } = await Promise.resolve(params)
  //const { item, shop, prices } = await getShopItem(params.shop, params.itemId)
  const [error, result] = await catchError(getShopItem(shopName, itemId))
  if (error || !result) {
    console.log({ itemId, shopName, error })
    return <div>Error loading item: {error?.message}</div>
  }
  const { item, shop, prices } = result
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
