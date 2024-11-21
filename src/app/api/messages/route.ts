import sendMessage from './libs/sendWhatsapp'

export async function POST(request: Request) {
  const { botId, message, phone, apiKey } = await request.json()
  console.log({
    botId,
    message,
    phone,
    apiKey
  })
  try {
    const res = await sendMessage({ apiKey, botId, message, phone })
    return new Response(JSON.stringify(res), {
      headers: { 'content-type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error }), {
      headers: { 'content-type': 'application/json' },
      status: 500
    })
  }
}
