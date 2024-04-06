'use client'
import { useState } from 'react'
import InputCode from './InputCode'
import Button from './Button'

const CodeSignUp = () => {
  const [code, setCode] = useState('')
  return (
    <div>
      <InputCode value={code} setValue={setCode} />
      <Button
        label="Enviar"
        onClick={() => {
          console.log('Code:', code)
        }}
      ></Button>
    </div>
  )
}

export default CodeSignUp
