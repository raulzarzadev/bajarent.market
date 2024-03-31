import { FirebaseGenericService } from './service'
import OrderType from '@/types/OrderType'
class ServiceOrdersClass extends FirebaseGenericService<OrderType> {
  constructor() {
    super('orders')
  }
}

export const ServiceOrders = new ServiceOrdersClass()
