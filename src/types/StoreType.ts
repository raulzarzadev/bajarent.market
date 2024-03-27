import BaseType from './BaseType'
export type BaseStoreType = {
  name: string
  description?: string
}

type StoreType = BaseType & BaseStoreType

export default StoreType
