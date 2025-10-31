'use client'
import { useEffect, useState } from 'react'
import type { PriceType } from '@/types/PriceType'

const ItemPrices = ({
  itemId,
  prices = [],
  onPrice,
  selectedPrice,
}: {
  itemId: string
  prices: PriceType[]
  onPrice?: (priceId: string) => void
  selectedPrice?: string
}) => {
  const [selected, setSelected] = useState(selectedPrice)
  const formatter = new Intl.NumberFormat('es-Mx', {
    style: 'currency',
    currency: 'mxn', // Reemplaza 'EUR' con el código de tu moneda
  })

  useEffect(() => {
    setSelected(selectedPrice)
  }, [selectedPrice])

  const handleSelectPrice = (priceId: string) => {
    setSelected(priceId)
    if (onPrice) {
      onPrice(priceId)
    }
  }

  return (
    <div className="flex justify-center w-full my-4 flex-wrap gap-2 ">
      {prices.map((price) => (
        <button
          type="button"
          key={price.id}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onPrice) {
              handleSelectPrice(price.id)
            }
          }}
          className="w-[120px] h-20"
        >
          <div
            className={` card capitalize border-2 border-gray-400 border-opacity-50 h-full flex flex-col justify-between ${
              selected === price.id ? 'primary' : 'border-transparent'
            }`}
          >
            <h2 className=" ">{price.title}</h2>
            <p className="h3">{formatter.format(price.amount)}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
export default ItemPrices
