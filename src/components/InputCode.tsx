import OtpInput from 'react-otp-input'

export default function InputCode({
  value,
  setValue,
  codeLength = 6,
  ...props
}: {
  value: string
  setValue: (value: string) => void
  codeLength?: number
}) {
  return (
    <OtpInput
      value={value}
      onChange={setValue}
      numInputs={codeLength}
      renderSeparator={<span className="w-5"> </span>}
      renderInput={(props) => <input {...props} />}
      containerStyle={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '300px',
        margin: '16px auto',
      }}
      inputStyle={{
        width: '40px',
        height: '40px',
        fontSize: '20px',
        margin: '0 5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        textAlign: 'center',
      }}
      {...props}
    />
  )
}
