import dictionary from '@/libs/dictionary'
import type OrderType from '@/types/OrderType'

const OrderDetails = ({ order }: { order: Partial<OrderType> }) => {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
  return (
    <div>
      <h1 className="h1">Orden {order.folio}</h1>
      <p className="h1">{dictionary(order?.status)}</p>
      <p className="text-helper">id:{order?.id}</p>
      <p className="text-helper">Creado:{formatter.format(order.createdAt)}</p>
      <p className="text-helper">Ultima actualización:{formatter.format(order.updatedAt)}</p>
      <p>Nombre:{order?.fullName}</p>
      <p>Teléfono:{order?.phone}</p>
      <p>Dirección:{order?.address}</p>
      <p>Referencias:{order?.references}</p>
      <div className="text-center">
        <h1 className="h2 ">Artículo</h1>
        <h5 className="text-sm">Tipo:</h5>
        <p className="font-bold">{order?.item?.categoryName}</p>
        <h5 className="text-sm">Precio seleccionado: </h5>
        {order?.item?.priceSelected && (
          <div className=" ">
            <p className="font-bold">{order.item?.priceSelected?.title}</p>
            <p className="text-2xl font-bold">
              ${parseFloat(String(order.item?.priceSelected?.amount)).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
