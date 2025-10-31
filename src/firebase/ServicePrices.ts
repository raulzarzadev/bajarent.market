import { where } from 'firebase/firestore'
import type { PriceType } from '@/types/PriceType'
import { FirebaseGenericService } from './service'

class ServicePricesClass extends FirebaseGenericService<PriceType> {
  constructor() {
    super('prices')
  }

  async getByItem(itemId: string) {
    return this.getItems([where('marketVisible', '==', true), where('categoryId', '==', itemId)])
  }
}

export const ServicePrices = new ServicePricesClass()
