import getInitials from '@/utils/getInitials'
import Image from 'next/image'

const Avatar = ({
  src,
  label,
  size = 'md',
  className
}: {
  src?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const sizes = {
    sm: {
      width: 32,
      height: 32,
      textSize: 8,
      padding: 1
    },
    md: {
      width: 48,
      height: 48,
      textSize: 16,
      padding: 4
    },
    lg: {
      width: 96,
      height: 96,
      textSize: 24,
      padding: 4
    }
  }
  const userImage = src

  return (
    <div
      style={{
        width: sizes[size].width,
        height: sizes[size].height,
        fontSize: sizes[size].textSize,
        padding: sizes[size].padding,
        borderWidth: sizes[size].padding
      }}
      className={`${className}   bg-white rounded-full  border-white shadow-lg flex items-center justify-center `}
    >
      {userImage ? (
        <img
          src={userImage}
          alt={label || 'Avatar'}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {getInitials(label || '')}
        </div>
      )}
    </div>
  )
  return (
    <div className={`${className} grow-0 shrink-0`}>
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
