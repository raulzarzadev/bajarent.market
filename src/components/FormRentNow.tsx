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
import { isValidPhoneNumber } from 'react-phone-number-input'
import FormSignIn from './FormSignIn'
import { useAuth } from '@/context/authContext'
import UserType from '@/types/UserType'
import Button from './Button'

export type OrderNowProps = Pick<
  OrderType,
  'address' | 'storeId' | 'references' | 'phone' | 'scheduledAt' | 'fullName'
> & { categoryId: string; priceSelected: string; userId: string }

export default function FormRentNow({
  item,
  shop,
  prices = []
}: {
  item: Item
  shop: Shop
  prices?: PriceType[]
}) {
  const [orderCreated, setOrderCreated] = useState<OrderType | null>(null)

  const { user } = useAuth()
  if (user === undefined) return <div>Espere un momento</div>

  const initialValues: OrderNowProps = {
    storeId: shop?.id,
    categoryId: item?.id,
    address: '',
    references: '',
    phone: user?.phone || '',
    priceSelected: '',
    scheduledAt: new Date(),
    fullName: user?.fullName || user?.name || '',
    userId: user?.id || ''
  }

  const onSubmit = async (values: OrderNowProps) => {
    const priceSelected = prices.find((p) => p.id === values.priceSelected)

    const newOrder: Partial<OrderType> & {
      categoryId: string
      userId: string
    } = {
      userId: user?.id || '',
      marketOrder: true,
      fullName: values.fullName,
      storeId: values.storeId,
      address: values.address,
      references: values.references,
      phone: values.phone,
      scheduledAt: values.scheduledAt || new Date(),
      categoryId: item?.id,
      status: order_status.PENDING,
      type: order_type.RENT,
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

  const disabledUserField = !!user
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
          <form className="grid gap-2 mb-16 w-full">
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
                helperText="*Ejemplo: Juan Perez"
                disabled={disabledUserField}
              />
            )}
            {marketForm?.phone && (
              <FormikInputPhone
                name="phone"
                label="Teléfono"
                helperText="*Numero de teléfono válido"
                disabled={disabledUserField}
              />
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
            {!!marketForm?.references && (
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
            {marketForm?.location && (
              <FormikInputText
                name="location"
                label="Ubicación"
                helperText="Puedes pegar la ubicación de google maps"
              />
            )}

            {/* {marketForm?.imageId && <FormikInputFile name="imageID" />} */}

            <Modal
              title="Confirmar orden"
              openLabel="Rentar"
              confirmLabel="Rentar"
              openDisabled={
                !isValidPhoneNumber(values?.phone || '') || !values.fullName
              }
            >
              {!user && (
                <FormSignIn name={values.fullName} phone={values.phone} />
              )}
              {user && (
                <div>
                  <p>Nombre: {values.fullName}</p>
                  <p>Teléfono: {values.phone}</p>
                  <p>Dirección: {values.address}</p>
                  {/* <p>Referencias: {values.references}</p> */}
                  {orderCreated && (
                    <>
                      <p className="text-center ">
                        Orden creada con el folio:{' '}
                      </p>
                      <p className="text-center font-bold text-xl">
                        {orderCreated.folio}
                      </p>
                      <div className="flex w-full justify-center mt-4">
                        <Button
                          label={`Cancelar orden`}
                          onClick={() => {
                            console.log('handleCancelOrder')
                          }}
                          variant="outline"
                          color="error"
                        />
                      </div>
                    </>
                  )}

                  <p>{values.priceSelected}</p>
                  {!orderCreated && (
                    <div className="flex w-full justify-center mt-4">
                      <Button
                        // type="submit"
                        label={`
                    Confirmar renta
                    `}
                        onClick={() => handleSubmit()}
                        disabled={
                          !isValidPhoneNumber(values?.phone || '') ||
                          !values.fullName ||
                          isSubmitting
                        }
                        variant="solid"
                      />
                    </div>
                  )}
                </div>
              )}
            </Modal>
            <div>
              {!isValidPhoneNumber(values?.phone || '') && (
                <p className="text-helper text-error ">
                  *Es necesario un número de teléfono válido.
                </p>
              )}
              {!values.fullName && (
                <p className="text-helper text-error ">
                  *Es necesario un nombre.
                </p>
              )}
            </div>
            {/* <Button type="submit" label="Rentar" disabled={isSubmitting} /> */}
          </form>
        )}
      </Formik>
    </div>
  )
}
