import { createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from 'app/config/Constant'
import { ICompanyCreateInput, ICompanyUpdateInput, IGetCompanyDetailInput } from 'cores/reducers/interfaces'
import Container from 'typedi'
import { CompanyService } from 'cores/services/CompanyService'

export const getCompanyList = createAsyncThunk('company/getCompanyList', async (token: string) => {
  const companyService = Container.get(CompanyService)
  const response = await companyService.fetchCompany(token, STATUS.ACTIVE)

  const { companies } = response

  return companies
})

export const addCompany = createAsyncThunk('company/addCompany', async (inputCreate: ICompanyCreateInput) => {
  const companyService = Container.get(CompanyService)
  const response = await companyService.createCompany({ ...inputCreate })

  return response
})

export const editCompany = createAsyncThunk('company/editCompany', async (inputUpdate: ICompanyUpdateInput) => {
  const companyService = Container.get(CompanyService)
  const response = await companyService.updateCompany({
    ...inputUpdate,
  })

  return response
})

export const getCompanyDetail = createAsyncThunk('user/getCompanyDetail', async (input: IGetCompanyDetailInput) => {
  const companyService = Container.get(CompanyService)
  const response = await companyService.getCompanyDetail({ ...input })

  return response
})

