import ProductCard from './ProductCard'
import { items } from '../../DATA'

export default function Hero() {
  return (
    <div className="w-full aspect-video  max-w-[480px] mx-auto ">
      <ProductCard fullWidth item={items[0]} />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {items?.slice(1).map((item, index) => (
          <ProductCard fullWidth key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
