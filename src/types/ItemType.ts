import type BaseType from './BaseType'
import type { CategoryType } from './RentItem'
export type ItemStatus = 'available' | 'rented' | 'maintenance' | 'sold' | 'stock'

export type ItemBase = {
  number: string
  serial: string
  brand: string
  status: ItemStatus
  /**
   * @description category id
   */
  category: CategoryType['id']
}

type ItemType = BaseType & ItemBase

export default ItemType
