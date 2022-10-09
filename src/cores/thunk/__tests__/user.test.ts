/* eslint-disable no-trailing-spaces */
import 'reflect-metadata'
import Container from 'typedi'
import { UserService } from '../../../cores/services/UserService'
import { getUserDetail, getUserList, addUser } from '../user'
import {
    mockGetUserDetailResponse,
    mockUserDetailState,
    mockFetchUserResponse,
    mockUserListState,
    mockCreateUserResponse,
    mockReduxStore,
} from './__mocks__/user.mock'

describe('User Action', () => {
    afterEach(() => {
        jest.clearAllMocks()
        mockReduxStore.dispatch({ type: 'reset' })
      })

    it('should return user details', async () => {
        const fakeUserService = {
            getUserDetail: jest.fn().mockResolvedValueOnce(mockGetUserDetailResponse),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(getUserDetail({
            token: 'xxx',
            id: 'xxx',
        }))

        const mockState = mockReduxStore.getState()
        
        expect(mockState).toEqual(mockUserDetailState)
    })

    it('should get error redux state from getUserDetail', async () => {
        const fakeUserService = {
            getUserDetail: jest.fn().mockRejectedValueOnce(new Error('error-test')),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(getUserDetail({
            token: 'xxx',
            id: 'xxx',
        }))

        const mockState = mockReduxStore.getState()

        expect(mockState).toEqual({ status: 'failed', error: 'error-test' })
    })

    it('should return user list', async () => {
        const fakeUserService = {
            fetchUser: jest.fn().mockResolvedValueOnce(mockFetchUserResponse),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(getUserList('xxx'))

        const mockState = mockReduxStore.getState()

        expect(mockState).toEqual(mockUserListState)
    })

    it('should get error redux state from getUserList', async () => {
        const fakeUserService = {
            fetchUser: jest.fn().mockRejectedValueOnce(new Error('error-test')),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(getUserList('xxx'))

        const mockState = mockReduxStore.getState()

        expect(mockState).toEqual({ status: 'failed', error: 'error-test' })
    })

    it('should successed when adding user', async () => {
        const fakeUserService = {
            createUser: jest.fn().mockResolvedValueOnce(mockCreateUserResponse),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(addUser({
            token: 'xxx',
            companyId: 'xxx',
            name: 'xxx',
            surname: 'xxx',
            userRole: 'xxx',
        }))

        const mockState = mockReduxStore.getState()

        expect(mockState).toEqual({ status: 'succeeded' })
    })

    it('should get error redux state when failed to adding user', async () => {
        const fakeUserService = {
            createUser: jest.fn().mockRejectedValueOnce(new Error('error-test')),
        }
        Container.set(UserService, fakeUserService)
        await mockReduxStore.dispatch(addUser({
            token: 'xxx',
            companyId: 'xxx',
            name: 'xxx',
            surname: 'xxx',
            userRole: 'xxx',
        }))

        const mockState = mockReduxStore.getState()
        
        expect(mockState).toEqual({ status: 'failed', error: 'error-test' })
    })
})
