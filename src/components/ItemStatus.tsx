'use client'

import Link from 'next/link'
import type ItemType from '@/types/ItemType'
import { useOrders } from '@/context/ordersContext'

const ItemStatus = ({ item }: { item: ItemType }) => {
  const { userRents } = useOrders()
  const rentExist = userRents?.find((rent) => rent.categoryId === item.id)
  return (
    <div>
      {!!rentExist && (
        <Link href={'/my-rents'}>
          <div className="py-2 px-4 rounded-full bg-green-600 shadow-md text-white w-fit mx-auto my-4 opacity-90 hover:opacity-100">
            Ya has solicitado este artículo
          </div>
        </Link>
      )}
    </div>
  )
}

export default ItemStatus
