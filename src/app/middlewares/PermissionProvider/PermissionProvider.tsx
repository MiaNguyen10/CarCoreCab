import React from 'react'
import { TPermission } from './types'
import PermissionContext from './PermissionContext'

interface IPermissionProviderProps  {
    children: JSX.Element
  }

const PermissionProvider: React.FunctionComponent<IPermissionProviderProps> = ({ children }) => {

    const isAllowedTo = (userTier: TPermission, permission: TPermission[]) =>
        permission.includes(userTier)

    return (
        <PermissionContext.Provider value={{ isAllowedTo }}>
            {children}
        </PermissionContext.Provider>
    )
}

export default PermissionProvider
