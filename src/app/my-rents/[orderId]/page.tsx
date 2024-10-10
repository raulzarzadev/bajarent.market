'use client'
import OrderDetails from '@/components/OrderDetails'
import { useAuth } from '@/context/authContext'
import OrderType from '@/types/OrderType'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Orders = ({ params }: { params: { orderId: string } }) => {
  const { userRents, user } = useAuth()
  //const order = userRents?.find((rent) => rent.id === params.orderId)
  const [order, setOrder] = useState<OrderType | null>()
  useEffect(() => {
    const order = userRents?.find((rent) => rent.id === params.orderId)
    console.log({ order })
    setOrder(order)
  }, [params.orderId, userRents])

  if (user === null)
    return (
      <div>
        <p>Debes iniciar sesión para ver tus ordenes</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Ingresar
        </Link>
      </div>
    )
  if (order === undefined) return <p>Cargando...</p>
  if (order === null) return <p>Orden no encontrada</p>

  return <OrderDetails order={order} />
}

export default Orders
