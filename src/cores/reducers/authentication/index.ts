import Container from 'typedi'
import axios, { AxiosError } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ConfigService } from 'app/config/ConfigService'

import { LocalStorageAdapter } from 'cores/adapters/LocalStorageAdapter'
import { HttpException } from 'cores/exceptions/HttpException'
import { IBackendErrorResponse, RequestState } from 'cores/reducers/interfaces'
import { AuthService } from 'cores/services/AuthService'
import { PlainObject } from 'cores/utils/commonType'
import { ITokenData, tokenDecoder } from 'cores/reducers/tokenDecoder'
import { RootState } from 'cores/store'
import { IExtendSession, ILoginResult } from 'cores/services/interfaces'

const initialState: AuthenticationState = {
  sessionId: undefined,
  token: undefined,
  requireAction: undefined,
  status: RequestState.IDEAL,
  errorCode: undefined,
}

const defautAuthState: DecodedAuthState = {
  sessionId: '',
  token: '',
  requireAction: '',
  status: RequestState.IDEAL,
  errorCode: '',
  username: '',
  teir: '',
  scope: '',
  expire: 0,
}

const { authentication } = Container.get(ConfigService)
const localStorageAdapter = Container.get(LocalStorageAdapter)
const preloadState = localStorageAdapter.loadState<AuthenticationState>(authentication.stateName)

export type DecodedAuthState = AuthenticationState & ITokenData

export interface AuthenticationState extends PlainObject {
  sessionId?: string
  token?: string
  requireAction?: string
  status: RequestState
  errorCode?: string
}

export interface ICredentials {
  email: string
  password: string
}

export const login = createAsyncThunk('authentication/login', async ({ email, password }: ICredentials) => {
  const authenService = Container.get(AuthService)
  let response: ILoginResult

  try {
    response = await authenService.login(email, password)
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

export const extendSession = createAsyncThunk('authentication/extend', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const authenService = Container.get(AuthService)
  let response: IExtendSession

  try {
    response = await authenService.extend(state.auth.token!, state.auth.sessionId!)
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

export const selectSession = (state: RootState) => state.auth.sessionId
export const selectState = (state: RootState): DecodedAuthState => {
  if (!state.auth.sessionId) {
    return defautAuthState
  }

  const tokenData = tokenDecoder(state.auth.token ?? '')

  return {
    ...state.auth,
    ...tokenData,
  }
}

export const authenSlice = createSlice({
  name: authentication.stateName,
  initialState: preloadState ?? initialState,
  reducers: {
    logout(state) {
      state.sessionId = initialState.sessionId
      state.token = initialState.token
      state.requireAction = initialState.requireAction

      localStorageAdapter.saveState(authentication.stateName, state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = RequestState.REQUESTING
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestState.IDEAL
        state.sessionId = action.payload.sessionId
        state.token = action.payload.token
        state.requireAction = action.payload.requireAction

        localStorageAdapter.saveState(authentication.stateName, state)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.errorCode = action.error.code
      })
      .addCase(extendSession.pending, (state) => {
        state.status = RequestState.REQUESTING
      })
      .addCase(extendSession.fulfilled, (state, action) => {
        state.status = RequestState.IDEAL
        state.token = action.payload.token

        localStorageAdapter.saveState(authentication.stateName, state)
      })
      .addCase(extendSession.rejected, (state, action) => {
        state.status = RequestState.FAILED
        state.errorCode = action.error.code
      })
  },
})

export const { logout } = authenSlice.actions
export const reducers = authenSlice.reducer

