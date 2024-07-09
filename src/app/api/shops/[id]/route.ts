import { ServiceShops } from '@/firebase/ServiceShops'
import { NextApiRequest } from 'next'

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const shopId = params.id
  // const shopId = params.id as string
  const body = {
    message: `Hello from shop details route! ${shopId} `
  }

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
