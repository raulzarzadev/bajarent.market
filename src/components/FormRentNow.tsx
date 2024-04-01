'use client'

import { Formik } from 'formik'
import { Item } from './ItemLabel'
import { Shop } from '@/app/[shop]/page'
import FormikInputText from './FormikInputText'
import ItemPrices from './ItemPrices'
import { PriceType } from '@/types/PriceType'
import OrderType, { order_status, order_type } from '@/types/OrderType'
import FormikInputPhone from './FormikInputPhone'
import Modal from './Modal'
import { useState } from 'react'
import Button from './Button'
import Link from 'next/link'

export type OrderNowProps = Pick<
  OrderType,
  'address' | 'storeId' | 'references' | 'phone' | 'scheduledAt' | 'fullName'
> & { categoryId: string; priceSelected: string }

export default function FormRentNow({
  item,
  shop,
  prices = []
}: {
  item: Item
  shop: Shop
  prices?: PriceType[]
}) {
  const initialValues: OrderNowProps = {
    storeId: shop?.id,
    categoryId: item?.id,
    address: '',
    references: '',
    phone: '',
    priceSelected: '',
    scheduledAt: new Date(),
    fullName: ''
  }

  const [orderCreated, setOrderCreated] = useState<OrderType | null>(null)

  const onSubmit = async (values: OrderNowProps) => {
    const priceSelected = prices.find((p) => p.id === values.priceSelected)

    const newOrder: Partial<OrderType> & { categoryId: string } = {
      fullName: values.fullName,
      storeId: values.storeId,
      address: values.address,
      references: values.references,
      phone: values.phone,
      scheduledAt: values.scheduledAt || new Date(),
      categoryId: item?.id,
      status: order_status.PENDING,
      type: order_type.DELIVERY_RENT,
      item: {
        categoryName: item?.name,
        priceQty: 1,
        priceSelectedId: values.priceSelected,
        priceSelected: priceSelected
      }
    }
    try {
      return await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          const order = data?.orderCreated
          setOrderCreated(order as OrderType)
        })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  const marketForm = item?.marketForm

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {}
          // if (!values.email) {
          //   errors.email = 'Required'
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = 'Invalid email address'
          // }
          // return errors
        }}
        onSubmit={async (values: OrderNowProps, { setSubmitting }) => {
          return await onSubmit(values)
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          setValues,
          values

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="grid gap-2 mb-16 w-full">
            {marketForm?.price && (
              <ItemPrices
                itemId={item?.id || ''}
                prices={prices}
                onPrice={(priceId) => {
                  setValues({ ...values, priceSelected: priceId })
                }}
              />
            )}
            {marketForm?.fullName && (
              <FormikInputText
                name="fullName"
                label="Nombre"
                helperText="Ejemplo: Juan Perez"
              />
            )}
            {marketForm?.phone && (
              <FormikInputPhone name="phone" label="Teléfono" />
            )}
            {marketForm?.neighborhood && (
              <FormikInputText
                name="neighborhood"
                label="Colonia "
                helperText="Ejemplo: Centro, San Pedro, etc."
              />
            )}
            {marketForm?.address && (
              <FormikInputText
                name="address"
                label="Dirección"
                helperText="Calle, Numero y entre calles"
              />
            )}
            {marketForm?.references && (
              <FormikInputText
                name="references"
                label="References"
                helperText="Ejemplo: Hay un camión de carga enfrente"
              />
            )}
            {marketForm?.scheduledAt && (
              <FormikInputText
                type="datetime-local"
                name="scheduleAt"
                label="Fecha "
                helperText="Puede cambiar sin previo aviso."
              />
            )}

            <Modal
              title="Confirmar orden"
              openLabel="Rentar"
              confirmLabel="Rentar"
            >
              {orderCreated && (
                <>
                  <p>Orden generada con folio: {orderCreated?.folio}</p>
                  <p>Status:{orderCreated?.status}</p>
                  <Link href={`/orders?orderId=${orderCreated?.id}`}>
                    Ver orden
                  </Link>
                </>
              )}
              {!orderCreated && (
                <>
                  <p>Su orden se genera de forma automatica.</p>
                  <p>
                    Pronto una persona de nuestro equípo se pondra en contacto
                    contigo para verificar tus datos
                  </p>
                </>
              )}
              <div className="my-6 flex w-full justify-center">
                <Button
                  disabled={isSubmitting}
                  label="Rentar"
                  onClick={async () => {
                    handleSubmit()
                  }}
                ></Button>
              </div>
            </Modal>
            {/* <Button type="submit" label="Rentar" disabled={isSubmitting} /> */}
          </form>
        )}
      </Formik>
    </div>
  )
}
