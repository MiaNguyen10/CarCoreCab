import { createContext } from 'react'
import { TPermissionContext } from './types'

const defaultBehaviour: TPermissionContext = {
    isAllowedTo: () => false,
  }

  const PermissionContext = createContext<TPermissionContext>(
    defaultBehaviour
  )

export default PermissionContext
