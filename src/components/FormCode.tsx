import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import Button from './Button'
import FormikInputCode from './FormikInputCode'

const FormCode = ({
  disabled,
  onSubmit
}: {
  disabled?: boolean
  onSubmit: (code: string | null) => any
}) => {
  const [countdown, setCountdown] = useState(60) // 60 segundos = 1 minuto
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Iniciar el contador cuando el componente se monta
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Limpiar el interval cuando el componente se desmonta
    return () => clearInterval(timer)
  }, [])

  const handleResend = () => {
    onSubmit(null)
    setCountdown(60)
    setCanResend(false)

    // Reiniciar el contador
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  // Formatear el tiempo en MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  return (
    <div>
      <Formik
        initialValues={{ code: '' }}
        onSubmit={(values) => {
          onSubmit(values.code)
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <FormikInputCode name="code" />

              <div className="flex justify-between gap-2 ">
                <Button
                  type="submit"
                  label={canResend ? 'Enviar de nuevo' : `Reenviar en ${formatTime(countdown)}`}
                  variant="ghost"
                  onClick={handleResend}
                  disabled={!canResend}
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
