import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServiceOrders } from '@/firebase/ServiceOrders'
import { ServicePrices } from '@/firebase/ServicePrices'
import { ServiceShops } from '@/firebase/ServiceShops'
import { ServiceStores } from '@/firebase/ServiceStores'
import OrderType from '@/types/OrderType'
import { PriceType } from '@/types/PriceType'

export const getShop = async (shop: string) => {
  const item = await ServiceShops.getShopVisible(shop)
  return item
}

export const getShops = async () => {
  const items = await ServiceShops.getVisibleInMarket()
  return items
}

export const getItems = async () => {
  const items = await ServiceCategories.getVisibleInMarket()
  return items
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
    shopLink: shop?.link
  }))
}

export const getShopItem = async (shopId: string, itemId: string) => {
  const shop = await getShop(shopId || '')
  const item = await ServiceCategories.get(itemId)
  const prices = await getItemPrices(itemId)
  const itemData = {
    ...item,
    shop,
    shopId: shop.id,
    shopName: shop.name,
    shopImg: shop?.img,
    shopLink: shop?.link
  }
  return { item: itemData, shop, prices }
}
export const getItemPrices = async (itemId: string): Promise<PriceType[]> => {
  const prices = await ServicePrices.getByItem(itemId)
  return prices
}

export const postOrder = async (order: OrderType) => {
  try {
    if (!order.storeId) console.error('No storeId provided')
    const store = await ServiceStores.get(order?.storeId)
    const currentFolio = store?.currentFolio || 0
    const nextFolio = currentFolio + 1
    order.folio = nextFolio
    order.marketOrder = true
    const orderCreated = await ServiceOrders.create(order)
    const storeUpdated = await ServiceStores.update(store.id, {
      currentFolio: nextFolio
    })
    order.id = orderCreated.res.id

    return { orderCreated: order, storeUpdated }
  } catch (error) {
    console.error(error)
  }
}

export const getOrder = async ({ orderId }: { orderId?: string }) => {
  if (orderId) return await ServiceOrders.get(orderId)
}
