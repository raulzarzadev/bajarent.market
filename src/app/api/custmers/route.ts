import { ServiceCustomers } from '@/firebase/ServiceCustomers'

export async function POST(request: Request) {
  const body = await request.json()
  const customer = body
  try {
    const res = await ServiceCustomers.create(customer)

    return new Response(JSON.stringify({ ...customer, id: res?.res?.id }), {
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
