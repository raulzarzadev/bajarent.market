import { Formik } from 'formik'
import Button from './Button'
import FormikInputCode from './FormikInputCode'
import { useEffect } from 'react'

const FormCode = ({
  disabled,
  onSubmit
}: {
  disabled?: boolean
  onSubmit: ({ code }: { code: string | null }) => any
}) => {
  useEffect(() => {}, [])
  return (
    <div>
      <Formik
        initialValues={{ code: '' }}
        onSubmit={(values) => {
          onSubmit(values)
        }}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <FormikInputCode name="code" />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  label="Enviar de nuevo"
                  variant="outline"
                  onClick={() => onSubmit({ code: null })}
                />
                <Button
                  disabled={disabled}
                  type="submit"
                  label="Enviar"
                  onClick={() => handleSubmit()}
                />
              </div>
            </>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormCode
