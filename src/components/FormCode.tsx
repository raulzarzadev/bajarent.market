import { Formik } from 'formik'
import Button from './Button'
import FormikInputCode from './FormikInputCode'

const FormCode = ({
  disabled,
  onSubmit
}: {
  disabled?: boolean
  onSubmit: ({ code }: { code: string | null }) => any
}) => {
  return (
    <div>
      <Formik
        initialValues={{ code: '' }}
        onSubmit={(values) => {
          onSubmit(values)
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <FormikInputCode name="code" />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  label="Enviar de nuevo"
                  variant="outline-solid"
                  onClick={() => onSubmit({ code: null })}
                />
                <Button
                  disabled={disabled || values?.code?.length !== 6}
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
