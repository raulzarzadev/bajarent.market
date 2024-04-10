export type ButtonProps = {
  label: string
  variant?: 'outline' | 'solid' | 'ghost'
  color?: 'primary' | 'secondary' | 'error'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  label,
  variant = 'solid',
  color = 'primary',
  ...props
}: ButtonProps) => {
  const variants = {
    outline: `
    border
    border-blue-500
    text-blue-500
    bg-transparent
    hover:bg-blue-500
    hover:text-white
    
  `,
    solid: `
    bg-blue-500
    hover:bg-blue-700
    text-white
    border
    border-blue-500
  `,
    ghost: `
    bg-transparent
    text-blue-500
    hover:bg-blue-500
    hover:text-white
    border 
    border-blue-500
  `
  }

  const colors = {
    primary: `
    bg-blue-500
    hover:bg-blue-700
    border 
    border-blue-500
  `,
    secondary: `
    bg-gray-300
    hover:bg-gray-400
    border
    border-gray-300
  `,
    error: `
    bg-red-500
    hover:bg-red-700
    border
    border-red-500
    
  `
  }

  return (
    <div>
      <button
        {...props}
        className={`
        ${variants[variant]}
        ${colors[color]}
        font-semibold
        py-2
        px-4
        rounded
        disabled:bg-gray-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${props.className}
        uppercase
        `}
      >
        {label}
      </button>
    </div>
  )
}

export default Button
