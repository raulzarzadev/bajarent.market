import Image from 'next/image'
import ProductCard from './ProductCard'
import { Item } from './ProductLabel'

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

const items: Item[] = [
  {
    name: 'Lavadora',
    shopName: 'Shop 1',
    shopLink: '/shop1',
    shortInfo: 'Short info about product 1',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Patineta',
    shopName: 'Peaceful Forests Rentals',
    shopLink: '/shop2',
    shortInfo: 'Short info about product 2',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Bicicleta de montaña',
    shopName: 'Shop 3',
    shopLink: '/shop3',
    shortInfo: '$200 x día',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Casa de campo',
    shopName: 'Shop 4',
    shopLink: '/shop4',
    shortInfo: 'Short info about product 4',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Habitación compartida',
    shopName: 'Nomadas',
    shopLink: '/shop4',
    shortInfo: 'Short info about product 4',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Habitación compartida',
    shopName: 'Nomadas',
    shopLink: '/shop4',
    shortInfo: 'Short info about product 4',
    img: '/forest-image.jpeg'
  },
  {
    name: 'Casa de campo',
    shopName: 'Shop 4',
    shopLink: '/shop4',
    shortInfo: 'Short info about product 4',
    img: '/forest-image.jpeg'
  }
]
