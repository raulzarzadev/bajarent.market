import { useField } from 'formik'
import InputPhone from './InputPhone'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const FormikInputPhone = ({ label, helperText, ...props }: InputTextProps) => {
  const [field, meta, helpers] = useField(props)
  return (
    <div>
      <InputPhone
        label={label}
        value={field.value}
        setValue={helpers.setValue}
        helperText={helperText}
        {...props}
      />
    </div>
  )
}

export default FormikInputPhone
