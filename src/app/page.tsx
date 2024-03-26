import Hero from '@/components/Hero'
import ItemsList from '@/components/ItemList'
import { items } from '../../DATA'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero />
      <ItemsList items={items} />
    </main>
  )
}
