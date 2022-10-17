import * as React from 'react'

import { IChildrenProps } from 'app/components/interfaces'
import ConfirmDialog, { ConfirmDialogProps } from 'app/components/Dialog/ConfirmDialog'
import FullScreenDialog from 'app/components/Dialog/FullScreenDialog'

const ConfirmationContext = React.createContext<(options: ConfirmationOptions) => Promise<void>>(Promise.reject)

export const useConfirmation = () => React.useContext(ConfirmationContext)

//catchOnCancel false to do nothing on cancel, true to call action on catch
export interface ConfirmationOptions {
  catchOnCancel?: boolean
}

export interface ConfirmationProviderProps extends ConfirmDialogProps, IChildrenProps {
  width: number
  height: number
  handleClose?: VoidFunction
}

const ConfirmationProvider = ({ btnClose, btnSubmit, desc, width, height, children }: ConfirmationProviderProps) => {
  const [confirmationState, setConfirmationState] = React.useState<ConfirmationOptions | null>(null)
  const awaitingPromiseRef = React.useRef<{
    resolve: () => void
    reject: () => void
  }>()

  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options)

    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const handleClose = () => {
    if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject()
    }

    setConfirmationState(null)
  }

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve()
    }

    setConfirmationState(null)
  }

  return (
    <>
      <ConfirmationContext.Provider value={openConfirmation}>{children}</ConfirmationContext.Provider>
      <FullScreenDialog open={Boolean(confirmationState)} width={width} height={height} handleClose={() => handleClose}>
        <ConfirmDialog
          desc={desc}
          btnClose={btnClose}
          btnSubmit={btnSubmit}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        ></ConfirmDialog>
      </FullScreenDialog>
    </>
  )
}

export default ConfirmationProvider

