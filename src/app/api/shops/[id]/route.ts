import { getShop } from '@/app/utils'
import { ServiceCategories } from '@/firebase/ServiceCategories'
import { ServiceShops } from '@/firebase/ServiceShops'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    return NextResponse.json([])
  } catch (error) {
    console.error({ error })
    return NextResponse.json({ msg: 'Error getting data' })
  }
}
