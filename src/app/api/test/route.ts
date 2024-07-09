export async function GET(request: Request) {
  const body = {
    message: 'Hello from test route!'
  }

  try {
    return new Response(JSON.stringify({ body }), {
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
