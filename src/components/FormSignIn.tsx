'use client'
import { RecaptchaVerifier } from 'firebase/auth'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useAuth } from '@/context/authContext'
import { auth, onSendCode, sendSignInPhone } from '@/firebase/auth'
import Button from './Button'
import FormCode from './FormCode'
import FormikInputPhone from './FormikInputPhone'
import FormikInputText from './FormikInputText'
import Icon from './Icon'
import catchError from '@/libs/catchError'
import { ServiceUsers } from '@/firebase/ServiceUser'

type UserFlow = 'phone-check' | 'new-user' | 'code-verification'

const FormSignIn = ({ name, phone }: { name: string; phone: string }) => {
  const [currentFlow, setCurrentFlow] = useState<UserFlow>('phone-check')
  const [userPhone, setUserPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    try {
      // @ts-expect-error
      if (!window.recaptchaVerifier) {
        // @ts-expect-error
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'sign-in-button',
          {
            size: 'invisible',
            callback: (response: any) => {
              console.log('reCAPTCHA solved:', response)
            },
            'expired-callback': () => {
              setError('reCAPTCHA expiró. Por favor, inténtalo de nuevo.')
            }
          }
        )
      }
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error)
      setError('Error al inicializar el sistema de verificación.')
    }
  }, [])

  useEffect(() => {
    if (user && window.location.pathname === '/login') {
      window.location.href = '/profile'
    }
  }, [user])

  // Función para verificar si un usuario existe
  const checkUserExists = async (phone: string): Promise<boolean> => {
    const [error, data] = await catchError(ServiceUsers.userExists({ phone }))
    if (error) {
      console.error('Error checking user existence:', error)
      return false
    }
    return data ? true : false
  }

  // Función para manejar la verificación inicial del teléfono
  const handlePhoneCheck = async (values: { phone: string }) => {
    setUserPhone(values.phone)
    setError(null)
    setIsLoading(true)

    try {
      // Primero verificamos si el usuario existe
      const userExists = await checkUserExists(values.phone)

      if (userExists) {
        // Usuario existe: enviar código directamente
        await sendSignInPhone({ phone: values.phone })
        setCurrentFlow('code-verification')
        setSuccess(`Código enviado a ${values.phone}`)
      } else {
        // Usuario no existe: mostrar formulario de registro
        setCurrentFlow('new-user')
        setSuccess(
          `Número nuevo: ${values.phone}. Completa tus datos para crear la cuenta.`
        )
      }

      setIsLoading(false)
    } catch (err: any) {
      setIsLoading(false)
      console.error('Error in phone check:', err)

      // Manejo de errores de Firebase
      switch (err.code) {
        case 'auth/too-many-requests':
          setError(
            'Demasiados intentos. Espera un momento antes de volver a intentar.'
          )
          break
        case 'auth/invalid-app-credential':
          setError('Error de configuración. Por favor, contacta soporte.')
          break
        case 'auth/invalid-phone-number':
          setError('Número de teléfono inválido. Verifica el formato.')
          break
        default:
          setError('Error al verificar el número. Inténtalo de nuevo.')
      }
      setCurrentFlow('phone-check')
    }
  }

  const handlePhoneSubmit = async (values: { name: string; phone: string }) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await sendSignInPhone({ phone: values.phone })
      setSuccess(`Código enviado a ${values.phone}`)

      setTimeout(() => {
        setIsLoading(false)
        setCurrentFlow('code-verification')
      }, 1000)
    } catch (err: any) {
      setIsLoading(false)
      console.error('Error sending SMS:', err)

      // Manejo de errores específicos de Firebase
      switch (err.code) {
        case 'auth/invalid-phone-number':
          setError('Número de teléfono inválido. Verifica el formato.')
          break
        case 'auth/too-many-requests':
          setError(
            'Demasiados intentos. Espera un momento antes de volver a intentar.'
          )
          break
        case 'auth/invalid-app-credential':
          setError('Error de configuración. Por favor, contacta soporte.')
          break
        default:
          setError('Error al enviar el código. Inténtalo de nuevo.')
      }
    }
  }

  const handleCodeSubmit = (code: string | null) => {
    setError(null)
    setSuccess(null)

    if (code === null) {
      // Reenviar código
      setCurrentFlow('phone-check')
      setError('')
      return
    }

    if (code) {
      try {
        onSendCode({ code })
      } catch (err: any) {
        console.error('Error verifying code:', err)
        setError('Código incorrecto. Verifica e inténtalo de nuevo.')
      }
    } else {
      setCurrentFlow('phone-check')
      setError(null)
      setSuccess(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Mensajes de estado */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <Icon icon="error" size={20} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <Icon
            icon="checkCircle"
            size={20}
            className="text-green-500 flex-shrink-0"
          />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Paso 1: Verificar número de teléfono */}
      {currentFlow === 'phone-check' && (
        <div>
          <Formik initialValues={{ phone: phone }} onSubmit={handlePhoneCheck}>
            {({ values, handleSubmit }) => (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      ¿Ya tienes cuenta?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ingresa tu número para verificar si ya estás registrado
                    </p>
                  </div>

                  <FormikInputPhone
                    name="phone"
                    label="Número de teléfono"
                    placeholder="+52 xxx xxx xxxx"
                  />
                </div>

                <Button
                  type="submit"
                  label={isLoading ? 'Verificando...' : 'Verificar número'}
                  variant="solid"
                  disabled={!isValidPhoneNumber(values.phone) || isLoading}
                  onClick={() => handleSubmit()}
                />
              </div>
            )}
          </Formik>
        </div>
      )}

      {/* Paso 2: Usuario nuevo - Pedir nombre y apellido para registro */}
      {currentFlow === 'new-user' && (
        <div>
          <div className="text-center mb-6">
            {/* <Icon
              icon="profileAdd"
              size={48}
              className="text-blue-500 mx-auto mb-4"
            /> */}
            {/* <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¡Bienvenido!
            </h3> */}
            {/* <p className="text-gray-600 text-sm">
              Es tu primera vez. Necesitamos algunos datos para crear tu cuenta.
            </p> */}
          </div>

          <Formik
            initialValues={{ firstName: '', lastName: '', phone: userPhone }}
            onSubmit={(values) => {
              // Combinamos nombre y apellido para mantener compatibilidad
              const fullName =
                `${values.firstName.trim()} ${values.lastName.trim()}`.trim()
              handlePhoneSubmit({ name: fullName, phone: values.phone })
            }}
          >
            {({ values, handleSubmit }) => (
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormikInputText
                    name="firstName"
                    label="Nombre"
                    placeholder="Tu nombre"
                  />

                  <FormikInputText
                    name="lastName"
                    label="Apellido"
                    placeholder="Tu apellido"
                  />

                  <FormikInputPhone
                    name="phone"
                    label="Número de teléfono"
                    placeholder="+52 xxx xxx xxxx"
                    disabled
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    label={
                      isLoading
                        ? 'Creando cuenta...'
                        : 'Crear cuenta y enviar código'
                    }
                    variant="solid"
                    disabled={
                      !values.firstName.trim() ||
                      !values.lastName.trim() ||
                      !isValidPhoneNumber(values.phone) ||
                      isLoading
                    }
                    onClick={() => handleSubmit()}
                  />

                  <Button
                    type="button"
                    label="Usar otro número"
                    variant="ghost"
                    disabled={isLoading}
                    onClick={() => {
                      setCurrentFlow('phone-check')
                      setError(null)
                      setSuccess(null)
                    }}
                  />
                </div>
              </div>
            )}
          </Formik>
        </div>
      )}

      {/* Paso 3: Verificación de código */}
      {currentFlow === 'code-verification' && (
        <div>
          <div className="text-center mb-6">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icon icon="message" size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verifica tu número
            </h3>
            <p className="text-sm text-gray-600">
              Ingresa el código de 6 dígitos que enviamos por SMS
            </p>
          </div>

          <FormCode onSubmit={handleCodeSubmit} />

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setCurrentFlow('phone-check')
                setError(null)
                setSuccess(null)
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              ← Cambiar número de teléfono
            </button>
          </div>
        </div>
      )}

      {/* reCAPTCHA container - oculto */}
      <div id="sign-in-button" className="hidden" />
    </div>
  )
}

export default FormSignIn
