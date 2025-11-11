'use client'
import 'react-phone-number-input/style.css'
import type { E164Number } from 'libphonenumber-js'
import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'

const InputPhone = ({
  value,
  setValue,
  label = 'Phone number',
  helperText
}: {
  value: E164Number | undefined
  setValue: (value: E164Number | undefined) => void
  label?: string
  helperText?: string
}) => {
  const [_value, _setValue] = useState<E164Number | undefined>(value)
  const handleChange = (value: E164Number | undefined) => {
    _setValue(value)
    setValue(value)
  }
  return (
    <div>
      <PhoneInput
        defaultCountry="MX"
        placeholder={label}
        value={_value}
        onChange={handleChange}
        countries={['MX', 'US', 'CA', 'CO', 'PE', 'AR', 'CL', 'BR']}
        className="input"
      />
      {helperText && <div className="text-helper">{helperText}</div>}
    </div>
  )
}

export default InputPhone
