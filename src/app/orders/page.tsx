import OrderDetails from '@/components/OrderDetails'
import { getOrder } from '../utils'

const Orders = async ({
  searchParams
}: {
  searchParams: { orderId: string }
}) => {
  const order = await getOrder({ orderId: searchParams.orderId })

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
