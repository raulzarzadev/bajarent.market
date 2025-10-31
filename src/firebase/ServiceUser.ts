import type StoreType from '../types/StoreType'
import { FirebaseGenericService } from './service'

// ? FIXME: StoreType?? this should be UserType
class ServiceUsersClass extends FirebaseGenericService<StoreType> {
  constructor() {
    super('users')
  }

  // Agrega tus métodos aquí
}

export const ServiceUsers = new ServiceUsersClass()
