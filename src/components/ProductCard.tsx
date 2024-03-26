import Image from 'next/image'
import ProductLabel, { Item } from './ProductLabel'

export default function ProductCard({
  fullWidth,
  item
}: {
  fullWidth?: boolean
  item: Item
}) {
  return (
    <div className="mb-6">
      <div
        className={`relative ${
          fullWidth ? 'w-full' : 'w-[180px]'
        } aspect-video`}
      >
        <Image
          src={item?.img || '/forest-image.jpeg'}
          alt={item?.name || 'Product Image'}
          fill
          className="rounded-md"
        />
      </div>
      <ProductLabel item={item} />
    </div>
  )
}
