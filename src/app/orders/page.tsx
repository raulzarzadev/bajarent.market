import OrdersList from '@/components/OrdersList'

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Órdenes</h1>
          <p className="text-gray-600">
            Aquí puedes ver todos tus servicios: rentas, reparaciones y ventas
          </p>
        </div>

        <OrdersList />
      </div>
    </div>
  )
}

export default Orders
