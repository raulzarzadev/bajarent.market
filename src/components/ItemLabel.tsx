import { getItemPrices } from '@/app/utils'
import { PriceType } from '@/types/PriceType'
import Link from 'next/link'
import ItemPrices from './ItemPrices'
import { CategoryBase, RentItem } from '@/types/RentItem'

export type Item = {
  id: string
  name?: string
  shopName?: string
  shopLink?: string
  shortInfo?: string
  storeId?: string
  img?: string
  itemLink?: string
  description?: string
  shopVisible?: boolean
  marketForm?: CategoryBase['marketForm']
}
export default function ItemLabel({
  item,
  showDescription,
  showPrices,
  prices
}: {
  item: Item
  showDescription?: boolean
  showPrices?: boolean
  prices?: PriceType[]
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <Link href={`/${item?.shopLink || ''}/${item?.id}`}>
        <h1 className="font-bold text-2xl ">{item?.name}</h1>
      </Link>
      <div className="flex items-start flex-wrap">
        {item?.shopName && (
          <Link
            href={`/${item?.shopLink}`}
            className="bg-green-500 text-white px-2 py-1 rounded-2xl text-nowrap max-w-full  "
          >
            <p className="text-center truncate">{item?.shopName}</p>
          </Link>
        )}
        {item?.shortInfo && <p className="text-pretty">{item?.shortInfo}</p>}
        {showDescription && item?.description && (
          <p className="text-pretty">{item?.description}</p>
        )}
        {showPrices && <ItemPrices itemId={item.id} prices={prices || []} />}
      </div>
    </div>
  )
}
