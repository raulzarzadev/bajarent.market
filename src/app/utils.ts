import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServiceShops } from '@/firebase/ServiceShops'
import { cache } from 'react'

export const getShop = cache(async (shop: string) => {
  const item = await ServiceShops.getShopVisible(shop)
  return item
})

export const getShops = cache(async () => {
  const items = await ServiceShops.getVisibleInMarket()
  return items
})

export const getItems = cache(async () => {
  const items = await ServiceCategories.getVisibleInMarket()
  return items
})

export const getShopItems = cache(async (id: string) => {
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
})

export const getShopItem = cache(async (shopId: string, itemId: string) => {
  const shop = await getShop(shopId || '')
  const item = await ServiceCategories.get(itemId)
  const itemData = {
    ...item,
    shop,
    shopId: shop.id,
    shopName: shop.name,
    shopImg: shop?.img,
    shopLink: shop?.link
  }
  return { item: itemData, shop }
})
