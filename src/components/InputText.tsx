import { useField } from 'formik'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const InputText = ({ label, helperText, ...props }: InputTextProps) => {
  const [field, meta, helpers] = useField(props)
  return (
    <div>
      <label className="grid">
        {label}
        <input
          className="border border-gray-500 border-opacity-50 rounded-md p-1 "
          {...field}
          {...props}
        />
        <label className={'helperText'}>{helperText}</label>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default InputText
