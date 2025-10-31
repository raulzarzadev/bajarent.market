import type { CustomerType } from '@/app/api/custmers/types'
import dictionary, { type DictionaryWords } from '@/libs/dictionary'

export const getFavoriteCustomerPhone = (customerContacts: CustomerType['contacts']) => {
  const phones = Object.values(customerContacts || {})
    .filter((a) => a.type === 'phone')
    .sort((a, b) => {
      // set is favorite first
      if (a.isFavorite) return -1
      if (b.isFavorite) return 1
      return 0
    })
    .map((a) => a.value)
  return phones?.[0] || null
}

export const writeMessage = (
  type: 'newWebOrder',
  {
    customerName,
    orderFolio,
    orderType,
    shopName,
  }: {
    customerName: string
    orderFolio: string
    orderType: DictionaryWords
    shopName: string
  }
) => {
  const messages = {
    newWebOrder: `📝 PEDIDO REALIZADO CON ÉXITO
  \nEstimado ${customerName || ''}:
  \n\n📦 Detalles del pedido:
  \nFolio: ${orderFolio}
  \nTipo: ${dictionary(orderType)}
  \nPronto un asesor se pondrá en contacto para confirmar la fecha de entrega.*
  \n${shopName} agradece su preferencia 🙏🏼
  `,
  }

  return messages[type]
}
