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
    const maxRedirects = 10 // Limitar el número de redirecciones para evitar bucles infinitos
    let redirectCount = 0

    // Seguir redirecciones manualmente
    while (redirectCount < maxRedirects) {
      response = await fetch(currentUrl, { method: 'HEAD' })
      if (response.redirected) {
        currentUrl = response.url
        redirectCount++
      } else {
        break
      }
    }

    if (redirectCount === maxRedirects) {
      return NextResponse.json({ error: 'Too many redirects' }, { status: 400 })
    }

    return NextResponse.json({ finalUrl: currentUrl })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing the URL' },
      { status: 500 }
    )
  }
}
