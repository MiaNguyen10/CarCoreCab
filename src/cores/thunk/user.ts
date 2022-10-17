import { createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from 'app/config/Constant'
import { UserService } from 'cores/services/UserService'
import { ICreateUserInput, IGetUserDetailInput, IUpdateUserInput } from 'cores/reducers/interfaces'
import Container from 'typedi'

export const getUserList = createAsyncThunk('user/getUserList', async (token: string) => {
  const userService = Container.get(UserService)
  const { users } = await userService.fetchUser(token, STATUS.ACTIVE)

  const transformedResponse = users.map((user, index) => ({
    no: index + 1,
    id: user?.id ?? '',
    email: user?.email ?? '',
    name: {
      firstName: user?.name ?? '',
      lastName: user?.surname ?? '',
    },
    company: user?.companyId ?? '',
    role: user?.role ?? '',
    status: user?.status ?? '',
    createBy: {
      by: user?.createBy ?? '',
      date: user?.createDt ?? '',
    },
    editBy: {
      by: user?.lastEditBy ?? '',
      date: user?.lastEditDt ?? '',
    },
  }))

  return transformedResponse
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

