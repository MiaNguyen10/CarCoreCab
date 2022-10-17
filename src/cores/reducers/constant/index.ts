import { createSlice } from '@reduxjs/toolkit'
import { PlainObject } from 'cores/utils/commonType'
import { getProvinceList } from 'cores/thunk/constant'

const initialState: IConstantState = {
  status: 'idle',
  error: '',
  provinces: [],
}

export interface IConstantState extends PlainObject {
  provinces?: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const constantSlice = createSlice({
  name: 'constant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProvinceList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.provinces = action.payload as string[]
      })
      .addCase(getProvinceList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const reducers = constantSlice.reducer
export const selectConstant = (state: { constant: IConstantState }) => state.constant
export const selectProvinceList = (state: { constant: IConstantState }) => state.constant.provinces

