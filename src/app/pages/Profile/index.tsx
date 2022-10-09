/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Box, Button, Divider, Grid, styled, Typography } from '@mui/material'

import { CenterBox, CenterPage, FormHeader, FormSubmitButton, LabelledInput, RightBox } from 'app/components'
import { IProfileForm } from 'app/pages/Profile/interfaces'

import { selectState } from 'cores/reducers/authentication'
import { passwordRegExp } from 'cores/utils/regexFormat'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { changePassword, editProfile, getUserStatus, getUser, resetUserStatus } from 'cores/reducers/user'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { getUserDetail } from 'cores/thunk/user'

import { ConfirmDialog, SuccessDialog } from './dialogs'

const CancelButton = styled(Button)({
  fontSize: 14,
  fontWeight: 900,
  height: 44,
  width: 88,
})

const ErrorTypo = styled(Typography)({
  color: '#E53F3F',
})

const Profile = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [formInput, setFormInput] = useState<IProfileForm>({
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
  const [isOpenSuccessDialog, setIsOpenSuccessDialog] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<IProfileForm>()

  const submitHandler = (input: IProfileForm) => {
    setFormInput(input)
    setIsOpenConfirmDialog(true)
  }

  const handleSuccessDialog = async () => {
    let isSuccess = true

    try {
      await dispatch(
        editProfile({
          firstName: formInput!.firstName,
          lastName: formInput!.lastName,
        }),
      ).unwrap()
    } catch (error) {
      isSuccess = false

      const errorMessage = backendErrorToMessage(error as IError)

      setError('firstName', { type: 'custom', message: errorMessage })
    }

    if (formInput!.newPassword && isSuccess) {
      try {
        await dispatch(
          changePassword({
            oldPassword: formInput!.currentPassword,
            newPassword: formInput!.newPassword,
          }),
        ).unwrap()
      } catch (error) {
        isSuccess = false

        const errorMessage = backendErrorToMessage(error as IError)

        setError('newPassword', { type: 'custom', message: errorMessage })
      }
    }

    setIsOpenConfirmDialog(false)

    if (isSuccess) {
      setIsOpenSuccessDialog(true)
    }
  }

  const currentSession = useAppSelector(selectState)
  const userStatus = useAppSelector(getUserStatus)
  const userDetail = useAppSelector(getUser)

  const handleCancel = () => {
    reset({
      firstName: '',
      lastName: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
  }

  useEffect(() => {
    if (userStatus === 'idle' && currentSession.token) {
      dispatch(
        getUserDetail({
          token: currentSession.token,
        }),
      )
    }
  }, [userStatus, dispatch, currentSession])

  useEffect(() => {
    if (userStatus === 'succeeded') {
      dispatch(resetUserStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CenterPage>
      <ConfirmDialog
        isOpenDialog={isOpenConfirmDialog}
        setIsOpenDialog={setIsOpenConfirmDialog}
        handleSuccessDialog={handleSuccessDialog}
      />
      <SuccessDialog isOpenDialog={isOpenSuccessDialog} setIsOpenDialog={setIsOpenSuccessDialog} />
      <FormHeader name="PROFILE_TITLE"></FormHeader>
      <Box component="form" onSubmit={handleSubmit(submitHandler)}>
        <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ width: 700 }}>
          <Grid item xs={6}>
            <LabelledInput
              disabled
              title="Email"
              name="email"
              errors={errors}
              register={register}
              label={currentSession.username}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelledInput
              disabled
              title="Role"
              name="role"
              errors={errors}
              register={register}
              label={currentSession.role}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelledInput
              disabled
              title="First Name"
              name="firstName"
              errors={errors}
              register={register}
              label={userDetail?.name ?? ''}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelledInput
              disabled
              title="Last Name"
              name="lastName"
              errors={errors}
              register={register}
              label={userDetail?.surname ?? ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginTop: 4 }} />
            <CenterBox sx={{ marginTop: 3 }}>
              <Typography variant="h3">{t('PROFILE_LABEL_RESET_PASSWORD')}</Typography>
            </CenterBox>
            <LabelledInput
              title="Current Password"
              name="currentPassword"
              type="password"
              errors={errors}
              register={register}
              rules={{
                validate: {
                  required: (value) => {
                    if (!value && (getValues('newPassword') || getValues('confirmNewPassword'))) {
                      return 'PROFILE_ERROR_REQUIRED'
                    }

                    if (value && !passwordRegExp.test(value)) {
                      setIsPasswordValid(false)

                      return false
                    }

                    return true
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelledInput
              title="New Password"
              name="newPassword"
              type="password"
              errors={errors}
              register={register}
              rules={{
                validate: {
                  required: (value) => {
                    if (!value && (getValues('currentPassword') || getValues('confirmNewPassword'))) {
                      return 'PROFILE_ERROR_REQUIRED'
                    }

                    if (value && (value !== getValues('confirmNewPassword') || !passwordRegExp.test(value))) {
                      setIsPasswordValid(false)

                      return false
                    }

                    return true
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelledInput
              title="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              errors={errors}
              register={register}
              rules={{
                validate: (value) => {
                  if (!value && (getValues('newPassword') || getValues('currentPassword'))) {
                    return 'PROFILE_ERROR_REQUIRED'
                  }

                  if (value && (value !== getValues('newPassword') || !passwordRegExp.test(value))) {
                    setIsPasswordValid(false)

                    return false
                  }

                  return true
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {!isPasswordValid && <ErrorTypo sx={{ marginTop: 2 }}>{t('PROFILE_ERROR_INVALID_PASSWORD')}</ErrorTypo>}
        </Grid>
        <Grid item xs={12}>
          <RightBox sx={{ margin: 4 }}>
            <CancelButton variant="contained" color="secondary" onClick={handleCancel}>
              {t('PROFILE_BUTTON_CANCEL')}
            </CancelButton>
            <FormSubmitButton name={'PROFILE_BUTTON_SAVE'} />
          </RightBox>
        </Grid>
      </Box>
    </CenterPage>
  )
}

export default Profile
