import type BaseType from './BaseType'
import type { RentItem } from './RentItem'
import type StoreType from './StoreType'

// import { CommentType } from './CommentType'
// import PaymentType from './PaymentType'

type OrderBase = {
  marketOrder?: boolean

  note: string

  folio: number
  status: OrderStatus
  type: TypeOfOrderType

  storeId: StoreType['id']

  firstName: string
  lastName: string
  fullName: string

  email: string
  phone: string

  imageID: string
  imageHouse: string

  street?: string
  betweenStreets?: string
  neighborhood?: string
  location?: string
  customerId?: string
  /**
   * @deprecated use references instead
   */
  indications?: string
  references?: string
  address?: string

  scheduledAt: Date

  deliveredAt: Date
  deliveredBy: string
  deliveredByStaff: string

  pickedUpAt?: Date
  pickedUpBy?: string
  pickedUpByStaff?: string

  items: RentItem[]
  item: RentItem
  expireAt?: Date | null

  //comments: CommentType[]

  hasNotSolvedReports?: boolean

  assignToSection?: string
  assignToStaff?: string

  /**
   * @deprecated use assignToStaff instead
   */
  assignToPosition?: string
  /**
   * @deprecated use assignToStaff instead
   */
  assignToName?: string
  /**
   * @deprecated use assignToStaff instead
   */
  assignTo: string

  renewedAt: Date
  renewedFrom: string

  hasDelivered?: boolean

  //* to repair orders
  description?: string
  itemBrand?: string
  itemSerial?: string

  repairedAt?: Date
  repairedBy?: string
  repairedByStaff?: string

  repairTotal?: number
  repairInfo?: string
  quoteBy?: string

  //payments: PaymentType[]

  priority?: number

  categoryId?: string
}

export enum order_status {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REPORTED = 'REPORTED',
  PICKUP = 'PICKUP',
  EXPIRED = 'EXPIRED',
  RENEWED = 'RENEWED',
  REPAIRING = 'REPAIRING',
  REPAIRED = 'REPAIRED',
  REPAIR_DELIVERED = 'REPAIR_DELIVERED',
}

export enum order_type {
  RENT = 'RENT',
  SALE = 'SALE',
  REPAIR = 'REPAIR',
  /**
   * @deprecated use RENT instead
   */
  STORE_RENT = 'STORE_RENT',
  /**
   * @deprecated use RENT instead
   */
  DELIVERY_RENT = 'DELIVERY_RENT',
}
export type OrderTypes = keyof typeof order_type
export type TypeOfOrderType = order_type
export type OrderStatus = order_status
export type OrderStatuses = keyof typeof order_status

type OrderType = OrderBase & BaseType

export const ORDER_STATUS_SOLVED = [
  order_status.CANCELLED,
  order_status.REPAIR_DELIVERED,
  order_status.DELIVERED,
  order_status.PICKUP,
  order_status.RENEWED,
]

export const ORDER_STATUS_UNSOLVED = Object.keys(order_status).filter(
  (status) => !ORDER_STATUS_SOLVED.includes(status as any)
)

export default OrderType
