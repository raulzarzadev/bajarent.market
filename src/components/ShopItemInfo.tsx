import Image from 'next/image'
import type { Shop } from '@/app/[shop]/page'
import type { Item } from './ItemLabel'

export default function ShopItemInfo({
  item
}: {
  shop?: Partial<Shop>
  item?: Partial<Item>
}) {
  return (
    <div>
      <Image
        src={item?.img || '/'}
        alt={item?.name || 'Item Image'}
        width={200}
        height={200}
      />
      <h1>{item?.name}</h1>
      <p>{item?.description}</p>
    </div>
  )
}
