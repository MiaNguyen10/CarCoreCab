import { createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from 'app/config/Constant'
import Container from 'typedi'
import { ConstantService } from 'cores/services/ConstantService'

export const getProvinceList = createAsyncThunk('province/list', async (token: string) => {
  const constantService = Container.get(ConstantService)
  const response = await constantService.getProvinceList(token, STATUS.ACTIVE)
  const { provinces } = response

  return provinces
})
