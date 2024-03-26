import ProductCard from './ItemCard'
import { Item } from './ItemLabel'

export default function ItemsList({ items = [] }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {items?.slice(1).map((item, index) => (
        <ProductCard fullWidth key={index} item={item} />
      ))}
    </div>
  )
}
