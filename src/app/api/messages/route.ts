import formatMxWhatsappPhone from './libs/formatMxWhatsappPhone'

export async function POST(request: Request) {
  try {
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!request.body) {
      return Response.json({ error: 'El cuerpo de la solicitud está vacío' }, { status: 400 })
    }
    const { botId, message, phone, apiKey, mediaUrl } = await request.json()

    if (!botId || !message || !phone || !apiKey) {
      return Response.json(
        { error: 'Faltan campos requeridos (botId, message, phone, apiKey)' },
        { status: 400 }
      )
    }
    const endpoint = `https://app.builderbot.cloud/api/v2/${botId}/messages`
    const number = formatMxWhatsappPhone(phone)

    const data = {
      messages: {
        content: message,
        mediaUrl,
      },
      number,
      checkIfExists: true,
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-builderbot': apiKey,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res)
        return res
      })
      .catch((error) => {
        console.error(error)
        return error
      })

    if (!res) {
      throw new Error('No se recibió respuesta del servicio de mensajes')
    }

    return new Response(JSON.stringify(res), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error }), {
      headers: { 'content-type': 'application/json' },
      status: 500,
    })
  }
}
