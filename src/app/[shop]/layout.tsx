import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { shop: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.shop

  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
  return {
    title: id
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages]
    // }
  }
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
