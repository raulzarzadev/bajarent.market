import type BaseType from './BaseType'

export type UserBase = {
  firstName?: string
  lastName?: string
  phone: string
  email?: string
  image?: string
  canCreateStore?: boolean
}

type UserType = BaseType & UserBase

export default UserType
