/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, styled, Typography } from '@mui/material'
import {
  ConfirmDialog,
  FullScreenDialog,
  HeadCellProps,
  ListTypo,
  MenuAction,
  Order,
  StatusColumn,
  TableSort,
} from 'app/components'
import { DefaultLimit, STATUS } from 'app/config/Constant'
import { carStatus } from 'app/config/interfaces'
import pages from 'app/config/pages'
import { ETier, RestrictedPermission } from 'app/middlewares/PermissionProvider'
import { AddCarButton, AddCarPopup, CarFormList } from 'app/pages/carPage/components/index'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { selectState } from 'cores/reducers/authentication'
import { getAllCars, getCarStatus, selectCarNumber } from 'cores/reducers/car'
import { ICarDetail } from 'cores/reducers/interfaces'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { addCar, getCarList, getCarNumber } from 'cores/thunk/car'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { ICarCheckDuplicate } from './components/AddCarPopup'

export type SearchProps = {
  searchInput: string
  brand: string
  model: string
  status: carStatus
}

const BoxStyled = styled(Box)({
  marginBottom: '150px',
})

export interface IFilterCarData {
  dataFilter: Array<ICarDetail | null>
  status: string
  inputSearchField: string | null
  brand: string
  model: string
}

export interface rowTableProps {
  carData: Array<any>
  totalRows: number
}

