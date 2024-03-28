'use client'
import { Formik } from 'formik'
import { Item } from './ItemLabel'
import { Shop } from '@/app/[shop]/page'
import Button from './Button'
import FormikInputText from './FormikInputText'
import ItemPrices from './ItemPrices'
import { PriceType } from '@/types/PriceType'
import OrderType from '@/types/OrderType'

export default function FormRentNow({
  item,
  shop,
  prices = []
}: //prices
{
  item: Item
  shop: Shop
  prices: PriceType[]
}) {
  const initialValues: Pick<
    OrderType,
    'address' | 'storeId' | 'references' | 'phone'
  > & { categoryId: string; priceSelected: string } = {
    storeId: shop.id,
    categoryId: item.id,
    address: '',
    references: '',
    phone: '',
    priceSelected: ''
  }
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          setValues,
          values
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="grid gap-2 mb-16">
            <ItemPrices
              itemId={item.id}
              prices={prices}
              onPrice={(priceId) => {
                setValues({ ...values, priceSelected: priceId })
              }}
            />
            <FormikInputText name="name" label="Nombre" />
            <FormikInputText name="phone" label="Teléfono" />
            <FormikInputText
              name="address"
              label="Dirección"
              helperText="Calle, entre calles y numero"
            />
            <FormikInputText name="references" label="References" />
            <Button type="submit" label="Rentar" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  )
}
