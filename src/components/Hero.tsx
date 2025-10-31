import ProductCard from './ItemCard'
import type { Item } from './ItemLabel'

export default function Hero({ item }: { item: Item }) {
  return (
    <div className="w-full aspect-video  mx-auto ">
      <ProductCard fullWidth item={item} />
    </div>
  )
}
