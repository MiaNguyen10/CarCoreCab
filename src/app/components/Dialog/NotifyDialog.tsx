import { Button, DialogContent, DialogContentText, Stack, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React from 'react'

const ButtonDialogStyled = styled(Button)({
  maxWidth: 56,
  maxHeight: 26,
  borderRadius: 2,
})

interface SuccessDialogProps {
  desc?: string
  btnText?: string
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const NotifyDialog = ({ handleClose, desc, btnText }: SuccessDialogProps) => {
  const { t } = useTranslation()

  return (
    <>
      <DialogContent>
        <DialogContentText id="popup-full-screen-dialog" sx={{ fontSize: 14, fontWeight: 400, color: '#333333' }}>
          {desc || t('DIALOG_SAVE_SUCCESSFULLY')}
        </DialogContentText>
      </DialogContent>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <ButtonDialogStyled onClick={handleClose} variant="contained" color="primary" size="small">
          {btnText || t('DIALOG_OK')}
        </ButtonDialogStyled>
      </Stack>
    </>
  )
}

export default NotifyDialog

