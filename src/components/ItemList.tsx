import ProductCard from './ItemCard'
import { Item } from './ItemLabel'

export default function ItemsList({ items = [] }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2  ">
      {items.map((item, index) => (
        <div key={index} className="mb-2 ">
          <ProductCard fullWidth item={item} />
        </div>
      ))}
    </div>
  )
}
