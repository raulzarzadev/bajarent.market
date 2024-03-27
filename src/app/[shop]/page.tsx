import ItemsList from '@/components/ItemList'
import Image from 'next/image'
import Link from 'next/link'
import { items, shops } from '../../../DATA'
import ShopHome from '@/components/ShopHome'

export type Shop = {
  id: string
  name: string
  link: string
  description: string
  img: string
}
export default function Shop({
  params: { shop }
}: {
  params: { shop: string }
}) {
  const shopData: Shop | undefined = shops?.find(
    (s) => s.id === shop || s.link === `/${shop}`
  )
  if (!shopData) {
    return <div>Shop not found</div>
  }
  return <ShopHome shop={shopData} />
}
