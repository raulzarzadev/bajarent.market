import { getItemPrices } from '@/app/utils'
import { PriceType } from '@/types/PriceType'

const ItemPrices = async ({ itemId }: { itemId: string }) => {
  const prices: PriceType[] = await getItemPrices(itemId)
  const formatter = new Intl.NumberFormat('es-Mx', {
    style: 'currency',
    currency: 'mxn' // Reemplaza 'EUR' con el código de tu moneda
  })
  return (
    <div className="flex justify-center w-full my-4 flex-wrap gap-2">
      {prices.map((price) => (
        <div key={price.id} className="primary card capitalize">
          <h2 className="h3">{price.title}</h2>
          <p>{formatter.format(price.amount)}</p>
        </div>
      ))}
    </div>
  )
}
export default ItemPrices
