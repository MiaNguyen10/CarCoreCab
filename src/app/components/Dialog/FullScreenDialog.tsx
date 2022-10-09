import * as React from 'react'

import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/system'
import { Box } from '@mui/material'

import { CenterPage } from 'app/components/Page'
import { IChildrenProps } from 'app/components/interfaces'

export interface IFullScreenDialog {
  open: boolean
  width: number
  height: number
  handleClose?: VoidFunction
}

const DialogBox = styled(Box)({
  backgroundColor: 'white',
  marginTop: 285,
  textAlign: 'center',
  border: '1px solid #BBBBBB',
})

const FullScreenDialog = ({ open, width, height, handleClose, children }: IFullScreenDialog & IChildrenProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: 'rgba(199, 208, 217)',
        },
      }}
    >
      <CenterPage>
        <DialogBox sx={{ width, height }}>{children}</DialogBox>
      </CenterPage>
    </Dialog>
  )
}

export default FullScreenDialog

