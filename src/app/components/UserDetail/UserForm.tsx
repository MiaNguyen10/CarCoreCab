import { yupResolver } from '@hookform/resolvers/yup'
import { Backdrop, Button, CircularProgress, MenuItem, Stack, SxProps, TextField } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import pages from 'app/config/pages'
import { useSession } from 'app/middlewares/hooks/useSession'
import { ETier, TPermission } from 'app/middlewares/PermissionProvider'
import { selectState } from 'cores/reducers/authentication'
import { IUserDetail } from 'cores/reducers/interfaces'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { addUser } from 'cores/thunk/user'
import { emailRegExp, nameRegExp } from 'cores/utils/regexFormat'

export enum EUserStatus {
  active = 'Active',
  inactive = 'Inactive',
  delete = 'Delete',
}

export enum EUserRole {
  superUser = 'Company Super User',
  checker = 'Company Checker',
  labeler = 'Company labeler',
  viewer = 'Company viewer',
}

export interface IUserFormInput {
  email: string
  firstName: string
  lastName: string
  company: string
  role: keyof typeof EUserRole
  status: keyof typeof EUserStatus
}

interface IUserFormProps {
  userDetail?: {
    email?: string
    firstName?: string
    lastName?: string
    company?: string
    role?: keyof typeof EUserRole
    status?: keyof typeof EUserStatus
  }
  companyList:
    | {
        id: string
        name: string
      }[]
    | []
  onFormSubmit: (data: IUserFormInput) => void
  isLoading: boolean
  userList?: IUserDetail[]
}

const makeStyles = (): {
  textFieldStyle: SxProps
} => ({
  textFieldStyle: {
    width: '320px',
    '.MuiOutlinedInput-root': {
      height: 44,
    },
    '.MuiSelect-select': {
      marginTop: 1,
    },
    '.MuiInputLabel-root': {
      zIndex: 0,
      top: '-25px',
      fontSize: '16px',
      fontWeight: 700,
      color: '#333333',
      WebkitTransform: 'none',
      span: {
        color: '#D93A39',
      },
      '&.Mui-focused': {
        color: '#333333',
      },
      '&.Mui-error': {
        color: '#333333',
      },
    },
    '.MuiOutlinedInput-notchedOutline': {
      legend: {
        maxWidth: 0,
      },
    },
  },
})

const UserForm = ({ userDetail, companyList, onFormSubmit, isLoading, userList }: IUserFormProps): JSX.Element => {
  const { t } = useTranslation()
  const styles = makeStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectState)
  const currentState = useSelector(selectState)

  const schema = yup.object({
    email: yup
      .string()
      .required(t('USER_INPUT_ERROR_VALIDATION'))
      .matches(emailRegExp, t('USER_INPUT_ERROR_FORMAT_EMAIL'))
      .test('duplicate-email', 'Duplicate email.', (value): boolean => {
        if (value) {
          return (
            !userList
              ?.filter((user) => user?.status === 'active')
              ?.reduce((acc: string[], user: IUserDetail) => acc.concat([user?.email ?? '']), [])
              .includes(value) ?? true
          )
        }

        return true
      }),
    firstName: yup
      .string()
      .required(t('USER_INPUT_ERROR_VALIDATION'))
      .matches(nameRegExp, t('USER_INPUT_ERROR_FIRST_NAME_EMAIL')),
    lastName: yup
      .string()
      .required(t('USER_INPUT_ERROR_VALIDATION'))
      .matches(nameRegExp, t('USER_INPUT_ERROR_LAST_NAME_EMAIL')),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors, isValid },
    control,
    reset,
    getValues,
  } = useForm<IUserFormInput>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      status: 'active',
    },
  })

  const onSubmit: SubmitHandler<IUserFormInput> = (data): void => onFormSubmit(data)

  const getVisibleRole = useCallback((): TPermission[] => {
    switch (currentState.teir) {
      case 'admin':
        return [ETier.COMPANY_ADMIN]
      case 'superUser':
        return [ETier.COMPANY_CHECKER, ETier.COMPANY_LABELER, ETier.COMPANY_VIEWER]
      default:
        return []
    }
  }, [currentState.teir])

  useEffect(() => {
    reset({
      email: userDetail?.email,
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      company: userDetail?.company ?? companyList?.[0]?.id,
      role: userDetail?.role ?? (getVisibleRole()[0] as keyof typeof EUserRole),
      status: userDetail?.status ?? getValues('status'),
    })
  }, [companyList, userDetail, reset, getValues, getVisibleRole])

  const handleAddUser = async () => {
    if (token.token) {
      await dispatch(
        addUser({
          token: token.token,
          email: getValues('email'),
          companyId: getValues('company'),
          name: getValues('firstName'),
          surname: getValues('lastName'),
          userRole: getValues('role'),
        }),
      ).unwrap()
    }
  }

  const handleSessionTimeout = () => {
    if (!userDetail && isValid) {
      handleAddUser()
    }
  }

  const sessionTimeout = useSession(handleSessionTimeout)

  useEffect(() => {
    sessionTimeout
  }, [sessionTimeout])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
        <CircularProgress />
      </Backdrop>
      <Stack alignItems="flex-start" pt={6} spacing={5}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textFieldStyle}
              value={value}
              onChange={onChange}
              error={!!formErrors?.email}
              helperText={formErrors?.email?.message}
              required
              inputProps={{ required: false, maxLength: 255 }}
              label={t('USER_EMAIL')}
              variant="outlined"
              disabled={!!userDetail?.email}
            />
          )}
        />
        <Stack direction="row" spacing={3}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.firstName}
                helperText={formErrors?.firstName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label={t('USER_LABEL_FIRSTNAME')}
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.lastName}
                helperText={formErrors?.lastName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label={t('USER_LABEL_LASTNAME')}
                variant="outlined"
              />
            )}
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          {getValues('company') && (
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  select
                  value={value}
                  onChange={onChange}
                  required
                  inputProps={{ required: false }}
                  label={t('USER_LABEL_COMPANY')}
                  variant="outlined"
                  disabled={!!userDetail?.company}
                >
                  {companyList.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
          {getValues('role') && (
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  select
                  value={value}
                  onChange={onChange}
                  required
                  inputProps={{ required: false }}
                  label={t('USER_USER_ROLE')}
                  variant="outlined"
                >
                  {getVisibleRole().map((role) => (
                    <MenuItem key={role} value={role}>
                      {EUserRole[role as keyof typeof EUserRole]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
        </Stack>
        {getValues('status') && (
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                select
                value={value}
                onChange={onChange}
                required
                inputProps={{ required: false }}
                label={t('USER_LABEL_STATUS')}
                variant="outlined"
              >
                {Object.keys(EUserStatus).map((status) => (
                  <MenuItem value={status} key={status}>
                    {EUserStatus[status as keyof typeof EUserStatus]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={(): void => navigate(pages.userListPath)}
            disabled={isLoading}
          >
            {t('USER_BUTTON_CANCEL')}
          </Button>
          <Button variant="contained" disabled={isLoading} type="submit">
            {t('USER_BUTTON_SAVE')}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default UserForm

