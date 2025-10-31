import { increment } from 'firebase/firestore'
import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServiceOrders } from '@/firebase/ServiceOrders'
import { ServicePrices } from '@/firebase/ServicePrices'
import { ServiceShops } from '@/firebase/ServiceShops'
import { ServiceStores } from '@/firebase/ServiceStores'
import type OrderType from '@/types/OrderType'
import type { PriceType } from '@/types/PriceType'

export const getShop = async (shopId: string) => {
  try {
    const item = await ServiceShops.getShopVisible(shopId)
    return item
  } catch (error) {
    console.error({ error })
  }
}

export const getShops = async () => {
  try {
    const items = await ServiceShops.getVisibleInMarket()
    return items
  } catch (error) {
    console.error({ error })
  }
}

export const getItems = async () => {
  try {
    const items = await ServiceCategories.getVisibleInMarket()
    return items
  } catch (error) {
    console.error({ error })
  }
}

export const getShopItems = async (id: string) => {
  const shop = await ServiceShops.get(id)
  const items = await ServiceCategories.getByShop(shop.id)
  return items.map((item) => ({
    ...item,
    shop,
    shopId: shop.id,
    shopName: shop.name,
    shopImg: shop?.img,
    shopLink: shop?.link,
  }))
}

export const getShopItem = async (shopId: string, itemId: string) => {
  const shop = await getShop(shopId || '')
  const item = await ServiceCategories.get(itemId)
  const prices = await getItemPrices(itemId)
  const itemData = {
    ...item,
    shop,
    shopId: shop?.id,
    shopName: shop?.name,
    shopImg: shop?.img,
    shopLink: shop?.link,
  }
  return { item: itemData, shop, prices }
}
export const getItemPrices = async (itemId: string): Promise<PriceType[]> => {
  const prices = await ServicePrices.getByItem(itemId)
  return prices
}

export const postOrder = async (order: OrderType) => {
  if (!order.storeId) console.error('No storeId provided')
  try {
    // FIRST update store
    await ServiceStores.update(order.storeId, {
      // @ts-expect-error
      currentFolio: increment(1),
    })
    // SECOND create order
    const currentFolio = (await ServiceStores.get(order.storeId)).currentFolio
    order.folio = currentFolio as unknown as number
    const orderId = await ServiceOrders.create(order).then((res) => res.res.id)

    // return created order
    order.id = orderId

    return { orderCreated: order }
  } catch (error) {
    console.log({ error })
    throw new Error('Error creating order')
  }
}

export const getOrder = async ({ orderId }: { orderId?: string | null }) => {
  if (orderId) return await ServiceOrders.get(orderId)
}