const CarList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const carNumb = Number(useAppSelector(selectCarNumber))
  const carList = useAppSelector(getAllCars)
  const carStatus = useAppSelector(getCarStatus)
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string | undefined>('')
  const token = useAppSelector(selectState)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [carErrorMessage, setCarErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    if (token.token) {
      try {
        if (carStatus === 'idle') {
          dispatch(
            getCarNumber({
              token: token.token,
              makeBrand: 'toyota',
              model: 'izx',
              status: STATUS.ACTIVE,
            }),
          )
          dispatch(
            getCarList({
              token: token.token,
              startFrom: 1,
              endAt: carNumb < page * DefaultLimit ? carNumb : page * DefaultLimit,
              status: STATUS.ACTIVE,
            }),
          )
        }
        setCarErrorMessage(undefined)
      } catch (error) {
        const errorMessage = backendErrorToMessage(error as IError)
        setCarErrorMessage(errorMessage)
      }
    }
  }, [carNumb, carStatus, dispatch, page, token.token])

  const handleFormSubmit = async ({ licensePlateNo, province }: ICarCheckDuplicate): Promise<void> => {
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
        setCarErrorMessage(undefined)
        setOpenPopup(false)
      }
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)
      setCarErrorMessage(errorMessage)
    }
  }

  const headCells: Array<HeadCellProps> = [
    { id: 'no', label: t('NO'), align: 'left', sortable: false },
    {
      id: 'status',
      label: t('STATUS'),
      align: 'left',
      sortable: true,
    },
    { id: 'licensePlateNo', label: t('CAR_LICENSE_PLATE_NO'), align: 'left', sortable: true },
    { id: 'brand', label: t('CAR_MAKE_BRAND'), align: 'left', sortable: true },
    { id: 'model', label: t('CAR_MODEL'), align: 'left', sortable: true },
    { id: 'subModel', label: t('CAR_SUB_MODEL'), align: 'left', sortable: true },
    {
      id: 'modelYear',
      label: t('CAR_MODEL_YEAR'),
      align: 'left',
      sortable: true,
    },
    { id: 'province', label: t('CAR_PROVINCE'), align: 'left', sortable: true },
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
    brand: `${t('CAR_ALL_BRAND')}`,
    model: `${t('CAR_ALL_MODEL')}`,
    status: STATUS.ALL,
  }

  const schema = yup.object().shape({})

  const methods = useForm<SearchProps>({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { handleSubmit, control, getValues } = methods

  const onSearch = (search: SearchProps) => {
    setPage(1)
    if (carList && Array.isArray(carList)) {
      if (token.token) {
        try {
          dispatch(
            getCarNumber({
              token: token.token,
              makeBrand: search.brand,
              model: search.model,
              status: search.status,
            }),
          )
          dispatch(
            getCarList({
              token: token.token,
              startFrom: 1,
              endAt: carNumb < page * DefaultLimit ? carNumb : page * DefaultLimit,
              status: search.status,
              licensePlateDigit: search?.searchInput,
            }),
          )
          setCarErrorMessage(undefined)
        } catch (error) {
          const errorMessage = backendErrorToMessage(error as IError)
          setCarErrorMessage(errorMessage)
        }
      }
    }
  }

  const carData = carList.map((data, i) => {
    const carId = data?.id
    const actionSubmenu: any = []
    actionSubmenu.push({
      icon: <VisibilityIcon fontSize="small" sx={{ color: '#0C5E96' }} />,
      link: carId
        ? () => {
            navigate(`${pages.carPath}/${carId}`)
          }
        : null,
    })

    actionSubmenu.push({
      icon: (
        <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER, ETier.COMPANY_LABELER]}>
          <EditIcon fontSize="small" sx={{ color: '#0C5E96' }} />
        </RestrictedPermission>
      ),
      link: carId
        ? () => {
            navigate(`${pages.carPath}/${carId}/edit`)
          }
        : null,
    })

    {
      data?.status === STATUS.DRAFT
        ? actionSubmenu.push({
            icon: (
              <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER]}>
                <DeleteIcon fontSize="small" sx={{ color: '#0C5E96' }} />
              </RestrictedPermission>
            ),
            link: carId
              ? () => {
                  setOpenDelete(true)
                }
              : null,
          })
        : true
    }

    return {
      no: i + 1,
      status: <StatusColumn status={data?.status} />,
      licensePlateNo: data?.licensePlateNo,
      brand: data?.makeBrand,
      model: data?.model,
      subModel: data?.subModel,
      modelYear: data?.modelYear,
      province: data?.province,
      createBy: data?.submitterId,
      editBy: data?.lastUpdateById,
      action: actionSubmenu?.length > 0 ? <MenuAction submenu={actionSubmenu} /> : null,
    }
  })

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
    if (token.token) {
      dispatch(
        getCarList({
          token: token.token,
          startFrom: DefaultLimit * (newPage - 1) + 1,
          endAt: carNumb < newPage * DefaultLimit ? carNumb : newPage * DefaultLimit,
          status: getValues('status'),
          licensePlateDigit: getValues('searchInput'),
        }),
      )
    }
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property?: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClose = () => {
    setOpenDelete(false)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  return (
    <BoxStyled>
      <ListTypo desc={` ${t('CAR_CAR_LIST')}`} />
      <CarFormList methods={methods} handleSubmit={handleSubmit} onSearch={onSearch} control={control} />
      <br />
      <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER, ETier.COMPANY_LABELER]}>
        <AddCarButton desc={t('CAR_LIST_ADD_CAR')} handleClick={() => setOpenPopup(true)} />
      </RestrictedPermission>
      {carErrorMessage && (
        <Typography variant="h4" align="center" sx={{ color: '#d32f2f', m: 7 }}>
          {t(carErrorMessage)}
        </Typography>
      )}
      <TableSort
        rows={carData || []}
        headCells={headCells}
        handleChangePage={handleChangePage}
        page={page}
        handleRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
      />
      <FullScreenDialog open={openDelete} width={292} height={107.5} handleClose={handleClose}>
        <ConfirmDialog
          desc={t('CAR_LIST_DELETE_DIALOG')}
          btnClose={t('CAR_LIST_NO')}
          btnSubmit={t('CAR_LIST_YES')}
          handleClose={handleClose}
          handleSubmit={handleClose}
        />
      </FullScreenDialog>
      <AddCarPopup
        open={openPopup}
        handleClose={handleClosePopup}
        onFormSubmit={handleFormSubmit}
        errorMessage={carErrorMessage}
      />
    </BoxStyled>
  )
}

export default CarList

