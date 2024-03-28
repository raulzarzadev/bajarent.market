'use client'
import { Formik } from 'formik'
import InputText from './InputText'
import { Item } from './ItemLabel'
import { Shop } from '@/app/[shop]/page'
import Button from './Button'

export default function FormRentNow({
  item,
  shop
}: {
  item: Item
  shop: Shop
}) {
  return (
    <div>
      <Formik
        initialValues={{
          storeId: shop.id,
          itemId: item.id
        }}
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
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="grid gap-2 mb-16">
            <InputText name="name" label="Nombre" />
            <InputText name="phone" label="Teléfono" />
            <InputText
              name="address"
              label="Dirección"
              helperText="Calle, entre calles y numero"
            />
            <InputText name="references" label="References" />
            <Button type="submit" label="Rentar" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  )
}
