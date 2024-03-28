import { useField } from 'formik'
import InputText from './InputText'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const FormikInputText = ({ label, helperText, ...props }: InputTextProps) => {
  const [field, meta, helpers] = useField(props)
  return (
    <div>
      <InputText
        label={label}
        {...field}
        {...props}
        helperText={helperText}
        errorText={meta.touched && meta.error ? meta.error : undefined}
      />
    </div>
  )
}

export default FormikInputText
