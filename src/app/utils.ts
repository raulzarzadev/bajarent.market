import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServicePrices } from '@/firebase/ServicePrices'
import { ServiceShops } from '@/firebase/ServiceShops'
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
    shopImg: shop.img,
    shopLink: shop.link
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
    shopImg: shop.img,
    shopLink: shop.link
  }
  return { item: itemData, shop, prices }
}
export const getItemPrices = async (itemId: string): Promise<PriceType[]> => {
  const prices = await ServicePrices.getByItem(itemId)
  return prices
}
