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

const FormSignIn = ({ name, phone }: { name: string; phone: string }) => {
  const [haveACode, setHaveACode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // @ts-expect-error
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log({ response })
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // console.log(response)
        // onSignInSubmit()
      }
    })
  }, [])

  useEffect(() => {
    if (user && window.location.pathname === '/login') {
      window.location.href = '/profile'
    }
  }, [user])

  return (
    <div>
      {!haveACode && (
        <Formik
          initialValues={{ name: name, phone: phone }}
          onSubmit={async (values) => {
            setIsLoading(true)
            await sendSignInPhone({ phone: values.phone })

            setTimeout(() => {
              setIsLoading(false)
              setHaveACode(true)
            }, 400)
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <div className="grid gap-2">
                <FormikInputText name="name" label="Name" />
                <FormikInputPhone name="phone" label="Phone" />

                <div className="flex justify-end">
                  <Button
                    disabled={!isValidPhoneNumber(values.phone) || isLoading}
                    type="submit"
                    label="Enviar"
                    className=""
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            )
          }}
        </Formik>
      )}

      <div id="sign-in-button" className=" h-20 mx-auto" />
      {haveACode && (
        <FormCode
          onSubmit={({ code }) => {
            if (code) {
              onSendCode({ code })
            } else {
              setHaveACode(false)
            }
          }}
        />
      )}
    </div>
  )
}

export default FormSignIn
