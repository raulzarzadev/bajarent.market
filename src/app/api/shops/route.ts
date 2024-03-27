import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServiceShops } from '@/firebase/ServiceShops'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const res = await ServiceShops.getVisibleInMarket()
    return NextResponse.json(res)
  } catch (error) {
    console.error({ error })
    return NextResponse.json({ msg: 'Error getting data' })
  }
}
