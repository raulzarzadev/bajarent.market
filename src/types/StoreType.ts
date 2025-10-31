import type BaseType from './BaseType'
export type BaseStoreType = {
  name: string
  description?: string
  currentFolio: number
  openApi?: boolean
}

type StoreType = BaseType & BaseStoreType

export default StoreType
