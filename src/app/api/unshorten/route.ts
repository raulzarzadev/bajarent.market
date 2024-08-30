import { NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = req?.query?.url as string
  console.log(req)
  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url' }), {
      headers: { 'content-type': 'application/json' },
      status: 400
    })
  }

  try {
    let currentUrl = url
    let response

    // Seguir redirecciones manualmente
    while (true) {
      response = await fetch(currentUrl, { method: 'HEAD' })

      if (response.redirected) {
        currentUrl = response.url
      } else {
        break
      }
    }

    return NextResponse.json({ finalUrl: currentUrl })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing the URL' },
      { status: 500 }
    )
  }
}
