import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material'
import * as yup from 'yup'

import { FormSubmitButton, FullScreenDialog, LabelledInput } from 'app/components'
import pages from 'app/config/pages'

import { emailRegExp, passwordRegExp } from 'cores/utils/regexFormat'
import { useAppDispatch } from 'cores/store/hook'
import { resetPassword } from 'cores/reducers/user'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'

interface IResetPassword {
  email: string
  password: string
  confirmPassword: string
}

const StyledTypo = styled(Typography)({
  marginTop: 16,
  // color: '#333333',
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

const ResetPassword = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().required('Required').matches(emailRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_EMAIL'),
        password: yup.string().required('Required').matches(passwordRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'),
        confirmPassword: yup
          .string()
          .required('Required')
          .matches(passwordRegExp, 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD')
          .oneOf([yup.ref('password'), null], 'FORGOT_PASSWORD_ERROR_PASSWORD_NOT_MATCH'),
      }),
    [],
  )

  const {
    handleSubmit,
    formState: { errors: errors },
    setError,
    register,
  } = useForm<IResetPassword>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'sdf@gmail.com',
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
        <StyledTypo>{t('RESET_PASSWORD_DIALOG_PROMPT')}</StyledTypo>
        <StyledButton variant="contained" color="primary" onClick={handleCloseDialog}>
          {t('RESET_PASSWORD_LABEL_CLOSE')}
        </StyledButton>
      </FullScreenDialog>
      <Stack alignItems="center" pt={7}>
        <Typography variant="h1">{t('RESET_PASSWORD_TITLE')}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack pt={6} spacing={3}>
            <LabelledInput
              title={`${t('FORGOT_PASSWORD_LABEL_EMAIL')}`}
              name="email"
              disabled
              errors={errors}
              register={register}
              inputProps={{ required: false, maxLength: 255 }}
              required
              helperText={errors?.email?.message}
            />
            <LabelledInput
              title={`${t('FORGOT_PASSWORD_LABEL_NEW_PASSWORD')}`}
              name="password"
              errors={errors}
              register={register}
              inputProps={{ required: false, maxLength: 255 }}
              required
              helperText={t(
                errors?.password?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'
                  ? ''
                  : errors?.password?.message ?? '',
              )}
            />
            <LabelledInput
              title={`${t('FORGOT_PASSWORD_LABEL_CONFIRM_PASSWORD')}`}
              name="confirmPassword"
              errors={errors}
              register={register}
              inputProps={{ required: false, maxLength: 255 }}
              required
              helperText={t(
                errors?.confirmPassword?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD'
                  ? ''
                  : errors?.confirmPassword?.message ?? '',
              )}
            />
            {errors?.password?.message === 'FORGOT_PASSWORD_ERROR_INVALID_PASSWORD' && (
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

