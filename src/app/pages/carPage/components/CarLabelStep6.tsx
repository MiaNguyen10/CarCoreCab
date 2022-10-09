import React, { useState } from 'react'
import { Box, Button, Grid, Stack, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FullScreenDialog } from 'app/components'
import { carStatus } from 'app/config/interfaces'
import { STATUS } from 'app/config/Constant'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'
import pages from 'app/config/pages'

interface ICarLabelStep6Props {
  onFormSubmit: () => void
  onApproveCar: () => Promise<void>
  onDisapproveCar: () => Promise<void>
  onWithdrawCar: () => Promise<void>
}

export const BoxChecker = styled(Box)({
  boxSizing: 'border-box',
  width: '1161px',
  height: '190px',
  background: '#FFFFFF',
  border: '1px solid #DDDDDD',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
})

const ButtonStyled = styled(Button)({
  margin: '0 8px 0 8px',
})

export const TypographySmallButton = styled(Typography)({
  fontWeight: 900,
  fontSize: '12px',
  lineHeight: '18px',
})

export const TypographyMediumButton = styled(Typography)({
  fontWeight: 900,
  fontSize: '14px',
  lineHeight: '21px',
})

const TypographyChecker = styled(Typography)({
  position: 'absolute',
  width: '149px',
  height: '77px',
  left: 'calc(50% - 149px/2 - 461.5px)',
  fontWeight: 700,
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
})

export const renderUnfinishedStep = (stepStatus: boolean[]) => {
  const checkedStep: number[] = []
  const failedStep = stepStatus.reduce((prev, curr, indexCurr) => {
    if (curr === false) {
      prev.push(indexCurr + 1)
    }

    return prev
  }, checkedStep)

  return failedStep.map((value, index) => {
    if (index === 0 && index + 1 === failedStep.length) {
      return ' Step ' + value + '.'
    } else if (index + 1 !== failedStep.length) {
      return ' Step ' + value + ','
    } else {
      return ' Step ' + value + '.'
    }
  })
}

