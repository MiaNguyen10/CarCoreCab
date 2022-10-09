import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'
import pages from 'app/config/pages'
import { selectState } from 'cores/reducers/authentication'
import { ERequiredAction } from 'cores/reducers/tokenDecoder'

const ProtectedRoutes = () => {
  const currentState = useSelector(selectState)
  const location = useLocation()

  if (!currentState.sessionId) {
    return <Navigate to={`${pages.loginPath}`} state={{ from: location }} replace />
  } else if (currentState.requireAction === ERequiredAction.CHANGE_PASSWORD) {
    return <Navigate to={`${pages.resetPassword}`} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes

