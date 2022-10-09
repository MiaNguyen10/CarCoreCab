import { configureStore } from '@reduxjs/toolkit'

export const mockGetUserDetailResponse = {
    companyId: 'K1412',
    createBy: 'USaKu',
    createDt: '2006-01-02T15:04:05.000+07:00',
    email: 'h.thrift@email.com',
    id: 'k1412',
    lastEditDt: '2006-01-02T15:04:05.000+07:00',
    name: 'H.thrift',
    role: 'viewer',
    status: 'active',
    surname: 'KID',
}

export const mockUserDetailState = {
    status: 'succeeded',
    userDetail: {
      companyId: 'K1412',
      createBy: 'USaKu',
      createDt: '2006-01-02T15:04:05.000+07:00',
      email: 'h.thrift@email.com',
      id: 'k1412',
      lastEditDt: '2006-01-02T15:04:05.000+07:00',
      name: 'H.thrift',
      role: 'viewer',
      status: 'active',
      surname: 'KID',
    },
  }

export const mockFetchUserResponse = {
    header: {
      partnerId: 'labelling-web',
      requestId: '6d782488-62ef-11ec-90d6-0242ac120003',
      requestDt: '2021-12-22T13:15:47.999+07:00',
      responseId: '70645364-62f5-11ec-90d6-0242ac120003',
      responseDt: '2021-12-22T13:15:48.000+07:00',
      statusCode: '00',
    },
    companies: [
      {
        id: 'k1412',
        name: 'H.thrift',
        surname: 'KID',
        companyId: 'K1412',
        role: 'viewer',
        status: 'active',
        createBy: 'USaKu',
        createDt: '2006-01-02T15:04:05.000+07:00',
        lastEditDt: '2006-01-02T15:04:05.000+07:00',
      },
    ],
  }

export const mockUserListState = {
    status: 'succeeded',
    users: [
      {
        id: 'k1412',
        name: 'H.thrift',
        surname: 'KID',
        companyId: 'K1412',
        role: 'viewer',
        status: 'active',
        createBy: 'USaKu',
        createDt: '2006-01-02T15:04:05.000+07:00',
        lastEditDt: '2006-01-02T15:04:05.000+07:00',
      },
    ],
  }

export const mockCreateUserResponse = {
    header: {
      partnerId: 'labelling-web',
      requestId: '6d782488-62ef-11ec-90d6-0242ac120003',
      requestDt: '2021-12-22T13:15:47.999+07:00',
      responseId: '70645364-62f5-11ec-90d6-0242ac120003',
      responseDt: '2021-12-22T13:15:48.000+07:00',
      statusCode: '00',
    },
  }

export const mockReduxStore = configureStore({
    reducer: (state, action) => {
        switch(action.type) {
            case 'user/getUserDetail/pending':
                return {
                    ...state,
                    status: 'loading',
                }
            case 'user/getUserDetail/fulfilled':
                return {
                    ...state,
                    status: 'succeeded',
                    userDetail: action['payload'],
                }
            case 'user/getUserDetail/rejected':
                return {
                    ...state,
                    status: 'failed',
                    error: action['error'].message,
                }
            case 'user/getUserList/pending':
                return {
                    ...state,
                    status: 'loading',
                }
            case 'user/getUserList/fulfilled':
                return {
                    ...state,
                    status: 'succeeded',
                    users: action['payload'],
                }
            case 'user/getUserList/rejected':
                return {
                    ...state,
                    status: 'failed',
                    error: action['error'].message,
                }
            case 'user/addUser/pending':
                return {
                    ...state,
                    status: 'loading',
                }
            case 'user/addUser/fulfilled':
                return {
                    ...state,
                    status: 'succeeded',
                }
            case 'user/addUser/rejected':
                return {
                    ...state,
                    status: 'failed',
                    error: action['error'].message,
                }
            case 'reset':
                return {
                    status: 'idle',
                }
            default:
                return state
        }
    },
    preloadedState: {
        status: 'idle',
    },
})
