import { getShopItem } from '@/app/utils'
import ShopInfo from '@/components/ShopInfo'

export default async function RentNowShop({ params: { slug } }: { params: { slug: string[] } }) {
  const shopLink = slug[0] || ''
  const itemId = slug[1]
  const { shop } = await getShopItem(shopLink, itemId)

  return (
    <div>
      <ShopInfo shop={shop} />
      <h1 className="text-2xl text-center text-balance">
        Necesitamos unos datos para continuar con tu renta
      </h1>
    </div>
  )
}
