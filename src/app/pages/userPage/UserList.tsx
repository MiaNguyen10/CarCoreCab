/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GridEnrichedColDef } from '@mui/x-data-grid'
import { Container, Box, Typography, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { trim } from 'lodash'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { useNavigate } from 'react-router-dom'
import DataGridTable from 'app/components/DataGrid/DataGridTable'
import EditIcon from '@mui/icons-material/Edit'
import pages from 'app/config/pages'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'
import { AddButton } from 'app/components'
import { getAllUsers, getUserStatus, resetUserStatus } from 'cores/reducers/user'
import { getUserList } from 'cores/thunk/user'
import { selectState } from 'cores/reducers/authentication'
import SearchUserListForm, { ISearchUserListInput } from './components/SearchUserListForm'

const UserList = (): JSX.Element => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const token = useAppSelector(selectState)
    const userList = useAppSelector(getAllUsers)
    const userStatus = useAppSelector(getUserStatus)

    const [page, setPage] = useState<number>(0)
    const [filters, setFilters] = useState<ISearchUserListInput>(
        {
            searchKey: '',
            company: 'All',
            status: 'all',
        }
    )

    const handlePageChange = (page: number): void => {
        setPage(page)
    }

    const rows = useMemo(() => {
        const { searchKey, company, status } = filters

        return userList.filter((user) => {
            const isFoundNameOrEmail = (user?.email.toLowerCase().search(trim(searchKey.toLowerCase())) >= 0 ||
            (user?.name?.firstName + user?.name?.lastName).toLowerCase().search(trim(searchKey.toLowerCase())) >= 0)
            const isFoundCompany = (company === 'All' ? true : user?.company === company)
            const isFoundStatus = (status === 'all' ? true : user?.status === status)

            return ( isFoundNameOrEmail && isFoundCompany && isFoundStatus )
        })
    }, [filters, userList])

    const columns: (GridEnrichedColDef)[] = [
        {
            field: 'no',
            headerName: t('NO'),
            width: 20,
            headerAlign: 'center',
            align: 'right',
            disableColumnMenu: true,
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{params?.value ?? '-'}</Typography>
            ),
        },
        {
            field: 'email',
            headerName: t('USER_EMAIL'),
            width: 200,
            headerAlign: 'center',
            align: 'right',
            disableColumnMenu: true,
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{params?.value ?? '-'}</Typography>
            ),
        },
        {
            field: 'name',
            headerName: t('USER_NAME'),
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{`${params?.value?.firstName ?? ''} ${params?.value?.lastName ?? ''}`}</Typography>
            ),
        },
        {
            field: 'company',
            headerName: t('COMPANY'),
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{params?.value ?? '-'}</Typography>
            ),
        },
        {
            field: 'role',
            headerName: t('USER_USER_ROLE'),
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{params?.value ?? '-'}</Typography>
            ),
        },
        {
            field: 'status',
            headerName: t('STATUS'),
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Typography>{params?.value ?? '-'}</Typography>
            ),
        },
        {
            field: 'createBy',
            headerName: t('CREATED_BY'),
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Stack alignItems='flex-start'>
                    <Typography>{params?.value?.by ?? '-'}</Typography>
                    <Typography>{dayjs(params?.value?.date).format('D MMM YYYY HH:mm')}</Typography>
                </Stack>
            ),
        },
        {
            field: 'editBy',
            headerName: t('EDITED_BY'),
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Stack alignItems='center'>
                    <Typography>{params?.value?.by ?? '-'}</Typography>
                    <Typography>{dayjs(params?.value?.date).format('D MMM YYYY HH:mm')}</Typography>
                </Stack>
            ),
        },
        {
            field: 'id',
            headerName: t('ACTION'),
            width: 90,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <EditIcon
                    fontSize="small"
                    sx={{ color: '#0C5E96', cursor: 'pointer' }}
                    onClick={(): void => {
                        navigate(`${pages.userPath}/${params?.value ?? ''}/edit`)
                    }}
                />
            ),
        },
    ]

    useEffect(() => {
        if (token?.token) {
          dispatch(
            getUserList(token.token),
          )
        }
      }, [page])

      useEffect(() => {
        if (userStatus === 'succeeded') {
          dispatch(resetUserStatus())
        }
      }, [])

    return (
        <Container maxWidth='lg' fixed>
            <Stack
                alignItems='center'
                spacing={8}
                sx={{ marginTop: '38px' }}
            >
                <Typography variant='h1'>{t('USER_USER_LIST')}</Typography>
                <SearchUserListForm onSearch={(data): void => setFilters(data)} />
                <Box>
                    <RestrictedPermission permission={[ETier.KBANK_ADMIN, ETier.COMPANY_ADMIN]}>
                        <AddButton desc={t('USER_LIST_ADD_USER')} url={`${pages.userAddPath}`} />
                    </RestrictedPermission>
                    <DataGridTable
                        columns={columns}
                        rows={rows}
                        rowHeight={70}
                        page={page}
                        onPageChange={handlePageChange}
                        rowCount={userList?.length ?? 0}
                        isLoading={userStatus !== 'succeeded'}
                        pagination
                        paginationMode='client'
                    />
                </Box>
            </Stack>
        </Container>
    )
}

export default UserList
