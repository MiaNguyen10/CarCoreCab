import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import React, { useEffect, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useSession } from 'app/middlewares/hooks/useSession'
import { ICarInformation } from 'app/pages/carPage/types'
import { selectState } from 'cores/reducers/authentication'
import { getCarId } from 'cores/reducers/car'
import { addCar, approveCar, disapproveCar, revokeCar } from 'cores/thunk/car'
import CarLabel from 'app/pages/carPage/components/CarLabel'

type HandleFormSubmitType = (data?: ICarInformation) => Promise<void>

const CreateCar = (): JSX.Element => {
  const { licensePlate } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectState)
  const carId = useAppSelector(getCarId)
  const isCreated = useRef(false)

  const [carInformation, setcarInfomation] = useReducer(
    (state: ICarInformation, newState: Partial<ICarInformation>) => ({
      ...state,
      ...newState,
    }),
    {
      registrationBook: {
        licensePlateNo: licensePlate?.split(':')[0] ?? '',
        province: licensePlate?.split(':')[1] ?? '',
      },
    },
  )

  const handleFormSubmit: HandleFormSubmitType = async (data = carInformation) => {
    setcarInfomation({
      registrationBook: data?.registrationBook,
      carPhotos: data?.carPhotos,
      console: data?.console,
      dashboard: data?.dashboard,
      taxSign: data?.taxSign,
    })
    if (token.token && licensePlate) {
      await dispatch(
        addCar({
          token: token.token,
          registrationBook: data?.registrationBook,
          carPhotos: data?.carPhotos,
          console: data?.console,
          dashboard: data?.dashboard,
          taxSign: data?.taxSign,
        }),
      ).unwrap()
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

  const handleAddCar = async (): Promise<void> => {
    setcarInfomation({
      registrationBook: carInformation?.registrationBook,
      carPhotos: carInformation?.carPhotos,
      console: carInformation?.console,
      dashboard: carInformation?.dashboard,
      taxSign: carInformation?.taxSign,
    })
    if (token.token && licensePlate) {
      await dispatch(
        addCar({
          token: token.token,
          registrationBook: carInformation?.registrationBook,
          carPhotos: carInformation?.carPhotos,
          console: carInformation?.console,
          dashboard: carInformation?.dashboard,
          taxSign: carInformation?.taxSign,
        }),
      ).unwrap()
    }
  }

  const handleSessionTimeout = () => {
    if (isCreated.current === false) {
      handleAddCar()
    }
  }

  const sessionTimeout = useSession(handleSessionTimeout)

  useEffect(() => {
    sessionTimeout
  }, [sessionTimeout])

  return (
    <CarLabel
      carInformation={carInformation}
      onFormSubmit={handleFormSubmit}
      onApproveCar={handleApproveCar}
      onDisapproveCar={handleDisapproveCar}
      onWithdrawCar={handleWithdrawCar}
    />
  )
}

export default CreateCar

