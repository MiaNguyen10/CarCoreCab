import Container from 'typedi'
import axios, { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserList, addUser, getUserDetail } from 'cores/thunk/user'
import { ConfigService } from 'app/config/ConfigService'
import { UserService } from 'cores/services/UserService'
import { HttpException } from 'cores/exceptions/HttpException'
import { PlainObject } from 'cores/utils/commonType'
import {
  IUserDetail,
  IChangePasswordInput,
  IEditProfileInput,
  IBackendErrorResponse,
  IResetPasswordInput,
  RequestState,
  IUserResponse,
} from 'cores/reducers/interfaces'
import { LocalStorageAdapter } from 'cores/adapters/LocalStorageAdapter'
import { SessionException } from 'cores/exceptions/SessionException'
import { AuthenticationState } from 'cores/reducers/authentication'
import { RootState } from 'cores/store'

const config = Container.get(ConfigService).user

const initialState: UserState = {
  email: '',
  status: RequestState.IDEAL,
  users: [],
  error: '',
  errorCode: undefined,
}

export interface UserState extends PlainObject {
  email: string
  status: RequestState
  users: IUserDetail[]
  userDetail?: IUserResponse
  error?: string
  errorCode?: string
}

export const userSlice = createSlice({
  name: config.stateName,
  initialState: initialState,
  reducers: {
    forgotPassword(_state, action: PayloadAction<string>) {
      const userService = Container.get(UserService)
      userService.forgotPassword(action.payload)
    },
    resetUserStatus(state) {
      state.status = RequestState.IDEAL
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = RequestState.LOADING
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.users = action.payload
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = RequestState.REQUESTING
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = RequestState.IDEAL
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.errorCode = action.error.code
      })
      .addCase(addUser.pending, (state) => {
        state.status = RequestState.LOADING
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = RequestState.SUCCEEDED
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
      .addCase(getUserDetail.pending, (state) => {
        state.status = RequestState.LOADING
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.status = RequestState.SUCCEEDED
        state.userDetail = action.payload as IUserResponse
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.error = action.error.message
      })
  },
})

export const resetPassword = createAsyncThunk('user/resetPassword', async (input: IResetPasswordInput) => {
  const userService = Container.get(UserService)
  let response

  try {
    response = await userService.resetPassword(input)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error as AxiosError<IBackendErrorResponse>
      const errorResponse = backendError.response?.data.header.error

      throw new HttpException(errorResponse?.errorDesc, errorResponse?.errorCode)
    }

    throw new HttpException().withCause(error as Error)
  }

  return response
})

export const changePassword = createAsyncThunk('user/changePassword', async (input: IChangePasswordInput) => {
  const { authentication } = Container.get(ConfigService)
  const userService = Container.get(UserService)
  const localStorageAdapter = Container.get(LocalStorageAdapter)
  const userSession = localStorageAdapter.loadState<AuthenticationState>(authentication.stateName)
  let response

  if (!userSession || !userSession.token) {
    throw new SessionException('Session Expired')
  }

  try {
    const newProfile = {
      token: userSession.token,
      ...input,
    }
    response = await userService.changePassword(newProfile)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error as AxiosError<IBackendErrorResponse>
      const errorResponse = backendError.response?.data.header.error

      throw new HttpException(errorResponse?.errorDesc, errorResponse?.errorCode)
    }

    throw new HttpException().withCause(error as Error)
  }

  return response
})

export const editProfile = createAsyncThunk('user/editProfile', async (input: IEditProfileInput) => {
  const { authentication } = Container.get(ConfigService)
  const userService = Container.get(UserService)
  const localStorageAdapter = Container.get(LocalStorageAdapter)
  const userSession = localStorageAdapter.loadState<AuthenticationState>(authentication.stateName)
  let response

  if (!userSession || !userSession.token) {
    throw new SessionException('Session Expired')
  }

  try {
    const newProfile = {
      token: userSession.token,
      ...input,
    }
    response = await userService.editProfile(newProfile)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error as AxiosError<IBackendErrorResponse>
      const errorResponse = backendError.response?.data.header.error

      throw new HttpException(errorResponse?.errorDesc, errorResponse?.errorCode)
    }

    throw new HttpException().withCause(error as Error)
  }

  return response
})

export const { forgotPassword, resetUserStatus } = userSlice.actions
export const reducers = userSlice.reducer
export const selectState = (state: RootState) => state.auth
export const getAllUsers = (state: { user: UserState }) => state.user.users
export const getUserStatus = (state: { user: UserState }) => state.user.status
export const getUser = (state: { user: UserState }) => state.user.userDetail

