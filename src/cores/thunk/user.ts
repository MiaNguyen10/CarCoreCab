import { createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from 'app/config/Constant'
import { UserService } from 'cores/services/UserService'
import { ICreateUserInput, IGetUserDetailInput, IUpdateUserInput } from 'cores/reducers/interfaces'
import Container from 'typedi'

export const getUserList = createAsyncThunk('user/getUserList', async (token: string) => {
  const userService = Container.get(UserService)
  const response = await userService.fetchUser(token, STATUS.ACTIVE)

  const { companies } = response

  return companies
})

export const addUser = createAsyncThunk('user/addUser', async (inputCreate: ICreateUserInput) => {
  const userService = Container.get(UserService)
  const response = await userService.createUser({ ...inputCreate })

  return response
})

export const editUser = createAsyncThunk('user/editUser', async (inputUpdate: IUpdateUserInput) => {
  const userService = Container.get(UserService)
  const response = await userService.updateUser({
    ...inputUpdate,
  })

  return response
})

export const getUserDetail = createAsyncThunk('user/getUserDetail', async (input: IGetUserDetailInput) => {
  const userService = Container.get(UserService)
  const response = await userService.getUserDetail({ ...input })

  return response
})

