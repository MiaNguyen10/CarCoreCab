/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import {
  ConfirmationProvider,
  FullScreenDialog,
  HeaderTypo,
  LabelTypo,
  NotifyDialog,
  SelectStatusDetail,
  TextFieldFill,
  useConfirmation,
} from 'app/components'
import { STATUS } from 'app/config/Constant'
import { PageUrlProps, status } from 'app/config/interfaces'
import pages from 'app/config/pages'
import { resetCompanyStatus, selectAllCompanies, selectCompanyById, selectStatus } from 'cores/reducers/company'
import { selectState } from 'cores/reducers/user'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { addCompany, editCompany, getCompanyList } from 'cores/thunk/company'
import { phoneRegExp } from 'cores/utils/regexFormat'

export interface ICompanyAdd {
  name: string
  coordinatorName: string
  coordinatorTel: string
  status: status
}
const CompanyDetail: React.FC<PageUrlProps> = ({ isAdd, isEdit, isView }) => {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const confirmation = useConfirmation()
  const { companyId: companyId } = useParams()
  const companyList = useAppSelector(selectAllCompanies)
  const dispatch = useAppDispatch()
  const company = useAppSelector((state) => selectCompanyById(state, companyId!))
  const token = useAppSelector(selectState)
  const companyStatus = useAppSelector(selectStatus)
  const defaultValues = useMemo<ICompanyAdd>(() => {
    return {
      name: '',
      coordinatorName: '',
      coordinatorTel: '',
      status: STATUS.ACTIVE,
    }
  }, [])

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t('COMPANY_NAME_INPUT_ERROR_VALIDATION'))
      .test(
        'duplicate-active-company',
        'This active company was duplicated.',
        (value, { parent }): boolean =>
          !companyList?.some((company) => company?.name === value && company?.status === parent.status) ?? true,
      ),
    coordinatorName: yup.string().required(t('COMPANY_CONTACT_PERSON_INPUT_ERROR_VALIDATION')),
    coordinatorTel: yup
      .string()
      .required(t('COMPANY_TELEPHONE_INPUT_ERROR_VALIDATION'))
      .matches(phoneRegExp, t('PHONE_INPUT_ERROR_FORMAT')),
  })
  const methods = useForm<ICompanyAdd>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  })

  const { handleSubmit, control, setValue, reset } = methods

  const handleCancel = () => {
    navigate(`${pages.companyListPath}`)
  }

  const handleCloseSuccessDialog = () => {
    setOpenSuccess(false)
    handleCancel()
  }

  useEffect(() => {
    if (company) {
      setValue('name', company.name || defaultValues.name)
      setValue('coordinatorName', company.coordinatorName || defaultValues.coordinatorName)
      setValue('coordinatorTel', company.coordinatorTel || defaultValues.coordinatorTel)
      setValue('status', company.status || defaultValues.status)
    }
  }, [company, setValue, defaultValues])

  const onSubmit = (dataCompany: ICompanyAdd) => {
    confirmation({}).then(async () => {
      if (token.token) {
        try {
          if (isAdd) {
            await dispatch(
              addCompany({
                token: token.token!,
                name: dataCompany.name,
                coordinatorName: dataCompany.coordinatorName,
                coordinatorTel: dataCompany.coordinatorTel,
                status: dataCompany.status,
                companyId: '',
              }),
            ).unwrap()
            setOpenSuccess(true)
            reset()
          } else if (isEdit) {
            await dispatch(
              editCompany({
                token: token.token!,
                companyId: companyId ? companyId : '',
                name: dataCompany.name,
                coordinatorName: dataCompany.coordinatorName,
                coordinatorTel: dataCompany.coordinatorTel,
                status: dataCompany.status,
              }),
            ).unwrap()
            setOpenSuccess(true)
          }
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    })
  }

  useEffect(() => {
    if (companyStatus === 'idle' && token.token) {
      dispatch(getCompanyList(token.token))
    }
  }, [companyStatus, dispatch, token])

  useEffect(() => {
    if (companyStatus === 'succeeded') {
      dispatch(resetCompanyStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeaderTypo header={`${t('COMPANY')}`} />
      <Typography variant="h3" align="center">
        {isAdd
          ? ` ${t('COMPANY_LIST_ADD_COMPANY')}`
          : isEdit
          ? ` ${t('COMPANY_LIST_EDIT_COMPANY')}`
          : ` ${t('COMPANY_LIST_VIEW_COMPANY')}`}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ marginTop: '10px' }}
            >
              <Grid item xs={12}>
                <div>
                  <LabelTypo desc={`${t('COMPANY_COMPANY_NAME')}`} />
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextFieldFill value={value} onChange={onChange} error={error} isView={isView} width={320} />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <LabelTypo desc={`${t('COMPANY_CONTACT_PERSON')}`} />
                  <Controller
                    name="coordinatorName"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextFieldFill value={value} onChange={onChange} error={error} isView={isView} width={320} />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <LabelTypo desc={`${t('COMPANY_TELEPHONE')}`} />
                  <Controller
                    name="coordinatorTel"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextFieldFill value={value} onChange={onChange} error={error} isView={isView} width={320} />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <LabelTypo desc={`${t('STATUS')}`} />
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <SelectStatusDetail value={value} onChange={onChange} error={error} isView={isView} />
                    )}
                  />
                </div>
              </Grid>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <Grid item xs={12} sx={{ marginLeft: '450px' }}>
                <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ margin: '10px' }}>
                  {t('CANCEL_BUTTON')}
                </Button>
                {!isView && (
                  <Button type="submit" variant="contained" color="primary">
                    {t('SUBMIT_BUTTON')}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </form>
      </FormProvider>
      <FullScreenDialog open={openSuccess} width={268} height={132}>
        <NotifyDialog handleClose={handleCloseSuccessDialog}></NotifyDialog>
      </FullScreenDialog>
    </>
  )
}

const WrappedCompanyDetail = (props: PageUrlProps) => {
  const { t } = useTranslation()

  return (
    <ConfirmationProvider
      width={292}
      height={108}
      desc={t('DIALOG_QUESTION_SAVE_CHANGE')}
      btnClose={t('DIALOG_NO')}
      btnSubmit={t('DIALOG_YES')}
    >
      <CompanyDetail {...props} />
    </ConfirmationProvider>
  )
}

export default WrappedCompanyDetail

