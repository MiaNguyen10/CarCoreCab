import { getCompanyDetail, addCompany, editCompany, getCompanyList } from 'cores/thunk/company'
import { createSlice } from '@reduxjs/toolkit'
import { PlainObject } from 'cores/utils/commonType'
import { ICompanyDetail } from 'cores/reducers/interfaces'

const initialState: ICompanyState = {
  status: 'idle',
  error: '',
  companies: [],
}

export interface ICompanyState extends PlainObject {
  companies?: ICompanyDetail[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
  companyDetail?: ICompanyDetail
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    resetCompanyStatus(state) {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCompanyDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.companyDetail = action.payload as ICompanyDetail
      })
      .addCase(getCompanyDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getCompanyList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCompanyList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.companies = action.payload
      })
      .addCase(getCompanyList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addCompany.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editCompany.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editCompany.fulfilled, (state, action) => {
        const { companyId, name, coordinatorName, coordinatorTel, status } = action.meta.arg
        const existingCompany = state.companies?.find((company) => company.id === companyId)
        if (existingCompany) {
          existingCompany.name = name
          existingCompany.coordinatorName = coordinatorName
          existingCompany.coordinatorTel = coordinatorTel
          existingCompany.status = status
        }
        state.status = 'succeeded'
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { resetCompanyStatus } = companySlice.actions
export const reducers = companySlice.reducer
export const selectAllCompanies = (state: { company: ICompanyState }) => state.company.companies
export const selectCompanyById = (state: { company: ICompanyState }, companyId: string) =>
  state.company.companies?.find((company) => company.id === companyId)
export const selectStatus = (state: { company: ICompanyState }) => state.company.status

