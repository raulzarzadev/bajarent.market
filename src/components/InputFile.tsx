const InputFile = ({
  label = 'Subir archivo',
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
}) => {
  return (
    <div>
      <label>
        {label}
        <input type="file" accept="image/png, image/jpeg" {...props} />
      </label>
    </div>
  )
}

export default InputFile
