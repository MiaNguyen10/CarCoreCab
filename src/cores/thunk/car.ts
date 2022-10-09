import { CarService } from 'cores/services/CarService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ICarListInput,
  ICountCar,
  ICreateCarInput,
  IApproveCarInput,
  IDisapproveCarInput,
  IRevokeCarInput,
  IEditCarInput,
  IGetCarDetailInput,
} from 'cores/reducers/interfaces'
import Container from 'typedi'

export const getCarNumber = createAsyncThunk('car/getCarNumber', async (inputCountCar: ICountCar) => {
  const carService = Container.get(CarService)
  const response = await carService.countCar({ ...inputCountCar })

  return response
})

export const getCarList = createAsyncThunk('car/getCarList', async (inputCarList: ICarListInput) => {
  const carService = Container.get(CarService)
  const response = await carService.fetchCar({ ...inputCarList })

  return response
})

export const addCar = createAsyncThunk('car/addCar', async (input: ICreateCarInput) => {
  const carService = Container.get(CarService)
  const response = await carService.createCar({ ...input })

  return response
})

export const approveCar = createAsyncThunk('car/approveCar', async (input: IApproveCarInput) => {
  const carService = Container.get(CarService)
  const response = await carService.approveCar({ ...input })

  return response
})

export const disapproveCar = createAsyncThunk('car/disapproveCar', async (input: IDisapproveCarInput) => {
  const carService = Container.get(CarService)
  const response = await carService.disapproveCar({ ...input })

  return response
})

export const revokeCar = createAsyncThunk('car/revokeCar', async (input: IRevokeCarInput) => {
  const carService = Container.get(CarService)
  const response = await carService.revokeCar({ ...input })

  return response
})

export const editCar = createAsyncThunk('car/editCar', async (input: IEditCarInput) => {
  const carService = Container.get(CarService)
  const response = await carService.editCar({ ...input })

  return response
})

export const getCarDetail = createAsyncThunk('car/getCarDetail', async (input: IGetCarDetailInput) => {
  const carService = Container.get(CarService)
  const response = await carService.getCarDetail({ ...input })

  return response
})
