import ProductCard from './ItemCard'
import { items } from '../../DATA'

export default function Hero() {
  return (
    <div className="w-full aspect-video  mx-auto ">
      <ProductCard fullWidth item={items[0]} />
    </div>
  )
}
