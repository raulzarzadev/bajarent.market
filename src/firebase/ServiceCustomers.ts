import { CustomerType } from '@/app/api/custmers/types'
import { FirebaseGenericService } from './service'

class ServiceCustomersClass extends FirebaseGenericService<CustomerType> {
  constructor() {
    super('customers')
  }
}

export const ServiceCustomers = new ServiceCustomersClass()
