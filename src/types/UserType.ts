import type BaseType from './BaseType'

export type UserBase = {
  fullName?: string
  name?: string
  phone: string
  email?: string
  image?: string
  canCreateStore?: boolean
}

type UserType = BaseType & UserBase

export default UserType
