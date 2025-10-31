'use client'

import { where } from 'firebase/firestore'
import { Formik } from 'formik'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import type { Shop } from '@/app/[shop]/page'
import type { CustomerType } from '@/app/api/custmers/types'
import { useAuth } from '@/context/authContext'
import {
  getFavoriteCustomerPhone,
  writeMessage
} from '@/features/Customers/lib'
import { ServiceCustomers } from '@/firebase/ServiceCustomers'
import type OrderType from '@/types/OrderType'
import { order_status, order_type } from '@/types/OrderType'
import type { PriceType } from '@/types/PriceType'
import Button from './Button'
import FormikCheckbox from './FormikCheckbox'
import FormikInputPhone from './FormikInputPhone'
import FormikInputSelect from './FormikInputSelect'
import FormikInputText from './FormikInputText'
import FormikInputTextarea from './FormikInputTextarea'
import FormSignIn from './FormSignIn'
import type { Item } from './ItemLabel'
import ItemPrices from './ItemPrices'
import Modal from './Modal'

export type OrderNowProps = Pick<
  OrderType,
  | 'address'
  | 'storeId'
  | 'references'
  | 'phone'
  | 'scheduledAt'
  | 'fullName'
  | 'neighborhood'
  | 'location'
  | 'customerId'
> & { categoryId: string; priceSelected: string; userId: string }

