'use client'
import { Formik } from 'formik'
import FormikInputPhone from './FormikInputPhone'
import FormikInputText from './FormikInputText'
import Button from './Button'
import { auth, onSendCode, sendSignInPhone } from '@/firebase/auth'
import { useEffect, useState } from 'react'
import FormCode from './FormCode'
import { RecaptchaVerifier } from 'firebase/auth'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useAuth } from '@/context/authContext'

const FormSignIn = ({ name, phone }: { name: string; phone: string }) => {
  const [haveACode, setHaveACode] = useState(false)
  const [recaptchaValid, setRecaptchaValid] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // @ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      callback: (response: any) => {
        console.log({ response })
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
          onSubmit={(values) => {
            sendSignInPhone({ phone: values.phone })
            setTimeout(() => {
              setHaveACode(true)
            }, 1000)
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <div className="grid gap-2">
                <FormikInputText name="name" label="Name" />
                <FormikInputPhone name="phone" label="Phone" />

                <div className="flex justify-end">
                  <Button
                    disabled={!isValidPhoneNumber(values.phone)}
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
      <div id="sign-in-button" className=" h-20 " />
    </div>
  )
}

export default FormSignIn
