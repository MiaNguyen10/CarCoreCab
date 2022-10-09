/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import EditIcon from '@mui/icons-material/Edit'
import { Box, styled } from '@mui/material'
import { AddButton, HeadCellProps, ListTypo, MenuAction, Order, TableSort } from 'app/components'
import { DefaultLimit, STATUS } from 'app/config/Constant'
import { status } from 'app/config/interfaces'
import pages from 'app/config/pages'
import { selectState } from 'cores/reducers/authentication'
import { IUserDetail } from 'cores/reducers/interfaces'
import { getAllUsers, getUserStatus, resetUserStatus } from 'cores/reducers/user'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { getUserList } from 'cores/thunk/user'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import UserFormList from './components/UserFormList'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'

export type SearchProps = {
  searchInput: string
  company: string
  status: status
}

const BoxStyled = styled(Box)({
  marginBottom: '150px',
})

const UserList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userList = useAppSelector(getAllUsers)
  const userStatus = useAppSelector(getUserStatus)
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string | undefined>('')
  const token = useAppSelector(selectState)

  useEffect(() => {
    if (userStatus === 'idle') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dispatch(getUserList(token.token!))
    }
  }, [userStatus, dispatch, token])

  const headCells: Array<HeadCellProps> = [
    { id: 'no', label: t('NO'), align: 'left', sortable: true },
    { id: 'email', label: t('USER_EMAIL'), align: 'left', sortable: true },
    { id: 'name', label: t('USER_NAME'), align: 'left', sortable: true },
    { id: 'company', label: t('COMPANY'), align: 'left', sortable: true },
    { id: 'role', label: t('USER_USER_ROLE'), align: 'left', sortable: true },
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
    searchInput: '',
    company: `${t('USER_ALL_COMPANY')}`,
    status: STATUS.ALL,
  }

  const schema = yup.object().shape({})

  const methods = useForm<SearchProps>({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { handleSubmit, control, getValues } = methods

  interface rowTableProps {
    userData: Array<any>
    totalRows: number
  }
  const [rows, setRows] = useState<rowTableProps | null>(null)

  const filterData = (
    dataFilter: Array<IUserDetail | null>,
    status: string,
    inputSearchField: string | null,
    company: string,
  ) => {
    const input = inputSearchField?.toLowerCase()

    return dataFilter && Array.isArray(dataFilter)
      ? // eslint-disable-next-line no-confusing-arrow
        dataFilter.filter((dataFilterItem) =>
          status === STATUS.ALL
            ? company === `${t('USER_ALL_COMPANY')}`
              ? input
                ? dataFilterItem?.name?.toLowerCase().includes(input) ||
                  dataFilterItem?.surname?.toLowerCase().includes(input) ||
                  dataFilterItem?.email?.toLowerCase().includes(input)
                : true
              : (input
                  ? dataFilterItem?.name?.toLowerCase().includes(input) ||
                    dataFilterItem?.surname?.toLowerCase().includes(input) ||
                    dataFilterItem?.email?.toLowerCase().includes(input)
                  : true) && dataFilterItem?.companyId.includes(company)
            : company === `${t('USER_ALL_COMPANY')}`
            ? (input
                ? dataFilterItem?.name?.toLowerCase().includes(input) ||
                  dataFilterItem?.surname?.toLowerCase().includes(input) ||
                  dataFilterItem?.email?.toLowerCase().includes(input)
                : true) && dataFilterItem?.status === status
            : (input
                ? dataFilterItem?.name?.toLowerCase().includes(input) ||
                  dataFilterItem?.surname?.toLowerCase().includes(input) ||
                  dataFilterItem?.email?.toLowerCase().includes(input)
                : true) &&
              dataFilterItem?.companyId.includes(company) &&
              dataFilterItem?.status === status,
        )
      : []
  }

  const onSearch = (search: SearchProps) => {
    let dataSearch: Array<IUserDetail | null> = []
    let totalRows = 0

    if (userList && Array.isArray(userList)) {
      dataSearch = filterData(userList || [], search.status, search?.searchInput || null, search.company)
      totalRows = dataSearch.length
    }
    const userData = dataSearch.map((data, i) => {
      const userId = data?.id
      const actionSubmenu: any = []

      actionSubmenu.push({
        icon: <EditIcon fontSize="small" sx={{ color: '#0C5E96' }} />,
        link: userId
          ? () => {
              navigate(`${pages.userPath}/${userId}/edit`)
            }
          : null,
      })

      return {
        no: (page - 1) * DefaultLimit + (i + 1),
        email: data?.email,
        name: `${data?.name} ${data?.surname}`,
        company: data?.companyId,
        role: `${data?.role.charAt(0).toUpperCase()}${data?.role.slice(1).toLowerCase()}`,
        status:
          data?.status === 'active'
            ? `${t('STATUS_ACTIVE')}`
            : data?.status === 'inactive'
            ? `${t('STATUS_INACTIVE')}`
            : `${t('STATUS_DELETE')}`,
        createBy: `${data?.createBy} 
                  ${dayjs(data?.createDt).format('D MMM YYYY HH:mm')}`,
        editBy: dayjs(data?.lastEditDt).format('D MMM YYYY HH:mm'),
        action: actionSubmenu?.length > 0 ?
          <RestrictedPermission permission={[ETier.KBANK_ADMIN, ETier.COMPANY_SUPERUSER]}>
            <MenuAction submenu={actionSubmenu} />
          </RestrictedPermission> : null,
      }
    })

    setRows({ userData, totalRows })
  }
  useEffect(() => {
    if (userList) {
      onSearch(getValues())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList])

  useEffect(() => {
    if (userStatus === 'succeeded') {
      dispatch(resetUserStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property?: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <BoxStyled>
      <ListTypo desc={` ${t('USER_USER_LIST')}`} />
      <UserFormList methods={methods} handleSubmit={handleSubmit} onSearch={onSearch} control={control} />
      <br />

      <RestrictedPermission permission={[ETier.KBANK_ADMIN, ETier.COMPANY_SUPERUSER]}>
        <AddButton desc={t('USER_LIST_ADD_USER')} url={`${pages.userAddPath}`} />
      </RestrictedPermission>
      <TableSort
        rows={rows?.userData || []}
        headCells={headCells}
        handleChangePage={handleChangePage}
        page={page}
        handleRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
      />
    </BoxStyled>
  )
}

export default UserList

