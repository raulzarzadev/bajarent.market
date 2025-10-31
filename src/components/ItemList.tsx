import ProductCard from './ItemCard'
import type { Item } from './ItemLabel'

export default function ItemsList({ items = [] }: { items: Item[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2  ">
      {items.map((item, index) => (
        <div key={index} className="mb-2 ">
          <ProductCard fullWidth item={item} />
        </div>
      ))}
    </div>
  )
}
