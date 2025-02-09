import { v4 as uidGenerator } from 'uuid'
export const createUUID = (props?: Props): string =>
  uidGenerator()
    .slice(0, props?.length || 99999)
    .replace(/-/g, '')
export type Props = { length?: number }
