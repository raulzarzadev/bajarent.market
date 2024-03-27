import { where } from 'firebase/firestore'
import { FirebaseGenericService } from './service'
import { CategoryType } from '../types/RentItem'
class ServiceCategoriesClass extends FirebaseGenericService<CategoryType> {
  constructor() {
    super('categories')
  }

  async getVisibleInMarket() {
    return this.getItems([where('marketVisible', '==', true)])
  }

  async getByStore(storeId: string) {
    return this.getItems([where('storeId', '==', storeId)])
  }

  async getByShop(shopId: string) {
    return this.getItems([
      where('storeId', '==', shopId),
      where('marketVisible', '==', true)
    ])
  }
}

export const ServiceCategories = new ServiceCategoriesClass()
