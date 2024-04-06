export type ButtonProps = {
  label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <div>
      <button
        {...props}
        className={`
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        disabled:bg-gray-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        
        ${props.className}`}
      >
        {label}
      </button>
    </div>
  )
}

export default Button
