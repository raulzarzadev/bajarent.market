import { OrderStatuses, OrderTypes } from '@/types/OrderType'

export type DictionaryWords = OrderTypes | OrderStatuses
export default function dictionary(word?: DictionaryWords): string {
  if (!word) return ''
  return words[word]
}

const words: Record<DictionaryWords, string> = {
  RENT: 'Renta',
  SALE: 'Venta',
  REPAIR: 'Reparacion',
  STORE_RENT: 'Renta en tienda',
  DELIVERY_RENT: 'Renta a domicilio',
  PENDING: 'Pendiente',
  AUTHORIZED: 'En proceso',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
  REPORTED: 'Reportado',
  PICKUP: 'Recogida',
  EXPIRED: 'Expirado',
  RENEWED: 'Renovado',
  REPAIRING: 'En reparación',
  REPAIRED: 'Reparado',
  REPAIR_DELIVERED: 'Reparación entregada'
}
