import BaseType from './BaseType'
export type BaseStoreType = {
  name: string
  description?: string
  currentFolio: number
}

type StoreType = BaseType & BaseStoreType

export default StoreType
