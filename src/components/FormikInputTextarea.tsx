import { useField } from 'formik'
import InputText from './InputText'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
const FormikInputTextarea = ({
  label,
  helperText,
  rows = 4,
  ...props
}: InputTextProps) => {
  const [field, meta, helpers] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <div>
      <label className="grid">
        {label}
        <textarea
          className="input resize-none"
          {...props}
          {...field}
          rows={rows}
        />
        {helperText && !errorText && (
          <label className={'text-helper'}>{helperText}</label>
        )}
        {errorText && (
          <label className={'text-helper text-error'}>{errorText}</label>
        )}
      </label>
    </div>
  )
}

export default FormikInputTextarea
