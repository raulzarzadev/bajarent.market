import { where } from 'firebase/firestore'
import { FirebaseGenericService } from './service'
import OrderType from '@/types/OrderType'
class ServiceOrdersClass extends FirebaseGenericService<OrderType> {
  constructor() {
    super('orders')
  }
  getByUser(userId: string) {
    return this.getItems([where('userId', '==', userId)])
  }
}

export const ServiceOrders = new ServiceOrdersClass()
