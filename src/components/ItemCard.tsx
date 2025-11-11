import Image from 'next/image'
import Link from 'next/link'
import type { PriceType } from '@/types/PriceType'
import ProductLabel, { type Item } from './ItemLabel'

export default function ItemCard({
  fullWidth,
  item,
  showDescription,
  showPrices,
  prices
}: {
  fullWidth?: boolean
  item: Item
  showDescription?: boolean
  showPrices?: boolean
  prices?: PriceType[]
}) {
  return (
    <div>
      <Link href={`/${item?.shopLink || ''}/${item?.id}`}>
        <div className={`relative  ${fullWidth ? 'w-full' : 'w-[180px]'} aspect-video `}>
          <Image
            src={item?.img || '/forest-image.jpeg'}
            alt={item?.name || 'Product Image'}
            fill
            className="rounded-2xl object-cover object-center shadow-xs shadow-slate-400 "
          />
        </div>
      </Link>
      <ProductLabel
        item={item}
        showDescription={showDescription}
        showPrices={showPrices}
        prices={prices}
      />
    </div>
  )
}
