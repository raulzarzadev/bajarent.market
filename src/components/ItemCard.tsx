import Image from 'next/image'
import ProductLabel, { Item } from './ItemLabel'
import Link from 'next/link'

export default function ItemCard({
  fullWidth,
  item,
  showDescription,
  showPrices
}: {
  fullWidth?: boolean
  item: Item
  showDescription?: boolean
  showPrices?: boolean
}) {
  return (
    <div>
      <Link href={`/${item?.shopLink}/${item?.id}`}>
        <div
          className={`relative  ${
            fullWidth ? 'w-full' : 'w-[180px]'
          } aspect-video `}
        >
          <Image
            src={item?.img || '/forest-image.jpeg'}
            alt={item?.name || 'Product Image'}
            fill
            className="rounded-2xl object-cover object-center  "
          />
        </div>
      </Link>
      <ProductLabel
        item={item}
        showDescription={showDescription}
        showPrices={showPrices}
      />
    </div>
  )
}
