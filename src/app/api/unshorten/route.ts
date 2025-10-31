export async function GET(req: Request) {
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
    let response: any
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
      return new Response(JSON.stringify({ error: 'Too many redirects' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        unshortened_url: currentUrl,
        shortened_url: url
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Error processing the URL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
