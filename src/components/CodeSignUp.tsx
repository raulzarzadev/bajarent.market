'use client'
import { useEffect, useState } from 'react'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth, onSendCode } from '@/firebase/auth'
import FormCode from './FormCode'

const CodeSignUp = () => {
  useEffect(() => {
    // @ts-ignore
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
  const handleSubmit = (code: string | null) => {
    if (!code) {
      console.error('no code')
      return
    }
    onSendCode({ code })
  }

  return <FormCode onSubmit={({ code }) => handleSubmit(code)} />
}

export default CodeSignUp
