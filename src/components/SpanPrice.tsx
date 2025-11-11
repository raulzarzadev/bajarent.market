import type React from 'react'

interface SpanPriceProps {
  amount: number
}

const SpanPrice: React.FC<SpanPriceProps> = ({ amount }: { amount?: number | undefined }) => {
  const formattedAmount = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(Number(amount) || 0)

  return <span>{formattedAmount}</span>
}

export default SpanPrice
