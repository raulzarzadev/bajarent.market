import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
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
