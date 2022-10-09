import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { AuthReducer, CarReducer, CompanyReducer, UserReducer } from 'cores/reducers'

export const store = configureStore({
  reducer: {
    auth: AuthReducer.reducers,
    user: UserReducer.reducers,
    company: CompanyReducer.reducers,
    car: CarReducer.reducers,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

