import { getCarList, getCarNumber, addCar, getCarDetail } from 'cores/thunk/car'
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit'
import Container from 'typedi'
import { ICarDetail, RequestState, IGetCarDetailResponse } from 'cores/reducers/interfaces'
import { ConfigService } from 'app/config/ConfigService'
import { PlainObject } from 'cores/utils/commonType'

const config = Container.get(ConfigService).car

const initialState: CarState = {
  numberOfCarCase: '',
  status: RequestState.IDEAL,
  cars: [],
  error: '',
  carDetail: {
    registrationBook: {
      licensePlateNo: '',
      province: '',
    },
  },
}

export interface CarState extends PlainObject {
  numberOfCarCase: string
  status: RequestState
  cars: ICarDetail[]
  error?: string
  carId?: string
  carDetail: IGetCarDetailResponse
}

export const carSlice = createSlice({
  name: config.stateName,
  initialState: initialState,
  reducers: {
    resetCarStatus(state) {
      state.status = RequestState.IDEAL
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarNumber.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.numberOfCarCase = action.payload.numberOfCarCase
      })
      .addCase(getCarNumber.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
      .addCase(getCarList.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.cars = action.payload.cars
      })
      .addCase(getCarList.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
      .addCase(addCar.pending, (state) => {
        state.status = RequestState.LOADING
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.carId = action?.payload?.carId ?? ''
      })
      .addCase(addCar.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
      .addCase(getCarDetail.pending, (state) => {
        state.status = RequestState.LOADING
      })
      .addCase(getCarDetail.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.carDetail = action.payload as IGetCarDetailResponse
      })
      .addCase(getCarDetail.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
  },
})

export const { resetCarStatus } = carSlice.actions
export const reducers = carSlice.reducer
export const selectCarNumber = (state: { car: CarState }) => state.car.numberOfCarCase
export const getAllCars = (state: { car: CarState }) => state.car.cars
export const getCarStatus = (state: { car: CarState }) => state.car.status
export const getCarId = (state: { car: CarState }) => state?.car?.carId
export const getCarInfo = (state: { car: CarState }) => state?.car?.carDetail
