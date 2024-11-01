'use client'

import { useAuth } from '@/context/authContext'
import PrivatePage from '@/hocs/PrivatePage'
import dictionary from '@/libs/dictionary'
import { dateFormat } from '@/libs/utils-date'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SpanPrice from './SpanPrice'

const MyRents = () => {
  const { userRents } = useAuth()
  const router = useRouter()
  const [chosenRow, setChosenRow] = useState(null)
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Item</th>
            <th>Opción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {userRents?.map((rent) => (
            <tr
              key={rent.id}
              className={`text-center border-b-8 border-transparent hover:bg-blue-100 cursor-pointer`}
              onClick={() => router.push(`/my-rents/${rent.id}`)}
            >
              <td>{dateFormat(rent.createdAt, 'dd MMM yy HH:mm')}</td>
              <td>{dictionary(rent.status)}</td>
              <td>{dictionary(rent.type)}</td>
              <td>{rent.item.categoryName}</td>
              <td>{rent.item.priceSelected?.title}</td>
              <td>
                <SpanPrice amount={rent.item.priceSelected?.amount ?? 0} />
              </td>
              {/* <td>
                <Link className="w-full" href={`my-rents/${rent?.id}`}>
                  <p>Ver</p>
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrivatePage(MyRents)
