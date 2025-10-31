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
        {helperText && !errorText && <span className={'text-helper'}>{helperText}</span>}
        {errorText && <span className={'text-helper text-error'}>{errorText}</span>}
      </label>
    </div>
  )
}

export default InputText
