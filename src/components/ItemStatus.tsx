'use client'

import { useAuth } from '@/context/authContext'
import ItemType from '@/types/ItemType'
import Link from 'next/link'

const ItemStatus = ({ item }: { item: ItemType }) => {
  const { userRents } = useAuth()
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
