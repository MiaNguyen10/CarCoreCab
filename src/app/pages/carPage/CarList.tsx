/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Stack, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { GridEnrichedColDef, GridSelectionModel } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { addCar, getCarList, getCarNumber } from 'cores/thunk/car'
import { getAllCars, getCarStatus, selectCarNumber } from 'cores/reducers/car'
import { STATUS } from 'app/config/Constant'
import { selectState } from 'cores/reducers/authentication'
import DataGridTable from 'app/components/DataGrid/DataGridTable'
import ApprovedIcon from 'app/assets/icons/ApprovedIcon'
import DraftIcon from 'app/assets/icons/DraftIcon'
import PendingIcon from 'app/assets/icons/PendingIcon'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchCarListForm, { ISearchCarListInput } from './components/SearchCarListForm'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'
import { AddCarButton, AddCarPopup } from 'app/pages/carPage/components/index'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { ICarCheckDuplicate } from './components/AddCarPopup'
import { ConfirmDialog, FullScreenDialog } from 'app/components'

interface ICarFilters {
    licensePlate?: string
    makeBrand?: string
    model?: string
    status?: string
}

const CarList = (): JSX.Element => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [page, setPage] = useState<number>(0)
    const [isOpenAddCarPopup, setIsOpenAddCarPopup] = useState<boolean>(false)
    const [isOpenApprovePopup, setIsOpenApprovePopup] = useState<boolean>(false)
    const [isOpenRejectPopup, setIsOpenRejectPopup] = useState<boolean>(false)
    const [addCarErrorMessage, setAddCarErrorMessage] = useState<string | undefined>()
    const [carsSelected, setCarsSelected] = useState<GridSelectionModel>([])
    const [filters, setFilters] = useState<ICarFilters>({})

    const token = useAppSelector(selectState)
    const carList = useAppSelector(getAllCars)
    const carStatus = useAppSelector(getCarStatus)
    const totalCars = useAppSelector(selectCarNumber)

    const handlePageChange = (page: number): void => {
        setPage(page)
    }

    const handleSearchFormSubmit = ({
        licensePlate,
        makeBrand,
        model,
        status,
    }: ISearchCarListInput): void => {
        setFilters({
            licensePlate: licensePlate || undefined,
            makeBrand: makeBrand === 'All' ? undefined : makeBrand,
            model: model === 'All' ? undefined : model,
            status: status === 'all' ? undefined : status,
        })
    }

    const handleAddCarFormSubmit = async ({ licensePlateNo, province }: ICarCheckDuplicate): Promise<void> => {
        try {
          if (token.token) {
            await dispatch(
              addCar({
                token: token.token,
                registrationBook: {
                  licensePlateNo,
                  province,
                },
              }),
            ).unwrap()
            setAddCarErrorMessage(undefined)
            setIsOpenAddCarPopup(false)
          }
        } catch (error) {
          const errorMessage = backendErrorToMessage(error as IError)
          setAddCarErrorMessage(errorMessage)
        }
      }

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
            field: 'status',
            headerName: t('STATUS'),
            width: 70,
            headerAlign: 'center',
            align: 'right',
            disableColumnMenu: true,
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <Box>
                    {
                        params?.value === STATUS.DRAFT ?
                            <DraftIcon /> : params?.value === STATUS.PENDING ?
                            <PendingIcon /> : <ApprovedIcon />
                    }
                </Box>
            ),
        },
        {
            field: 'licensePlateNo',
            headerName: t('CAR_LICENSE_PLATE_NO'),
            width: 150,
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
            field: 'makeBrand',
            headerName: t('CAR_MAKE_BRAND'),
            width: 120,
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
            field: 'model',
            headerName: t('CAR_MODEL'),
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
            field: 'submodel',
            headerName: t('CAR_SUB_MODEL'),
            width: 250,
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
            field: 'modelYear',
            headerName: t('CAR_MODEL_YEAR'),
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
            field: 'province',
            headerName: t('CAR_PROVINCE'),
            width: 150,
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
            field: 'submitterId',
            headerName: t('CREATED_BY'),
            width: 120,
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
            field: 'lastUpdateById',
            headerName: t('EDITED_BY'),
            width: 120,
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
            field: 'id',
            headerName: t('ACTION'),
            width: 60,
            headerAlign: 'center',
            align: 'center',
            renderHeader: (params): JSX.Element => (
                <Typography>{params.colDef.headerName}</Typography>
            ),
            renderCell: (params): JSX.Element => (
                <VisibilityIcon
                    fontSize="small"
                    sx={{ color: '#0C5E96', cursor: 'pointer' }}
                    onClick={(): void => {
                        navigate(`/car/${params?.value ?? ''}/edit`)
                    }}
                />
            ),
        },
    ]

    useEffect(() => {
        if (token?.token) {
          dispatch(
            getCarList({
              token: token.token,
              filter: {
                startFrom: 10 * (page),
                endAt: 10 * (page) + 9,
                ...filters,
              },
            }),
          )
        }
      }, [page, filters])

      useEffect(() => {
        if (token?.token) {
            dispatch(
              getCarNumber({
                  token: token.token,
              })
            )
          }
      }, [token])

    return (
        <Container maxWidth='lg' fixed>
            <Stack
                alignItems='center'
                spacing={8}
                sx={{ marginTop: '38px' }}
            >
                <Typography variant='h1'>{t('CAR_CAR_LIST')}</Typography>
                <SearchCarListForm onFormSubmit={handleSearchFormSubmit} />
                <Box>
                    <Stack direction='row' sx={{ float: 'left', marginBottom: '10px' }} spacing={3}>
                        <RestrictedPermission permission={[ETier.COMPANY_ADMIN, ETier.COMPANY_CHECKER]}>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={(): void => setIsOpenApprovePopup(true)}
                            >
                                <Typography variant="h5" fontWeight="900" margin="5px">
                                {t('CAR_LIST_APPROVE')}
                                </Typography>
                            </Button>
                        </RestrictedPermission>
                        <RestrictedPermission permission={[ETier.COMPANY_ADMIN, ETier.COMPANY_CHECKER]}>
                            <Button
                                variant="contained"
                                color="error"
                                size="medium"
                                onClick={(): void => setIsOpenRejectPopup(true)}
                            >
                                <Typography variant="h5" fontWeight="900" margin="5px">
                                {t('CAR_LIST_REJECT')}
                                </Typography>
                            </Button>
                        </RestrictedPermission>
                    </Stack>
                    <RestrictedPermission
                        permission={[ETier.COMPANY_ADMIN, ETier.COMPANY_CHECKER, ETier.COMPANY_LABELER]}
                    >
                        <AddCarButton desc={t('CAR_LIST_ADD_CAR')} handleClick={() => setIsOpenAddCarPopup(true)} />
                    </RestrictedPermission>
                    <DataGridTable
                        columns={columns}
                        rows={carList}
                        rowHeight={55}
                        page={page}
                        onPageChange={handlePageChange}
                        rowCount={totalCars ?? 0}
                        isLoading={carStatus !== 'succeeded'}
                        pagination
                        checkboxSelection={
                            token?.teir === ETier.COMPANY_ADMIN || token?.teir === ETier.COMPANY_CHECKER
                        }
                        onSelectionModelChange={(selections): void => setCarsSelected(selections)}
                        selectionModel={carsSelected}
                        onRowSelectable={(params): boolean => params.row['status'] === STATUS.PENDING}
                    />
                </Box>
            </Stack>
            <AddCarPopup
                open={isOpenAddCarPopup}
                handleClose={(): void => setIsOpenAddCarPopup(false)}
                onFormSubmit={handleAddCarFormSubmit}
                errorMessage={addCarErrorMessage}
            />
            <FullScreenDialog
                open={isOpenApprovePopup}
                width={300} height={107.5}
                handleClose={(): void => setIsOpenApprovePopup(false)}
            >
                <ConfirmDialog
                    desc={t('CAR_LIST_APPROVE_DIALOG')}
                    btnClose={t('CAR_LIST_NO')}
                    btnSubmit={t('CAR_LIST_YES')}
                    handleClose={(): void => setIsOpenApprovePopup(false)}
                    // handleSubmit={}
                />
            </FullScreenDialog>

            <FullScreenDialog
                open={isOpenRejectPopup}
                width={292}
                height={107.5}
                handleClose={(): void => setIsOpenRejectPopup(false)}
            >
                <ConfirmDialog
                    desc={t('CAR_LIST_REJECT_DIALOG')}
                    btnClose={t('CAR_LIST_NO')}
                    btnSubmit={t('CAR_LIST_YES')}
                    handleClose={(): void => setIsOpenRejectPopup(false)}
                    // handleSubmit={}
                />
            </FullScreenDialog>
        </Container>
    )
}

export default CarList
