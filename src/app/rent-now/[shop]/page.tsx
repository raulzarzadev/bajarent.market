import ShopInfo from '@/components/ShopInfo'
import { shops } from '../../../../DATA'

export default function RentNowShop({
  params: { shop }
}: {
  params: { shop: string; item: string }
}) {
  const shopData = shops?.find((s) => s.link === `/${shop}`)
  return (
    <div>
      <ShopInfo shop={shopData} />
    </div>
  )
}
