import { useField } from 'formik'
export type FormikInputSelectProps = {
  label?: string
  name: string
  helperText?: string
  errorText?: string
  options: { label: string; value: string }[]
} & React.SelectHTMLAttributes<HTMLSelectElement>
const FormikInputSelect = ({
  label,
  helperText,
  errorText,
  options,
  ...props
}: FormikInputSelectProps) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className="grid">
        {label}
        <select {...field} {...props} className="input ">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

export default FormikInputSelect
