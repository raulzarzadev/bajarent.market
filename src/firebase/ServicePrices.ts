import { where } from 'firebase/firestore'
import { FirebaseGenericService } from './service'
import { PriceType } from '@/types/PriceType'
class ServicePricesClass extends FirebaseGenericService<PriceType> {
  constructor() {
    super('prices')
  }

  async getByItem(itemId: string) {
    return this.getItems([
      where('marketVisible', '==', true),
      where('categoryId', '==', itemId)
    ])
  }
}

export const ServicePrices = new ServicePricesClass()