export default function FormOrderNow({
  item,
  shop,
  prices = []
}: {
  item: Item
  shop: Shop
  prices?: PriceType[]
}) {
  const [orderCreated, setOrderCreated] = useState<OrderType | null>(null)
  const [customer, setCustomer] = useState<Partial<CustomerType> | null>()

  const { user, fetchOrders } = useAuth()

  useEffect(() => {
    if (user?.id && shop?.id) {
      ServiceCustomers.findOne([
        where('userId', '==', user?.id),
        where('storeId', '==', shop?.id)
      ])
        .then((res) => {
          setCustomer(res)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setCustomer(null)
    }
  }, [shop?.id, user?.id])

  if (user === undefined && customer === undefined)
    return <div>Espere un momento</div>

  type InitialValues = OrderNowProps & { isInLaPaz?: boolean }
  const initialValues: InitialValues = {
    storeId: shop?.id,
    categoryId: item?.id,
    address: customer?.address?.street || '',
    references: customer?.address?.references || '',
    neighborhood: customer?.address?.neighborhood || '',
    phone: user?.phone || '',
    priceSelected: '',
    scheduledAt: new Date(),
    fullName: customer?.name || user?.fullName || user?.name || '',
    userId: user?.id || '',
    customerId: customer?.id,
    isInLaPaz: customer?.address?.city === 'La Paz'
  }

  const onSubmit = async (values: OrderNowProps & { isInLaPaz?: boolean }) => {
    const priceSelected = prices.find((p) => p.id === values.priceSelected)
    //* if customer don't exist create it
    let shopCustomer = customer
    const formattingCustomer: Partial<CustomerType> = {
      storeId: shop.id,
      name: values?.fullName,
      userId: values?.userId,

      address: {
        city: values?.isInLaPaz ? 'La Paz' : '',
        street: values?.address || '',
        neighborhood: values?.neighborhood || '',
        references: values?.references || '',
        locationURL: values?.location || ''
      },
      contacts: {
        default: {
          value: values.phone,
          type: 'phone',
          label: 'Default',
          id: 'default'
        }
      }
    }
    if (shopCustomer?.id) {
      await ServiceCustomers.update(shopCustomer?.id, formattingCustomer)
        .then((res) => res)
        .catch((error) => console.error({ error }))
    }
    if (!shopCustomer) {
      const createdCustomer = await ServiceCustomers.create(formattingCustomer)
        .then(({ res }) => {
          //console.log('creado')
          return { id: res.id, ...formattingCustomer }
        })
        .catch((error) => {
          console.error(error)
          return null
        })

      if (createdCustomer) {
        // set customer
        shopCustomer = createdCustomer
      }
    }
    const newOrder: Partial<OrderType> & {
      categoryId: string
      userId: string
    } = {
      userId: user?.id || '',
      customerId: shopCustomer?.id || '',
      marketOrder: true,
      fullName: values?.fullName,
      storeId: values?.storeId,
      address: values?.address,
      neighborhood: values?.neighborhood,
      references: values?.references,
      phone: values?.phone,
      scheduledAt: values?.scheduledAt || new Date(),
      categoryId: item?.id,
      status: order_status.PENDING,
      type: item.type || order_type.RENT,
      location: values?.location,
      item: {
        categoryName: item?.name,
        priceQty: 1,
        priceSelectedId: values?.priceSelected,
        priceSelected: priceSelected
      }
    }
    try {
      const created = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      })
        .then((res) => {
          return res.json()
        })
        .then(async (data) => {
          const order = data?.orderCreated
          return order
        })
      setOrderCreated(created)

      // just send whatsapp if the option is enabled in the chatbot store optios
      if (shouldSentWhatsapp) {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: getFavoriteCustomerPhone(shopCustomer?.contacts || {}) || '',
            message: writeMessage('newWebOrder', {
              customerName: shopCustomer?.name || '',
              orderFolio: created?.folio,
              orderType: created?.type,
              shopName: shop?.name
            }),
            apiKey: shop?.chatbot?.apiKey || '',
            botId: shop?.chatbot?.id || ''
          })
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            return data
          })
          .catch((error) => {
            console.error(error)
            return error
          })
        if (res.waited) {
          console.log('sent message')
        }
      }

      fetchOrders()
      return
    } catch (error) {
      console.error(error)
      return error
    }
  }
  const shouldSentWhatsapp = shop.chatbot?.config?.sendNewWebOrder
  const marketForm = item?.marketForm

  const disabledUserField = false
  return (
    <div>
      {customer ? customer.id : ''}
      <Formik
        initialValues={initialValues}
        // validate={(values) => {

        //   const errors = {}
        //   // if (!values.email) {
        //   //   errors.email = 'Required'
        //   // } else if (
        //   //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   // ) {
        //   //   errors.email = 'Invalid email address'
        //   // }
        //   // return errors
        // }}
        onSubmit={async (values: InitialValues) => {
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
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-center my-2"> 1. Selecciona tu ciudad.</h2>
              <p className="text-xs ">
                * Actualmente solo contamos con servicio en las siguientes
                ciudades
              </p>
              <div className="my-4">
                <FormikCheckbox name="isInLaPaz" label="La Paz, BCS" />
              </div>
            </div>
            {!!values?.isInLaPaz && (
              <>
                <h2 className="text-center my-2 ">2. Seleccióna un precio</h2>

                <ItemPrices
                  itemId={item?.id || ''}
                  prices={prices}
                  onPrice={(priceId) => {
                    setValues({ ...values, priceSelected: priceId })
                  }}
                />
              </>
            )}

            {!!values.priceSelected && values.isInLaPaz && (
              <>
                <h2 className="text-center my-2"> 3. Agrega tus datos</h2>

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

                {!!marketForm?.chooseBrand && (
                  <FormikInputSelect
                    name="brand"
                    options={
                      Object.values(item?.availableBrands || {})?.map((b) => ({
                        label: b?.value,
                        value: b?.value
                      })) || []
                    }
                    label="Seleccionar una marca"
                  />
                )}
                {!!marketForm?.failDescription && (
                  <FormikInputTextarea
                    name="failDescription"
                    label="Describe la falla"
                  />
                )}
              </>
            )}

            {/* {marketForm?.imageId && <FormikInputFile name="imageID" />} */}

            <Modal
              title="Confirmar orden"
              openLabel="Ordenar"
              confirmLabel="Confirmar orden"
              openDisabled={
                !isValidPhoneNumber(values?.phone || '') ||
                !values.fullName ||
                !values.priceSelected
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
                      <p className="text-center mt-4">
                        Su orden a sido creada con éxito
                      </p>
                      <p className="font-normal text-xs text-center mt-2">
                        Orden numero:{' '}
                      </p>{' '}
                      <p className="text-center font-bold text-xl">
                        {orderCreated?.folio}
                      </p>
                      <p className="text-[8px] text-center italic ">
                        {orderCreated?.id}
                      </p>
                      <div className="flex w-full justify-around mt-4">
                        <Button
                          label={`Cancelar orden`}
                          onClick={() => {
                            //TODO: cancel order
                            //console.log('handleCancelOrder')
                          }}
                          disabled={true}
                          variant="ghost"
                          color="error"
                        />
                        <Button
                          linkComponent={Link}
                          href={`/my-rents/${orderCreated.id}`}
                          label={`Ver detalles`}
                          variant="outline-solid"
                          color="primary"
                        />
                      </div>
                    </>
                  )}
                  {shouldSentWhatsapp && (
                    <div>
                      <p>Te enviaremos un whatsapp para confirmar tu orden </p>
                    </div>
                  )}

                  {/* <p>{values.priceSelected}</p> */}
                  {!orderCreated && (
                    <div className="flex w-full justify-center mt-4">
                      <Button
                        // type="submit"
                        label={`Confirmar orden`}
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
          </form>
        )}
      </Formik>
    </div>
  )
}
