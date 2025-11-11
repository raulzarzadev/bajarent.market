import type { NextApiRequest } from 'next'
import { ServiceShops } from '@/firebase/ServiceShops'

export async function GET(_: NextApiRequest, { params }: { params: { id: string } }) {
  const shopId = params.id

  try {
    const shop = await ServiceShops.getOpenApiShop({ shopId })
    if (!shop) {
      return new Response(JSON.stringify({ error: 'Shop not found' }), {
        headers: { 'content-type': 'application/json' },
        status: 404
      })
    }
    return new Response(JSON.stringify({ body: { shop } }), {
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { 'content-type': 'application/json' },
      status: 500
    })
  }
}
