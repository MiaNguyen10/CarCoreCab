/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button, styled, Typography } from '@mui/material'
import { ConfirmDialog, FullScreenDialog, ListTypo, TableChecker } from 'app/components'
import MenuAction from 'app/components/Table/MenuAction'
import StatusColumn from 'app/components/Table/StatusColumn'
import { HeadCellProps, Order } from 'app/components/Table/TableSort'
import { DefaultLimit, STATUS } from 'app/config/Constant'
import { carStatus } from 'app/config/interfaces'
import pages from 'app/config/pages'
import { ETier, RestrictedPermission } from 'app/middlewares/PermissionProvider'
import { ICarCheckDuplicate } from 'app/pages/carPage/components/AddCarPopup'
import { AddCarButton, AddCarPopup, CarFormList } from 'app/pages/carPage/components/index'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { selectState } from 'cores/reducers/authentication'
import { getAllCars, getCarStatus, selectCarNumber } from 'cores/reducers/car'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { addCar, getCarList, getCarNumber } from 'cores/thunk/car'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export type SearchProps = {
  searchInput: string
  brand: string
  model: string
  status: carStatus
}

const BoxStyled = styled(Box)({
  marginBottom: '150px',
})

const ButtonStyled = styled(Button)({
  float: 'left',
  marginLeft: '20px',
  marginBottom: '10px',
})

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
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [openApprove, setOpenApprove] = useState<boolean>(false)
  const [openReject, setOpenReject] = useState<boolean>(false)
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

    actionSubmenu.push({
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

  //Change page and sort
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

  //Checker
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = carList.map((n) => (n.status === STATUS.DRAFT ? n.licensePlateNo : ''))
      setSelected(newSelected)

      return
    }
    setSelected([])
  }

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  //Dialog
  const handleClickOpenApprove = () => {
    setOpenApprove(true)
  }

  const handleClickOpenReject = () => {
    setOpenReject(true)
  }

  const handleClose = () => {
    setOpenApprove(false)
    setOpenReject(false)
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
      <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER]}>
        <ButtonStyled variant="contained" color="primary" size="medium" onClick={handleClickOpenApprove}>
          <Typography variant="h5" fontWeight="900" margin="5px">
            {t('CAR_LIST_APPROVE')}
          </Typography>
        </ButtonStyled>
      </RestrictedPermission>
      <RestrictedPermission permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER]}>
        <ButtonStyled variant="contained" color="warning" size="medium" onClick={handleClickOpenReject}>
          <Typography variant="h5" fontWeight="900" margin="5px">
            {t('CAR_LIST_REJECT')}
          </Typography>
        </ButtonStyled>
      </RestrictedPermission>
      {carErrorMessage && (
        <Typography variant="h4" align="center" sx={{ color: '#d32f2f', m: 7 }}>
          {t(carErrorMessage)}
        </Typography>
      )}
      <TableChecker
        rows={carData || []}
        headCells={headCells}
        handleChangePage={handleChangePage}
        page={page}
        handleRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        numSelected={selected.length}
        rowCount={carData.length}
        onSelectAllClick={handleSelectAllClick}
        handleClick={handleClick}
        isSelected={isSelected}
      />
      <FullScreenDialog open={openApprove} width={300} height={107.5} handleClose={handleClose}>
        <ConfirmDialog
          desc={t('CAR_LIST_APPROVE_DIALOG')}
          btnClose={t('CAR_LIST_NO')}
          btnSubmit={t('CAR_LIST_YES')}
          handleClose={handleClose}
          handleSubmit={handleClose}
        />
      </FullScreenDialog>

      <FullScreenDialog open={openReject} width={292} height={107.5} handleClose={handleClose}>
        <ConfirmDialog
          desc={t('CAR_LIST_REJECT_DIALOG')}
          btnClose={t('CAR_LIST_NO')}
          btnSubmit={t('CAR_LIST_YES')}
          handleClose={handleClose}
          handleSubmit={handleClose}
        />
      </FullScreenDialog>

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

