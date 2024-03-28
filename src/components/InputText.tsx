import { useField } from 'formik'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
  errorText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const InputText = ({
  label,
  helperText,
  errorText,
  ...props
}: InputTextProps) => {
  return (
    <div>
      <label className="grid">
        {label}
        <input
          className="border border-gray-500 border-opacity-50 rounded-md p-1 "
          {...props}
        />
        {helperText && !errorText && (
          <label className={'helperText'}>{helperText}</label>
        )}
        {errorText && (
          <label className={'helperText text-error'}>{errorText}</label>
        )}
      </label>
    </div>
  )
}

export default InputText
