import { where } from 'firebase/firestore'
import { FirebaseGenericService } from './service'
import StoreType from '@/types/StoreType'
class ServiceShopsClass extends FirebaseGenericService<StoreType> {
  constructor() {
    super('stores')
  }

  async getVisibleInMarket() {
    return this.getItems([where('marketVisible', '==', true)])
  }
  async getShopVisible(shop: string) {
    const res = await this.getItems([
      where('marketVisible', '==', true),
      where('link', '==', shop)
    ])
    return res?.[0] || null
  }
}

export const ServiceShops = new ServiceShopsClass()
