import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PermissionContext from './PermissionContext'
import { TPermission } from './types'
import { AccessDenied } from 'app/pages'
import { selectState } from 'cores/reducers/authentication'

interface IRestrictedRoutesProps {
    permission: TPermission[]
    children?: JSX.Element
}

const RestrictedPermission: React.FunctionComponent<IRestrictedRoutesProps> = ({ permission, children }) => {
    const { isAllowedTo } = useContext(PermissionContext)
    const currentState = useSelector(selectState)

    if(isAllowedTo(currentState.teir as TPermission, permission)) {
        if(children) {
            return <>{children}</>
        }

        return <Outlet />
    }

    return children ? null : <AccessDenied />
}

export default RestrictedPermission
