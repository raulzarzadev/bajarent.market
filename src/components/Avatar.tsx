import Image from 'next/image'

const Avatar = ({
  src,
  label,
  size = 'md',
  className
}: {
  src: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const sizes = {
    sm: 34,
    md: 48,
    lg: 96
  }
  return (
    <div className={`${className} flex-grow-0 flex-shrink-0`}>
      {src ? (
        <Image
          src={src || '/avatar.png'}
          alt={`avatar-${label}`}
          width={sizes[size]}
          height={sizes[size]}
          className="rounded-full shadow-md shadow-slate-600 "
        />
      ) : (
        <div
          style={{
            widows: sizes[size],
            height: sizes[size]
          }}
          className="bg-gray-300 rounded-full flex justify-center items-center font-bold text-lg uppercase shadow-md shadow-slate-600 aspect-square"
        >
          {label?.substring(0, 2)}
        </div>
      )}
    </div>
  )
}

export default Avatar
