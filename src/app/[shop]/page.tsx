import ShopHome from '@/components/ShopHome'
import { getShop } from '../utils'

export type Shop = {
  id: string
  name: string
  link: string
  description: string
  img: string
  marketVisible: boolean
  chatbot?: {
    id?: string
    apiKey?: string
    hostNumber?: string
    enabled?: boolean
    config?: Record<ChatBotConfigs, boolean>
  }
}

export default async function Shop({ params: { shop } }: { params: { shop: string } }) {
  const shopData = await getShop(shop)

  if (!shopData) {
    return <div>Shop not found</div>
  }
  return <ShopHome shop={shopData} />
}

export enum store_bot_configs {
  includeSender = 'Incluir remitente',
  sendDelivered = 'Orden entregada',
  sendPickedUp = 'Orden recogida',
  sendRenewed = 'Orden renovada',
  sendNewWebOrder = 'Nueva orden web',
  sendNewStoreOrder = 'Nueva orden de tienda'
}
export type ChatBotConfigs = keyof typeof store_bot_configs
