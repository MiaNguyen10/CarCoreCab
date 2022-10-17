/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material'
import SearchIcon from 'app/assets/icons/SearchIcon'
import { AddButton, HeadCellProps, ListTypo, MenuAction, Order, OptionSelect, TableSort } from 'app/components'
import { DefaultLimit, STATUS, SelectAllCompanyStatus } from 'app/config/Constant'
import { status } from 'app/config/interfaces'
import pages from 'app/config/pages'
import { selectState } from 'cores/reducers/authentication'
import { selectAllCompanies, selectStatus } from 'cores/reducers/company'
import { ICompanyDetail } from 'cores/reducers/interfaces'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { getCompanyList } from 'cores/thunk/company'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

type SearchProps = {
  companyPerson: string
  status: status
}

const FormSearch = styled('form')({
  maxWidth: '70%',
  margin: 'auto',
})

const CompanyList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const companyList = useAppSelector(selectAllCompanies)
  const companyStatus = useAppSelector(selectStatus)
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string | undefined>('')
  const token = useAppSelector(selectState)

  useEffect(() => {
    if (companyStatus === 'idle' && token.token) {
      dispatch(getCompanyList(token.token))
    }
  }, [companyStatus, dispatch, token])

  const headCells: Array<HeadCellProps> = [
    { id: 'no', label: t('NO'), align: 'left', sortable: true },
    { id: 'company', label: t('COMPANY'), align: 'left', sortable: true },
    { id: 'contactPerson', label: t('COMPANY_CONTACT_PERSON'), align: 'left', sortable: true },
    { id: 'telephone', label: t('COMPANY_TELEPHONE'), align: 'left', sortable: true },
    {
      id: 'status',
      label: t('STATUS'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'createBy',
      label: t('CREATED_BY'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'editBy',
      label: t('EDITED_BY'),
      align: 'left',
      sortable: true,
    },
    { id: 'action', label: t('ACTION'), align: 'left', sortable: false },
  ]

  const defaultValues = {
    companyPerson: '',
    status: STATUS.ALL,
  }

  const schema = yup.object().shape({})

  const methods = useForm<SearchProps>({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { handleSubmit, control, getValues } = methods

  interface rowTableProps {
    companyData: Array<any>
    totalRows: number
  }
  const [rows, setRows] = useState<rowTableProps | null>(null)

  const filterData = (dataFilter: Array<ICompanyDetail | null>, status: string, inputSearchField: string | null) => {
    const input = inputSearchField?.toLowerCase()

    return dataFilter && Array.isArray(dataFilter)
      ? // eslint-disable-next-line no-confusing-arrow
        dataFilter.filter((dataFilterItem) =>
          status === STATUS.ALL
            ? input
              ? dataFilterItem?.name.toLowerCase().includes(input) ||
                dataFilterItem?.coordinatorName.toLowerCase().includes(input)
              : true
            : (input
                ? dataFilterItem?.name.toLowerCase().includes(input) ||
                  dataFilterItem?.coordinatorName.toLowerCase().includes(input)
                : true) && dataFilterItem?.status === status,
        )
      : []
  }

  const onSearch = (search: SearchProps) => {
    let dataSearch: Array<ICompanyDetail | null> = []
    let totalRows = 0

    if (companyList && Array.isArray(companyList)) {
      dataSearch = filterData(companyList || [], search.status, search?.companyPerson || null)
      totalRows = dataSearch.length
    }
    const companyData = dataSearch.map((data, i) => {
      const companyId = data?.id
      const actionSubmenu: any = []

      actionSubmenu.push({
        icon: (
          <RestrictedPermission permission={[ETier.KBANK_ADMIN]}>
            <EditIcon fontSize="small" sx={{ color: '#0C5E96' }} />
          </RestrictedPermission>
        ),
        link: companyId
          ? () => {
              navigate(`${pages.companyPath}/${companyId}/edit`)
            }
          : null,
      })

      return {
        no: (page - 1) * DefaultLimit + (i + 1),
        company: data?.name,
        contactPerson: data?.coordinatorName,
        telephone: data?.coordinatorTel,
        status:
          data?.status === 'active'
            ? `${t('STATUS_ACTIVE')}`
            : data?.status === 'inactive'
            ? `${t('STATUS_INACTIVE')}`
            : `${t('STATUS_DELETE')}`,
        createBy: `${data?.createBy}
                  ${dayjs(data?.createDt).format('D MMM YYYY HH:mm')}`,
        editBy: dayjs(data?.lastEditDt).format('D MMM YYYY HH:mm'),
        action: actionSubmenu?.length > 0 ? <MenuAction submenu={actionSubmenu} /> : null,
      }
    })

    setRows({ companyData, totalRows })
  }
  useEffect(() => {
    if (companyList) {
      onSearch(getValues())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property?: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Box>
      <ListTypo desc={` ${t('COMPANY_COMPANY_LIST')}`} />
      <FormProvider {...methods}>
        <FormSearch onSubmit={handleSubmit(onSearch)}>
          <Grid container spacing={3}>
            <Grid item lg={7}>
              <Controller
                name="companyPerson"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div>
                    <TextField
                      name="companyPerson"
                      type="text"
                      id="outlined-basic input-with-icon-textfield"
                      value={value}
                      placeholder={`${t('COMPANY_LIST_SEARCH_COMPANY')}`}
                      onChange={onChange}
                      error={!!error}
                      autoComplete="off"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        sx: { height: 44 },
                      }}
                      variant="outlined"
                    />
                  </div>
                )}
              />
            </Grid>
            <Grid item lg={4}>
              <div>
                <Typography variant="h4" sx={{ margin: '-25px 0 5px' }}>
                  {t('STATUS')}
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <OptionSelect
                      value={value}
                      onChange={onChange}
                      error={error}
                      width={320}
                      option={SelectAllCompanyStatus}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item lg={1}>
              <div>
                <Button type="submit" variant="outlined">
                  {t('SEARCH')}
                </Button>
              </div>
            </Grid>
          </Grid>
        </FormSearch>
      </FormProvider>
      <br />

      <RestrictedPermission permission={[ETier.KBANK_ADMIN]}>
        <AddButton desc={t('COMPANY_LIST_ADD_COMPANY')} url={`${pages.companyAddPath}`} />
      </RestrictedPermission>
      <TableSort
        rows={rows?.companyData || []}
        headCells={headCells}
        handleChangePage={handleChangePage}
        page={page}
        handleRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
      />
    </Box>
  )
}

export default CompanyList

