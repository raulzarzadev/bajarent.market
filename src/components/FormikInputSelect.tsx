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
  const [field] = useField(props)
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
        {helperText && !errorText && <span className={'text-helper'}>{helperText}</span>}
        {errorText && <span className={'text-helper text-error'}>{errorText}</span>}
      </label>
    </div>
  )
}

export default FormikInputSelect
