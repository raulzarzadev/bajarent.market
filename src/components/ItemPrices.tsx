'use client'
import { PriceType } from '@/types/PriceType'
import { useEffect, useState } from 'react'

const ItemPrices = ({
  itemId,
  prices = [],
  onPrice,
  selectedPrice
}: {
  itemId: string
  prices: PriceType[]
  onPrice?: (priceId: string) => void
  selectedPrice?: string
}) => {
  const [selected, setSelected] = useState(selectedPrice)
  const formatter = new Intl.NumberFormat('es-Mx', {
    style: 'currency',
    currency: 'mxn' // Reemplaza 'EUR' con el código de tu moneda
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
    <div className="flex justify-center w-full my-4 flex-wrap gap-2">
      {prices.map((price) => (
        <button
          key={price.id}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onPrice) {
              handleSelectPrice(price.id)
            }
          }}
        >
          <div
            className={`primary card capitalize border-2 ${
              selected === price.id ? 'border-gray-700 ' : 'border-transparent'
            }`}
          >
            <h2 className="h3">{price.title}</h2>
            <p>{formatter.format(price.amount)}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
export default ItemPrices
