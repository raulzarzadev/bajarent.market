import ShopInfo from '@/components/ShopInfo'
import ItemCard from '@/components/ItemCard'
import { getShopItem } from '@/app/utils'
import FormRentNow from '@/components/FormRentNow'

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
          <h1 className={'h1'}>Renta ahora!</h1>
          <FormRentNow
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
