'use client'
import OrderDetails from '@/components/OrderDetails'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'

const Orders = ({ params }: { params: { orderId: string } }) => {
  const { userRents, user } = useAuth()
  const order = userRents?.find((rent) => rent.id === params.orderId)
  if (user === null)
    return (
      <div>
        <p>Debes iniciar sesión para ver tus ordenes</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Ingresar
        </Link>
      </div>
    )
  return (
    <div>
      {!order && (
        <>
          <h1 className="h2 my-16">Orden no encontrada</h1>
        </>
      )}
      {order && <OrderDetails order={order} />}
    </div>
  )
}

export default Orders
