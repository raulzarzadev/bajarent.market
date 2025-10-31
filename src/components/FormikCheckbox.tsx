import { useField } from 'formik'
import InputCheckbox, { type InputCheckboxProps } from './InputCheckbox'

const FormikCheckbox = ({ label, helperText, name, ...props }: InputCheckboxProps) => {
  const [field, meta, helpers] = useField({ ...props, name })

  return (
    <div>
      <InputCheckbox
        label={label}
        checked={field.value}
        {...field}
        {...props}
        helperText={helperText}
        errorText={meta.touched && meta.error ? meta.error : undefined}
        onChange={(checked) => {
          helpers.setValue(checked)
        }}
      />
    </div>
  )
}

export default FormikCheckbox
