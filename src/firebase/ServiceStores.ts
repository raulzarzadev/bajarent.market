import type StoreType from '@/types/StoreType'
import { FirebaseGenericService } from './service'

class ServiceStoresClass extends FirebaseGenericService<StoreType> {
  constructor() {
    super('stores')
  }
}

export const ServiceStores = new ServiceStoresClass()
