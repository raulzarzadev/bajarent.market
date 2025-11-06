'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { useOrders } from '@/context/ordersContext'
import { useRouter } from 'next/navigation'
import type OrderType from '@/types/OrderType'
import { order_status, order_type } from '@/types/OrderType'
import Icon from './Icon'
import SpanPrice from './SpanPrice'
import dictionary from '@/libs/dictionary'
import { dateFormat } from '@/libs/utils-date'

const OrdersList = () => {
  const { user } = useAuth()
  const { userRents, isLoading, error, fetchOrders } = useOrders()

  useEffect(() => {
    fetchOrders()
  }, [user])

  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-pulse text-gray-500 mb-4">
            Cargando órdenes...
          </div>
        </div>
      </div>
    )
  }

  if (!userRents || userRents.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Icon
            icon="orders"
            size={48}
            className="mx-auto text-gray-400 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tienes órdenes aún
          </h3>
          <p className="text-gray-600 mb-6">
            Cuando realices una renta, compra o reparación, aparecerán aquí
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explorar servicios
          </button>
        </div>
      </div>
    )
  }

  // Filtrar órdenes
  const filteredOrders = userRents.filter((order) => {
    const statusMatch =
      selectedStatus === 'all' || order.status === selectedStatus
    const typeMatch = selectedType === 'all' || order.type === selectedType
    return statusMatch && typeMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case order_status.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case order_status.AUTHORIZED:
        return 'bg-blue-100 text-blue-800'
      case order_status.DELIVERED:
        return 'bg-green-100 text-green-800'
      case order_status.PICKUP:
        return 'bg-purple-100 text-purple-800'
      case order_status.CANCELLED:
        return 'bg-red-100 text-red-800'
      case order_status.EXPIRED:
        return 'bg-gray-100 text-gray-800'
      case order_status.REPAIRING:
        return 'bg-orange-100 text-orange-800'
      case order_status.REPAIRED:
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case order_type.RENT:
        return 'swap'
      case order_type.REPAIR:
        return 'settings'
      case order_type.SALE:
        return 'money'
      default:
        return 'orders'
    }
  }

  const getDaysUntilReturn = (order: OrderType) => {
    if (order.type !== order_type.RENT || !order.expireAt) return null

    const now = new Date()
    const expireDate = new Date(order.expireAt)
    const diffTime = expireDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los estados</option>
              {Object.values(order_status).map((status) => (
                <option key={status} value={status}>
                  {dictionary(status)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de servicio
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los tipos</option>
              {Object.values(order_type).map((type) => (
                <option key={type} value={type}>
                  {dictionary(type)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de órdenes */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const daysUntilReturn = getDaysUntilReturn(order)

          return (
            <button
              key={order.id}
              type="button"
              onClick={() => router.push(`/my-rents/${order.id}`)}
              className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Icon
                      icon={getTypeIcon(order.type)}
                      size={24}
                      className="text-gray-600"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.item?.categoryName || 'Servicio'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Folio: #{order.folio} •{' '}
                      {dateFormat(order.createdAt, 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {dictionary(order.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Tipo de servicio
                  </div>
                  <div className="text-sm text-gray-900">
                    {dictionary(order.type)}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Opción seleccionada
                  </div>
                  <div className="text-sm text-gray-900">
                    {order.item?.priceSelected?.title || 'No especificada'}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </div>
                  <SpanPrice amount={order.item?.priceSelected?.amount ?? 0} />
                </div>
              </div>

              {/* Información específica por tipo */}
              {order.type === order_type.RENT && order.expireAt && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-900 mb-1">
                        Fecha de retorno
                      </div>
                      <div className="text-sm text-blue-800">
                        {dateFormat(order.expireAt, 'dd/MM/yyyy HH:mm')}
                      </div>
                    </div>
                    {daysUntilReturn !== null && (
                      <div
                        className={`text-right ${
                          daysUntilReturn < 0
                            ? 'text-red-600'
                            : daysUntilReturn <= 3
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {daysUntilReturn < 0
                            ? `Vencido hace ${Math.abs(daysUntilReturn)} días`
                            : daysUntilReturn === 0
                            ? 'Vence hoy'
                            : `${daysUntilReturn} días restantes`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {order.type === order_type.REPAIR && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-orange-900 mb-1">
                        Descripción
                      </div>
                      <div className="text-sm text-orange-800">
                        {order.description || 'No especificada'}
                      </div>
                    </div>
                    {order.repairTotal && (
                      <div>
                        <div className="text-sm font-medium text-orange-900 mb-1">
                          Costo de reparación
                        </div>
                        <SpanPrice amount={order.repairTotal} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fechas importantes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                {order.scheduledAt && (
                  <div>
                    <span className="font-medium">Programado:</span>{' '}
                    {dateFormat(order.scheduledAt, 'dd/MM/yy HH:mm')}
                  </div>
                )}
                {order.deliveredAt && (
                  <div>
                    <span className="font-medium">Entregado:</span>{' '}
                    {dateFormat(order.deliveredAt, 'dd/MM/yy HH:mm')}
                  </div>
                )}
                {order.pickedUpAt && (
                  <div>
                    <span className="font-medium">Recolectado:</span>{' '}
                    {dateFormat(order.pickedUpAt, 'dd/MM/yy HH:mm')}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Icon
              icon="search"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron órdenes
            </h3>
            <p className="text-gray-600">
              Prueba ajustando los filtros para ver más resultados
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersList
