import { where } from 'firebase/firestore'
import type OrderType from '@/types/OrderType'
import { FirebaseGenericService } from './service'

class ServiceOrdersClass extends FirebaseGenericService<OrderType> {
  constructor() {
    super('orders')
  }
  getByUser(userId: string) {
    return this.getItems([where('userId', '==', userId)])
  }
}

export const ServiceOrders = new ServiceOrdersClass()
