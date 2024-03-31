'use client'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { E164Number } from 'libphonenumber-js'

const InputPhone = ({
  value,
  setValue,
  label = 'Phone number'
}: {
  value: E164Number | undefined
  setValue: (value: E164Number | undefined) => void
  label?: string
}) => {
  const [_value, _setValue] = useState<E164Number | undefined>(value)
  const handleChange = (value: E164Number | undefined) => {
    _setValue(value)
    setValue(value)
  }
  return (
    <PhoneInput
      defaultCountry="MX"
      placeholder={label}
      value={_value}
      onChange={handleChange}
      countries={['MX', 'US', 'CA', 'CO', 'PE', 'AR', 'CL', 'BR']}
    />
  )
}

export default InputPhone
