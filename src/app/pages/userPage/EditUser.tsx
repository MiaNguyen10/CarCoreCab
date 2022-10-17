import { Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { ConfirmationProvider, FullScreenDialog, NotifyDialog, useConfirmation } from 'app/components'
import { EUserRole, EUserStatus, IUserFormInput, UserForm } from 'app/components/UserDetail'
import pages from 'app/config/pages'
import { selectState } from 'cores/reducers/authentication'
import { resetCompanyStatus, selectAllCompanies, selectStatus } from 'cores/reducers/company'
import { getUser, getUserStatus, resetUserStatus } from 'cores/reducers/user'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { getCompanyList } from 'cores/thunk/company'
import { editUser, getUserDetail } from 'cores/thunk/user'
import { ICompanyDetail } from 'cores/reducers/interfaces'

const CompanyList = (array: ICompanyDetail[] | undefined) => {
  return (
    array?.map((company) => ({
      id: company?.id ?? '',
      name: company?.name ?? '',
    })) ?? []
  )
}

const EditUser = (): JSX.Element => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const { t } = useTranslation()
  const confirmation = useConfirmation()
  const navigate = useNavigate()
  const { userId } = useParams()
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(getUserStatus)
  const token = useAppSelector(selectState)
  const userDetail = useAppSelector(getUser)
  const companyStatus = useAppSelector(selectStatus)
  const allCompany = useAppSelector(selectAllCompanies)
  const companyList = React.useMemo(() => {
    return CompanyList(allCompany)
  }, [allCompany])

  const handleFormSubmit = ({ company, firstName, lastName, role, email }: IUserFormInput): void => {
    confirmation({}).then(async () => {
      if (token.token) {
        try {
          await dispatch(
            editUser({
              token: token.token,
              companyId: company,
              name: firstName,
              surname: lastName,
              userRole: role,
              email: email,
            }),
          ).unwrap()
          setOpenSuccess(true)
        } catch (err) {
          // eslint-disable-next-line no-empty
        }
      }
    })
  }

  const handleCloseSuccessDialog = () => {
    setOpenSuccess(false)
    navigate(`${pages.userListPath}`)
  }

  useEffect(() => {
    if (userStatus === 'idle' && companyStatus === 'idle' && token.token) {
      dispatch(
        getUserDetail({
          token: token.token,
          id: userId ?? '',
        }),
      )
      dispatch(getCompanyList(token.token))
    }
  }, [userStatus, dispatch, token, userId, companyStatus])

  useEffect(() => {
    if (userStatus === 'succeeded') {
      dispatch(resetUserStatus())
    }
    if (companyStatus === 'succeeded') {
      dispatch(resetCompanyStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fixed>
      <Stack alignItems="center" spacing={2} p={3}>
        <Typography variant="h1">{t('USER_TITLE')}</Typography>
        <Typography variant="h3">{t('USER_LABEL_EDIT_USER')}</Typography>
        <UserForm
          userDetail={{
            email: userDetail?.email,
            firstName: userDetail?.name,
            lastName: userDetail?.surname,
            company: userDetail?.companyId.toLocaleLowerCase(),
            role: userDetail?.role as keyof typeof EUserRole,
            status: userDetail?.status as keyof typeof EUserStatus,
          }}
          companyList={companyList}
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === 'loading'}
        />
      </Stack>
      <FullScreenDialog open={openSuccess} width={268} height={132}>
        <NotifyDialog handleClose={handleCloseSuccessDialog}></NotifyDialog>
      </FullScreenDialog>
    </Container>
  )
}

const WrappedEditUser = () => {
  const { t } = useTranslation()

  return (
    <ConfirmationProvider
      width={292}
      height={108}
      desc={t('DIALOG_QUESTION_SAVE_CHANGE')}
      btnClose={t('DIALOG_NO')}
      btnSubmit={t('DIALOG_YES')}
    >
      <EditUser />
    </ConfirmationProvider>
  )
}

export default WrappedEditUser

