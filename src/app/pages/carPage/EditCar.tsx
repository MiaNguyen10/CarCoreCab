import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import CarLabel from './components/CarLabel'
import { selectState } from 'cores/reducers/authentication'
import { resetCarStatus, getCarStatus, getCarInfo } from 'cores/reducers/car'
import { editCar, approveCar, disapproveCar, revokeCar, getCarDetail } from 'cores/thunk/car'
import { ICarInformation } from './types'

type HandleFormSubmitType = (data?: ICarInformation) => Promise<void>

const EditCar = (): JSX.Element => {
  const { carId } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectState)
  const carStatus = useAppSelector(getCarStatus)
  const carDetail = useAppSelector(getCarInfo)
  // eslint-disable-next-line no-console
  console.log('carDetail = ', carDetail)

  const handleFormSubmit: HandleFormSubmitType = async (data) => {
    if (token.token && carDetail && carId) {
      await dispatch(
        editCar({
          token: token.token,
          id: carId,
          registrationBook: data?.registrationBook ?? carDetail.registrationBook,
          carPhotos: data?.carPhotos ?? carDetail.carPhotos,
          console: data?.console ?? carDetail.console,
          dashboard: data?.dashboard ?? carDetail.dashboard,
          taxSign: data?.taxSign ?? carDetail.taxSign,
        }),
      ).unwrap()
      await dispatch(getCarDetail({ id: carId }))
    }
  }

  const handleApproveCar = async (): Promise<void> => {
    if (token.token && carId) {
      await dispatch(
        approveCar({
          token: token.token,
          carId,
        }),
      ).unwrap()
    }
  }

  const handleDisapproveCar = async (): Promise<void> => {
    if (token.token && carId) {
      await dispatch(
        disapproveCar({
          token: token.token,
          carId,
        }),
      ).unwrap()
    }
  }

  const handleWithdrawCar = async (): Promise<void> => {
    if (token.token && carId) {
      await dispatch(
        revokeCar({
          token: token.token,
          carId,
        }),
      ).unwrap()
    }
  }

  useEffect(() => {
    if (carStatus === 'idle' && carId) {
      dispatch(
        getCarDetail({
          id: carId,
        }),
      )
    }
  }, [carId, carStatus, dispatch])

  useEffect(() => {
    if (carStatus === 'succeeded') {
      dispatch(resetCarStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CarLabel
      carInformation={carDetail}
      onFormSubmit={handleFormSubmit}
      onApproveCar={handleApproveCar}
      onDisapproveCar={handleDisapproveCar}
      onWithdrawCar={handleWithdrawCar}
    />
  )
}

export default EditCar

