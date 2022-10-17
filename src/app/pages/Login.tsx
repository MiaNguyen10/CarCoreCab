import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'

import Container from 'typedi'

import { Box, Link, Stack, styled } from '@mui/material'

import { CenterPage, Recaptcha, LabelledInput } from 'app/components'
import pages from 'app/config/pages'
import FormHeader from 'app/components/Typo/FormHeader'
import FormSubmitButton from 'app/components/Button/FormSubmitButton'

import { selectSession, login } from 'cores/reducers/authentication'
import { RecaptchaService } from 'cores/services/RecaptchaService'
import { useAppDispatch } from 'cores/store/hook'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { emailRegExp, passwordRegExp } from 'cores/utils/regexFormat'

interface StateType {
  from: {
    pathname: string
    search: string
    hash: string
    state: unknown
    key: string
  }
}

interface ILoginForm {
  email: string
  password: string
}

const RightBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '14px',
  alignItems: 'center',
})

const Login = () => {
  const state = useLocation().state as StateType
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentSession = useSelector(selectSession)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>()
  const [, setIsVerified] = useState(false)
  const { t } = useTranslation()

  const recaptchaService = Container.get(RecaptchaService)

  const verifyRecaptcha = async (token: string | null) => {
    const result = await recaptchaService.verify(token ?? '')

    setIsVerified(result)
  }

  const submitHandler = async ({ email, password }: ILoginForm) => {
    try {
      await dispatch(login({ email, password })).unwrap()

      const destination = state && state.from.pathname ? state.from.pathname : pages.default
      navigate(destination, { replace: true })
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)

      setError('password', { type: 'custom', message: errorMessage })
    }
  }

  if (currentSession) {
    navigate(pages.default, { replace: true })
  }

  return (
    <CenterPage>
      <FormHeader name="LOGIN_TITLE" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack pt={2} spacing={3}>
          <LabelledInput
            title="Email"
            name="email"
            errors={errors}
            register={register}
            rules={{
              required: 'LOGIN_ERROR_REQUIRED',
              pattern: {
                value: emailRegExp,
                message: 'LOGIN_ERROR_INVALID_EMAIL',
              },
            }}
          />
          <LabelledInput
            title="Password"
            name="password"
            type="password"
            errors={errors}
            register={register}
            rules={{
              required: 'LOGIN_ERROR_REQUIRED',
              pattern: {
                value: passwordRegExp,
                message: 'LOGIN_ERROR_INVALID_PASSWORD',
              },
            }}
          />
        </Stack>

        <Recaptcha onChange={verifyRecaptcha} />
        <RightBox>
          <Link href={pages.forgotPassword}>{t('LOGIN_FORGOT_PASSWORD')}</Link>
          <FormSubmitButton name={'LOGIN_LOG_IN'} />
        </RightBox>
      </form>
    </CenterPage>
  )
}

export default Login

