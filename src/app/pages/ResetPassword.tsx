import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material'

import * as yup from 'yup'

import { FormInput } from 'app/components/Input'
import { FormSubmitButton, FullScreenDialog } from 'app/components'
import pages from 'app/config/pages'

import { emailRegExp, passwordRegExp } from 'cores/utils/regexFormat'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { resetPassword } from 'cores/reducers/user'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { selectState } from 'cores/reducers/authentication'

interface IResetPassword {
  email: string
  password: string
  confirmPassword: string
}

const StyledTypo = styled(Typography)({
  marginTop: 16,
  color: '#333333',
})

const StyledButton = styled(Button)({
  marginTop: 28,
  height: 26,
  width: 51,
  fontWeight: 900,
  fontSize: 12,
})

const ErrorTypo = styled(Typography)({
  color: '#E53F3F',
  width: '320px',
  whiteSpace: 'nowrap',
})

const schema = yup.object({
  email: yup.string().required('Required').matches(emailRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_EMAIL'),
  password: yup.string().required('Required').matches(passwordRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'),
  confirmPassword: yup
    .string()
    .required('Required')
    .matches(passwordRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD')
    .oneOf([yup.ref('password'), null], 'FORGOT_PASSWORD_ERROR_PASSWORD_NOT_MATCH'),
})

const ResetPassword = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentSession = useAppSelector(selectState)

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    setError,
  } = useForm<IResetPassword>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: currentSession.username,
      password: '',
      confirmPassword: '',
    },
  })

  const [isSubmit, setIsSubmit] = useState(false)

  const onSubmit = async ({ email, password }: IResetPassword) => {
    try {
      await dispatch(resetPassword({ email, password })).unwrap()

      setIsSubmit(true)
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)

      setError('password', { type: 'custom', message: errorMessage })
    }
  }

  const handleCloseDialog = () => {
    navigate(pages.loginPath, { replace: true })
  }

  return (
    <Container>
      <FullScreenDialog width={268} height={131} open={isSubmit} handleClose={handleCloseDialog}>
        <StyledTypo variant="h5">{t('RESET_PASSWORD_DIALOG_PROMPT')}</StyledTypo>
        <StyledButton variant="contained" color="primary" onClick={handleCloseDialog}>
          {t('RESET_PASSWORD_LABEL_CLOSE')}
        </StyledButton>
      </FullScreenDialog>
      <Stack alignItems="center" spacing={2} pt={7}>
        <Typography variant="h1">{t('RESET_PASSWORD_TITLE')}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack pt={6} spacing={7}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  required
                  disabled
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.email}
                  helperText={formErrors?.email?.message}
                  inputProps={{ required: false, maxLength: 255 }}
                  label={t('FORGOT_PASSWORD_LABEL_EMAIL')}
                  variant="outlined"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  required
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.password}
                  helperText={t(
                    formErrors?.password?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'
                      ? ''
                      : formErrors?.password?.message ?? '',
                  )}
                  inputProps={{ required: false, maxLength: 255 }}
                  label={t('FORGOT_PASSWORD_LABEL_NEW_PASSWORD')}
                  variant="outlined"
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  required
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.confirmPassword}
                  helperText={t(
                    formErrors?.confirmPassword?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'
                      ? ''
                      : formErrors?.confirmPassword?.message ?? '',
                  )}
                  inputProps={{ required: false, maxLength: 255 }}
                  label={t('FORGOT_PASSWORD_LABEL_CONFIRM_PASSWORD')}
                  variant="outlined"
                />
              )}
            />
            {formErrors?.password?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD' && (
              <Box>
                {t('PROFILE_ERROR_INVALID_PASSWORD')
                  .split('\n')
                  .map((message, index) => (
                    <ErrorTypo key={index}>{message}</ErrorTypo>
                  ))}
              </Box>
            )}

            <Stack direction="row" justifyContent="flex-end">
              <FormSubmitButton name={'RESET_PASSWORD_SAVE'} />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default ResetPassword

