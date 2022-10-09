import { Button, DialogContent, DialogContentText, Stack, styled } from '@mui/material'
import React from 'react'

const ButtonDialogStyled = styled(Button)({
  maxWidth: 56,
  maxHeight: 26,
  borderRadius: 2,
})

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
        <ButtonDialogStyled onClick={handleClose} variant="outlined" color="primary" size="small">
          {btnClose}
        </ButtonDialogStyled>
        <ButtonDialogStyled onClick={handleSubmit} variant="contained" color="primary" size="small">
          {btnSubmit}
        </ButtonDialogStyled>
      </Stack>
    </>
  )
}

export default ConfirmDialog

