import { useField } from 'formik'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
  errorText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const InputText = ({ label, helperText, errorText, ...props }: InputTextProps) => {
  return (
    <div>
      <label className="grid">
        {label}
        <input className="input " {...props} />
        {helperText && !errorText && <label className={'text-helper'}>{helperText}</label>}
        {errorText && <label className={'text-helper text-error'}>{errorText}</label>}
      </label>
    </div>
  )
}

export default InputText
