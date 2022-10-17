import { Button, DialogContent, DialogContentText, Stack } from '@mui/material'
import React from 'react'

export interface ConfirmDialogProps {
  handleSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void | any
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  desc: string
  btnClose: string
  btnSubmit: string
}

const ConfirmDialog = ({ handleClose, desc, btnClose, btnSubmit, handleSubmit }: ConfirmDialogProps) => {
  return (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" sx={{ fontSize: 14, fontWeight: 400, color: '#333333' }}>
          {desc}
        </DialogContentText>
      </DialogContent>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} marginTop={'6px'}>
        <Button onClick={handleClose} variant="outlined" size="small">
          {btnClose}
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="small">
          {btnSubmit}
        </Button>
      </Stack>
    </>
  )
}

export default ConfirmDialog

