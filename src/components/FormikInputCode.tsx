import { useField } from 'formik'
import InputCode from './InputCode'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const FormikInputCode = ({ label, helperText, ...props }: InputTextProps) => {
  const [field, _, helpers] = useField(props)

  return <InputCode value={field.value} setValue={helpers.setValue} codeLength={6} />
}

export default FormikInputCode
