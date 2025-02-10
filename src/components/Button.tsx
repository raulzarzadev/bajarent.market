export type ButtonBaseProps = {
  label: string
  variant?: 'outline' | 'solid' | 'ghost'
  color?: 'primary' | 'secondary' | 'error'
  linkComponent?: React.ElementType
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type LinkButtonProps = ButtonBaseProps & {
  href: string
  linkComponent: React.ElementType
}

type RegularButtonProps = ButtonBaseProps & {
  linkComponent?: never
  href?: never
}

type ButtonProps = LinkButtonProps | RegularButtonProps

const Button = ({
  label,
  variant = 'solid',
  color = 'primary',
  linkComponent: LinkComponent,
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
    border-none
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
    text-red-500
    
  `
  }
  if (LinkComponent) {
    return (
      <LinkComponent
        {...props}
        className={`
    ${variants[variant]}
    ${colors[color]}
    font-semibold
    py-2
    px-4
    rounded
    disabled:cursor-not-allowed
    disabled:opacity-30
    
   
    transition-colors
    ${props.className}
    uppercase
    `}
        {...props}
      >
        {label}
      </LinkComponent>
    )
  }

  return (
    <button
      {...props}
      className={`
        ${variants[variant]}
        ${colors[color]}
        font-semibold
        py-2
        px-4
        rounded
        disabled:cursor-not-allowed
        disabled:opacity-30
      
        transition-colors

        ${props.className}
        uppercase
        `}
    >
      {label}
    </button>
  )
}

export default Button
