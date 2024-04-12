import { postOrder } from '@/app/utils'

export async function POST(request: Request) {
  const body = await request.json()

  body.marketOrder = true
  try {
    const res = await postOrder(body)
    return new Response(JSON.stringify(res), {
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error }), {
      headers: { 'content-type': 'application/json' },
      status: 500
    })
  }
}
