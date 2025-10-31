import type React from 'react'

export type InputCheckboxProps = {
  id?: string
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  helperText?: string
  errorText?: string
  name: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputCheckbox = ({
  id,
  label,
  checked,
  onChange,
  helperText,
  errorText,
}: InputCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
      {helperText && !errorText && (
        <label htmlFor={id} className={'text-helper'}>
          {helperText}
        </label>
      )}
      {errorText && (
        <label htmlFor={id} className={'text-helper text-error'}>
          {errorText}
        </label>
      )}
    </div>
  )
}

export default InputCheckbox
