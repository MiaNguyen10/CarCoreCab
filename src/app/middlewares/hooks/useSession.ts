/* eslint-disable no-console */
import { MutableRefObject, useRef } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'
import Container from 'typedi'

import { useNotification } from 'app/components/Dialog/NotificationProvider'
import { ConfigService } from 'app/config/ConfigService'
import pages from 'app/config/pages'
import { extendSession, logout } from 'cores/reducers/authentication'
import { selectState } from 'cores/reducers/user'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { VoidFunction } from 'cores/utils/commonType'

export function useSession(beforeLogout: VoidFunction = () => void 0) {
  const config = Container.get(ConfigService).session
  const sessionTimeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const notification = useNotification()
  const token = useAppSelector(selectState)

  const onIdle = () => {
    if (token.token) {
      dispatch(extendSession())
      sessionTimeoutRef.current = setTimeout(onTimeout, config.expiredTime)
    }
  }

  const onAction = () => {
    if (token.token) {
      clearTimeout(sessionTimeoutRef.current)
    }
  }

  const onTimeout = async () => {
    if (token.token) {
      await Promise.resolve(beforeLogout())
      clearTimeout(sessionTimeoutRef.current)
      dispatch(logout())
      notification({}).then(() => {
        navigate(pages.loginPath)
      })
    }
  }

  useIdleTimer({ onIdle, onAction, timeout: config.idleTime })
}

