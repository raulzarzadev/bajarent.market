import { useField } from 'formik'
export type InputTextProps = {
  label?: string
  name: string
} & React.InputHTMLAttributes<HTMLInputElement>
const InputText = ({ label, ...props }: InputTextProps) => {
  const [field, meta, helpers] = useField(props)
  return (
    <div>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default InputText
