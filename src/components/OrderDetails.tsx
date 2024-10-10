import OrderType from '@/types/OrderType'

const OrderDetails = ({ order }: { order: Partial<OrderType> }) => {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
  return (
    <div>
      <h1 className="h1">Orden {order.folio}</h1>
      <p className="h1">{order?.status}</p>
      <p className="text-helper">id:{order?.id}</p>
      <p className="text-helper">Creado:{formatter.format(order.createdAt)}</p>
      <p className="text-helper">
        Ultima actualización:{formatter.format(order.updatedAt)}
      </p>
      <p>Nombre:{order?.fullName}</p>
      <p>Teléfono:{order?.phone}</p>
      <p>Dirección:{order?.address}</p>
      <p>Referencias:{order?.references}</p>

      <h1 className="h2">Artículo</h1>
      <p>Tipo: {order?.item?.categoryName}</p>
      {order.item?.priceSelected && (
        <>
          <p>{order.item?.priceSelected?.title}</p>
          <p>{order.item?.priceSelected?.amount}</p>
        </>
      )}
      <h1 className="h2">Fecha estimada de entrega</h1>
      {order?.scheduledAt && (
        <p className="text-center ">
          {formatter.format(new Date(order.scheduledAt))}
        </p>
      )}
    </div>
  )
}

export default OrderDetails
