import { PriceType } from '@/types/PriceType'
import Link from 'next/link'
import ItemPrices from './ItemPrices'
import { CategoryBase, RentItem } from '@/types/RentItem'
import Avatar from './Avatar'

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
  shopImg?: string
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
    <div className="flex items-center max-w-full flex-1">
      <Link href={`/${item?.shopLink || ''}`}>
        <Avatar src={item?.shopImg || ''} label={item.shopName} size="sm" />
      </Link>
      <div className="flex flex-col w-full h-full ml-2 max-w-full overflow-hidden ">
        <Link
          href={`/${item?.shopLink || ''}/${item?.id}`}
          className="truncate max-w-full whitespace-nowrap"
        >
          <h1 className="font-bold text-2xl truncate">{item?.name}</h1>
        </Link>
        <div className="flex items-start flex-wrap  ">
          {item?.shopName && (
            <Link
              href={`/${item?.shopLink}`}
              //className="bg-green-500 text-white px-2 py-1 rounded-2xl text-nowrap max-w-full  "
              className="text-helper flex justify-center items-top max-w-full whitespace-nowrap"
            >
              <p className="truncate  ">{item?.shopName}</p>
            </Link>
          )}
          {item?.shortInfo && <p className="text-pretty">{item?.shortInfo}</p>}
        </div>
        {showDescription && item?.description && (
          <p className="text-pretty">{item?.description}</p>
        )}
        {showPrices && <ItemPrices itemId={item.id} prices={prices || []} />}
      </div>
    </div>
  )
}
