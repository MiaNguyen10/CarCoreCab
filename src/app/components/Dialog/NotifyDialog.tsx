import { Button, DialogContent, DialogContentText, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React from 'react'

export interface NotifyDialogProps {
  desc?: string
  btnText?: string
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const NotifyDialog = ({ handleClose, desc, btnText }: NotifyDialogProps) => {
  const { t } = useTranslation()

  return (
    <>
      <DialogContent>
        <DialogContentText id="popup-full-screen-dialog" sx={{ fontSize: 14, fontWeight: 400, color: '#333333' }}>
          {desc || t('DIALOG_SAVE_SUCCESSFULLY')}
        </DialogContentText>
      </DialogContent>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Button onClick={handleClose} variant="contained" size="small">
          {btnText || t('DIALOG_OK')}
        </Button>
      </Stack>
    </>
  )
}

export default NotifyDialog