const CarLabelStep6 = ({
  onFormSubmit,
  onApproveCar,
  onDisapproveCar,
  onWithdrawCar,
}: ICarLabelStep6Props): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  //mock data
  const [status, setStatus] = useState<carStatus>(STATUS.DRAFT)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [isApprove, setIsApprove] = useState<boolean>(false)

  let stepStatus = new Array<boolean>(6).fill(false)
  stepStatus = [true, true, true, true, true, true]
  const requesterName = '[name]'
  const approverName = '[name]'
  const dateTime = '[date&time]'

  const handleBackToCarList = () => {
    navigate(pages.carListPath)
  }

  const handleNoSubmit = () => {
    navigate(pages.carListPath)
  }

  const handleYesSubmit = () => {
    setOpenConfirmDialog(true)
  }

  const handleApprove = () => {
    setOpenConfirmDialog(true)
    setIsApprove(true)
  }

  const handleReject = () => {
    setOpenConfirmDialog(true)
  }

  const handleWithdraw = () => {
    onWithdrawCar()
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const handleSaveChange = () => {
    status === STATUS.DRAFT ? setStatus(STATUS.PENDING) : setStatus(STATUS.APPROVED)
    switch(status) {
      case STATUS.DRAFT:
        onFormSubmit()
        setStatus(STATUS.PENDING)
        setOpenConfirmDialog(false)
        break
      case STATUS.PENDING:
        if(isApprove) {
          onApproveCar()
          setStatus(STATUS.APPROVED)
          setOpenConfirmDialog(false)
          setIsApprove(false)
          break
        }
        onDisapproveCar()
        setStatus(STATUS.DRAFT)
        setOpenConfirmDialog(false)
        break
      case STATUS.APPROVED:
        onWithdrawCar()
        navigate(pages.carListPath)
    }
  }

  return (
    <Stack direction="column" alignItems="center" spacing={5}>
      <Typography variant="h3">{t('CAR_CAR_LABELING_STEP_6_SUBMISSION')}</Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Grid container alignItems="center" justifyContent="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 400,
            }}
          >
            {t('STATUS')}
            {':\xa0'}
          </Typography>
          <Typography variant="h4">
            {status === STATUS.DRAFT
              ? t('STATUS_DRAFT')
              : status === STATUS.PENDING
              ? t('STATUS_PENDING')
              : t('STATUS_APPROVED')}
          </Typography>
        </Grid>
        {status === STATUS.DRAFT && !stepStatus.some((value) => value === false) ? (
          <>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {t('CAR_CAR_LABELING_STEP_6_SUBMIT_QUESTION')}
            </Typography>
            <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{ marginTop: '15px' }}>
              <Grid item>
                <Button variant="outlined" color="primary" size="small" onClick={() => handleNoSubmit()}>
                  <Typography sx={{ fontWeight: 900, fontSize: '12px', lineHeight: '18px' }}>
                    {t('CAR_CAR_LABELING_STEP_6_NO')}
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="small" onClick={() => handleYesSubmit()}>
                  <Typography sx={{ fontWeight: 900, fontSize: '12px', lineHeight: '18px' }}>
                    {t('CAR_CAR_LABELING_STEP_6_YES')}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          status === STATUS.DRAFT && (
            <Typography variant="h4" sx={{ color: '#E53F3F', marginTop: '15px' }}>
              {t('CAR_CAR_LABELING_STEP_6_SUBMISSION_ERROR')} {renderUnfinishedStep(stepStatus)}
            </Typography>
          )
        )}
        {status === STATUS.PENDING && (
          <Stack alignItems="center" justifyContent="center">
            <Typography>
              {t('CAR_CAR_LABELING_STEP_6_REQUESTER')}: {requesterName} {t('CAR_CAR_LABELING_STEP_6_ON')} {dateTime}
            </Typography>
          </Stack>
        )}
        {status === STATUS.APPROVED && (
          <Stack alignItems="center" justifyContent="center">
            <Typography>
              {t('CAR_CAR_LABELING_APPROVER')}: {approverName} {t('CAR_CAR_LABELING_STEP_6_ON')} {dateTime}
            </Typography>
          </Stack>
        )}
      </Grid>
      <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER]}>
        <>
          {status === STATUS.PENDING && (
            <BoxChecker>
              <TypographyChecker>{t('CAR_CAR_LABELING_FOR_CHECKER')}</TypographyChecker>
              <Stack height={'100%'} width={'100%'} alignItems="center" justifyContent="center">
                <Typography>
                  {t('CAR_CAR_LABELING_STEP_6_QUESTION')}
                  <ButtonStyled variant="contained" color="primary" size="medium" onClick={() => handleApprove()}>
                    <TypographyMediumButton>{t('CAR_CAR_LABELING_STEP_6_APPROVE')}</TypographyMediumButton>
                  </ButtonStyled>
                  {t('CAR_CAR_LABELING_STEP_6_OR')}
                  <ButtonStyled variant="contained" color="warning" size="medium" onClick={() => handleReject()}>
                    <TypographyMediumButton>{t('CAR_CAR_LABELING_STEP_6_REJECT')}</TypographyMediumButton>
                  </ButtonStyled>
                  {t('CAR_CAR_LABELING_STEP_6_THIS_LABEL_QUESTION')}
                </Typography>
              </Stack>
            </BoxChecker>
          )}
          {status === STATUS.APPROVED && (
            <BoxChecker>
              <TypographyChecker>{t('CAR_CAR_LABELING_FOR_CHECKER')}</TypographyChecker>
              <Stack height={'100%'} width={'100%'} alignItems="center" justifyContent="center">
                <Typography>
                  {t('CAR_CAR_LABELING_STEP_6_QUESTION')}
                  <ButtonStyled variant="contained" color="primary" size="medium" onClick={() => handleWithdraw()}>
                    <TypographyMediumButton>{t('CAR_CAR_LABELING_STEP_6_WITHDRAW')}</TypographyMediumButton>
                  </ButtonStyled>
                  {t('CAR_CAR_LABELING_STEP_6_THIS_LABEL_QUESTION')}
                </Typography>
              </Stack>
            </BoxChecker>
          )}
        </>
      </RestrictedPermission>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '1273px' }}>
        <Button variant="contained" color="primary" onClick={() => handleBackToCarList()}>
          <TypographyMediumButton>{t('CAR_CAR_LABELING_BACK_TO_CAR_LIST')}</TypographyMediumButton>
        </Button>
      </Stack>
      <FullScreenDialog open={openConfirmDialog} width={292} height={107.5} handleClose={handleCloseConfirmDialog}>
        <Typography sx={{ marginTop: '16px', fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: '#333333' }}>
          {t('CAR_CONFIRM_SAVE_DIALOG')}
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} margin="20px">
          <Button variant="outlined" color="primary" size="small" onClick={() => setOpenConfirmDialog(false)}>
            <TypographySmallButton>{t('CAR_CAR_LABELING_STEP_6_NO')}</TypographySmallButton>
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={() => handleSaveChange()}>
            <TypographySmallButton>{t('CAR_CAR_LABELING_STEP_6_YES')}</TypographySmallButton>
          </Button>
        </Stack>
      </FullScreenDialog>
    </Stack>
  )
}

export default CarLabelStep6

