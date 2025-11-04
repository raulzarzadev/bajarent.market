import { where } from 'firebase/firestore'
import { FirebaseGenericService } from './service'
import { cleanPhone } from '@/libs/clear-phone'
import type UserType from '@/types/UserType'

// ? FIXME: StoreType?? this should be UserType
class ServiceUsersClass extends FirebaseGenericService<UserType> {
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
