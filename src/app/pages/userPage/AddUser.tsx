import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ConfirmationProvider, FullScreenDialog, NotifyDialog, useConfirmation } from 'app/components'
import { IUserFormInput, UserForm } from 'app/components/UserDetail'
import { selectState } from 'cores/reducers/authentication'
import { selectAllCompanies, selectStatus } from 'cores/reducers/company'
import { getAllUsers, getUserStatus } from 'cores/reducers/user'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { getCompanyList } from 'cores/thunk/company'
import { addUser, getUserList } from 'cores/thunk/user'
import pages from 'app/config/pages'

const AddUser = (): JSX.Element => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const confirmation = useConfirmation()
  const companyStatus = useAppSelector(selectStatus)
  const userStatus = useAppSelector(getUserStatus)
  const userList = useAppSelector(getAllUsers)

  const companyList =
    useAppSelector(selectAllCompanies)?.map((company) => ({
      id: company?.id ?? '',
      name: company?.name ?? '',
    })) ?? []
  const token = useAppSelector(selectState)

  const handleFormSubmit = ({ company, firstName, lastName, role, email }: IUserFormInput) => {
    confirmation({}).then(async () => {
      if (token.token) {
        try {
          await dispatch(
            addUser({
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
    if (companyStatus === 'idle' && token.token) {
      dispatch(getCompanyList(token.token))
    }
    if (userStatus === 'idle' && token.token) {
      dispatch(getUserList(token.token))
    }
  }, [companyStatus, dispatch, token, userStatus])

  return (
    <Container fixed>
      <Stack alignItems="center" spacing={2} p={3}>
        <Typography variant="h1">{t('USER_TITLE')}</Typography>
        <Typography variant="h3">{t('USER_LABEL_ADD_USER')}</Typography>
        <UserForm
          companyList={companyList}
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === 'loading'}
          userList={userList}
        />
      </Stack>
      <FullScreenDialog open={openSuccess} width={268} height={132}>
        <NotifyDialog handleClose={handleCloseSuccessDialog}></NotifyDialog>
      </FullScreenDialog>
    </Container>
  )
}

const WrappedAddUser = () => {
  const { t } = useTranslation()

  return (
    <ConfirmationProvider
      width={292}
      height={108}
      desc={t('DIALOG_QUESTION_SAVE_CHANGE')}
      btnClose={t('DIALOG_NO')}
      btnSubmit={t('DIALOG_YES')}
    >
      <AddUser />
    </ConfirmationProvider>
  )
}

export default WrappedAddUser
