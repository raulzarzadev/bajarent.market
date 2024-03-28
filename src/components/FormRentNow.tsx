'use client'
import { Formik } from 'formik'
import InputText from './InputText'

export default function FormRentNow({ item, shop }) {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
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
          <form onSubmit={handleSubmit}>
            <InputText name="name" placeholder="Buenos dias" />
            <button type="submit" disabled={false}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      {/* <form>
        <div className="grid gap-2">
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="teléfono" />
          <input type="text" placeholder="dirección" />
          <input type="text" placeholder="referecias de la casa" />
          <input type="text" placeholder="ubicación" />
          <input type="text" placeholder="Fecha " />
        </div>
        <button>Ordenar</button>
      </form> */}
    </div>
  )
}
