'use client'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth, onSendCode } from '@/firebase/auth'
import FormCode from './FormCode'

const CodeSignUp = () => {
  const [code, setCode] = useState('')
  const disabled = code?.length !== 6
  console.log({ code, disabled, codeLength: code?.length })
  useEffect(() => {
    // @ts-ignore

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log({ response })
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // console.log(response)
        // onSignInSubmit()
      }
    })
    console.log({ recaptchaVerifier: window?.recaptchaVerifier })
    // const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId)
  }, [])
  const handleSubmit = (code: string) => {
    console.log('Code:', code)
    onSendCode({ code })
  }

  return (
    <div>
      <FormCode onSubmit={({ code }) => handleSubmit(code)} />
    </div>
  )
}

export default CodeSignUp
