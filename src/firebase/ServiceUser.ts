import { where } from 'firebase/firestore'
import type StoreType from '../types/StoreType'
import { FirebaseGenericService } from './service'
import { cleanPhone } from '@/libs/clear-phone'

// ? FIXME: StoreType?? this should be UserType
class ServiceUsersClass extends FirebaseGenericService<StoreType> {
  constructor() {
    super('users')
  }

  // Agrega tus métodos aquí
  userExists({ phone }: { phone: string }) {
    const clearPhone = cleanPhone(phone)
    return this.getItems([where('phone', '==', `+${clearPhone}`)])
  }
}

export const ServiceUsers = new ServiceUsersClass()
