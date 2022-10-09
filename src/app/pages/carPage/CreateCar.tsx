import React, { useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import CarLabel from './components/CarLabel'
import { selectState } from 'cores/reducers/authentication'
import { getCarId } from 'cores/reducers/car'
import { addCar, approveCar, disapproveCar, revokeCar } from 'cores/thunk/car'
import { ICarInformation } from './types'

type HandleFormSubmitType = (data?: ICarInformation) => Promise<void>

const CreateCar = (): JSX.Element => {
  const { licensePlate } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectState)
  const carId = useAppSelector(getCarId)

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

