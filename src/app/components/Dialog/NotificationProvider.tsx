import * as React from 'react'

import FullScreenDialog from 'app/components/Dialog/FullScreenDialog'
import NotifyDialog, { NotifyDialogProps } from 'app/components/Dialog/NotifyDialog'
import { IChildrenProps } from 'app/components/interfaces'

const NotificationContext = React.createContext<(options: NotificationOptions) => Promise<void>>(Promise.reject)

export const useNotification = () => React.useContext(NotificationContext)

export interface NotificationProviderProps extends NotifyDialogProps, IChildrenProps {
  width: number
  height: number
  handleClose?: VoidFunction
}

const NotificationProvider = ({ btnText, desc, width, height, children }: NotificationProviderProps) => {
  const [notificationState, setNotificationState] = React.useState<boolean>(false)
  const awaitingPromiseRef = React.useRef<{
    resolve: () => void
    reject: () => void
  }>()

  const openNotification = () => {
    setNotificationState(true)

    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve()
    }
    setNotificationState(false)
  }

  return (
    <>
      <NotificationContext.Provider value={openNotification}>{children}</NotificationContext.Provider>
      <FullScreenDialog open={notificationState} width={width} height={height} handleClose={() => handleClose}>
        <NotifyDialog desc={desc} btnText={btnText} handleClose={handleClose}></NotifyDialog>
      </FullScreenDialog>
    </>
  )
}

export default NotificationProvider

