import { useField } from 'formik'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
const FormikInputTextarea = ({ label, helperText, rows = 4, ...props }: InputTextProps) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <div>
      <label className="grid">
        {label}
        <textarea className="input resize-none" {...props} {...field} rows={rows} />
        {helperText && !errorText && <span className={'text-helper'}>{helperText}</span>}
        {errorText && <span className={'text-helper text-error'}>{errorText}</span>}
      </label>
    </div>
  )
}

export default FormikInputTextarea
