import { useField } from 'formik'
import InputFile from './InputFile'
import { usersCRUD } from '@/firebase/auth'
export type InputTextProps = {
  label?: string
  name: string
  helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>
const FormikInputFile = ({ label, helperText, ...props }: InputTextProps) => {
  const [field, meta, helpers] = useField(props)

  return (
    <InputFile
      label={label}
      {...props}
      {...field}
      onChange={(e) => {
        const file = e.currentTarget.files?.[0]
        if (file)
          usersCRUD.uploadFile(file, props.name || 'file', (progress, url) => {
            console.log(progress)
            console.log(url)
          })
      }}
    />
  )
}

export default FormikInputFile
