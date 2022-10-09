import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Stack } from '@mui/material'
import { styled } from '@mui/system'

import { FullScreenDialog } from 'app/components'
import DialogHeader from 'app/components/Typo/DialogHeder'
import { IConfirmDialog, ISuccessDialog } from 'app/pages/Profile/interfaces'

const StyledButton = styled(Button)({
  padding: 0,
  height: 26,
  width: 56,
})

const StyledStack = styled(Stack)({
  marginTop: 30,
})

export const ConfirmDialog = ({ isOpenDialog, setIsOpenDialog, handleSuccessDialog }: IConfirmDialog) => {
  const { t } = useTranslation()

  const handleDismissed = () => {
    setIsOpenDialog(false)
  }

  return (
    <FullScreenDialog width={292} height={107} open={isOpenDialog}>
      <DialogHeader>{t('PROFILE_CONFIRM_SAVE_DIALOG')}</DialogHeader>
      <StyledStack direction="row" spacing={1} justifyContent="center">
        <StyledButton variant="outlined" color="primary" size="small" onClick={handleDismissed}>
          {t('PROFILE_CONFIRM_NO_BUTTON')}
        </StyledButton>
        <StyledButton variant="contained" color="primary" size="small" onClick={handleSuccessDialog}>
          {t('PROFILE_CONFIRM_YES_BUTTON')}
        </StyledButton>
      </StyledStack>
    </FullScreenDialog>
  )
}

export const SuccessDialog = ({ isOpenDialog, setIsOpenDialog }: ISuccessDialog) => {
  const { t } = useTranslation()

  const handleDismissed = () => {
    setIsOpenDialog(false)
    window.location.reload()
  }

  return (
    <FullScreenDialog width={268} height={131} open={isOpenDialog}>
      <DialogHeader>{t('PROFILE_SUCCESS_DIALOG')}</DialogHeader>
      <StyledStack direction="row" spacing={1} justifyContent="center">
        <StyledButton variant="contained" color="primary" size="small" onClick={handleDismissed}>
          {t('PROFILE_CONFIRM_OK_BUTTON')}
        </StyledButton>
      </StyledStack>
    </FullScreenDialog>
  )
}

