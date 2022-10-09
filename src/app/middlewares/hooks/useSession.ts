import { useRef } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'

import Container from 'typedi'

import { useTimeout } from 'app/middlewares/hooks/useTimeout'
import pages from 'app/config/pages'
import { ConfigService } from 'app/config/ConfigService'

import { VoidFunction } from 'cores/utils/commonType'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { extendSession, logout, selectState } from 'cores/reducers/authentication'

export function useSession(beforeLogout: VoidFunction = () => void 0) {
  const config = Container.get(ConfigService).session
  const currentSession = useAppSelector(selectState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isActiveRef = useRef<boolean>(true)

  const onIdle = () => {
    isActiveRef.current = false
  }

  const onAction = () => {
    isActiveRef.current = true
  }

  const onTimeout = () => {
    if (isActiveRef.current) {
      dispatch(extendSession())

      timeout.reset(currentSession.expire * 1000)
    } else {
      beforeLogout()

      dispatch(logout())
      navigate(pages.loginPath)
    }
  }

  useIdleTimer({ onIdle, onAction, timeout: config.idleTime })

  const timeout = useTimeout(currentSession.expire * 1000, onTimeout)
  timeout.start()
}

