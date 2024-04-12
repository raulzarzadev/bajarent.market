'use client'

import { useAuth } from '@/context/authContext'
import { dateFormat } from '@/libs/utils-date'

const MyRents = () => {
  const { userRents } = useAuth()
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Item</th>
            <th>Opción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {userRents?.map((rent) => (
            <tr key={rent.id} className="text-center">
              <td>{dateFormat(rent.createdAt, 'dd MMM yy')}</td>
              <td>{rent.status}</td>
              <td>{rent.item.categoryName}</td>
              <td>{rent.item.priceSelected?.title}</td>
              <td>{rent.item.priceSelected?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyRents
