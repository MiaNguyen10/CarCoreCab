import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { Typography } from '@mui/material'

import RightBox from 'app/components/Box/RightBox'
import FormSubmitButton from 'app/components/Button/FormSubmitButton'
import FormHeader from 'app/components/Typo/FormHeader'
import { CenterPage, LabelledInput } from 'app/components'

import { useAppDispatch } from 'cores/store/hook'
import { forgotPassword } from 'cores/reducers/user'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { emailRegExp } from 'cores/utils/regexFormat'

interface IForgotPasswordForm {
  email: string
}

const ForgotPassword = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const [isSubmit, setIsSubmit] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForgotPasswordForm>()

  const submitHandler = ({ email }: IForgotPasswordForm) => {
    try {
      dispatch(forgotPassword(email))

      setIsSubmit(true)
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)

      setError('email', { type: 'custom', message: errorMessage })
    }
  }

  return (
    <CenterPage>
      <FormHeader name="FORGOT_PASSWORD_TITLE" />
      {isSubmit ? (
        <Typography>{t('FORGOT_PASSWORD_CHECK_EMAIL')}</Typography>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <LabelledInput
            title="Email"
            name="email"
            errors={errors}
            register={register}
            rules={{
              required: 'FORGOT_PASSWORD_ERROR_REQUIRED',
              pattern: {
                value: emailRegExp,
                message: 'LOGIN_ERROR_INVALID_EMAIL',
              },
            }}
          />
          <RightBox>
            <FormSubmitButton name={'FORGOT_PASSWORD_LABEL_GET_LINK'} />
          </RightBox>
        </form>
      )}
    </CenterPage>
  )
}

export default ForgotPassword

