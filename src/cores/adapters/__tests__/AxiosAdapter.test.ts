import axios from 'axios'
import { AxiosAdapter } from '../AxiosAdapter'
jest.mock('axios')

beforeEach(() => {
  (axios.create as jest.Mock).mockReturnThis()
})

describe('Http Client', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const baseURL = 'localhost:4000'
  const timeout = 1000
  const headers = { authorization: 'xxx' }

  describe('get', () => {
    it('should create client with input', () => {
      new AxiosAdapter(baseURL, timeout, headers)
      expect(axios.create).toHaveBeenLastCalledWith({ baseURL, timeout, headers })
    })

    it('should call get with added headers given call setHeaders', async () => {
      axios.get = jest
        .fn()
        .mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx', test: 1 }, status: 200 })
      const expectedConfig = { params: { status: 1 }, headers: { authorization: 'xxx', test: 1 } }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx', test: 1 }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers).setHeaders({ test: 1 })
      const response = await axiosClient.get('/users', { status: 1 })

      expect(axios.get).toHaveBeenCalledWith('/users', expectedConfig)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should call axios get given query', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedConfig = { params: { status: 1 }, headers: { authorization: 'xxx' } }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.get('/users', { status: 1 })

      expect(axios.get).toHaveBeenCalledWith('/users', expectedConfig)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should call axios get given no query', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedConfig = { headers, params: {} }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.get('/users')

      expect(axios.get).toHaveBeenCalledWith('/users', expectedConfig)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should get throw error given promise reject', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(new Error('error-test'))

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)

      await expect(axiosClient.get('/users', { status: 1 })).rejects.toThrowError('error-test')
    })

    it('should get handle error `ECONNREFUSED` given promise reject', async () => {
      const expectedError = { code: 'LWS-E001', message: 'Internal Server Error' }
      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      let isThrown = false
      axios.get = jest.fn().mockRejectedValueOnce(expectedError)

      try {
        await axiosClient.get('/users', { status: 1 })
      } catch (error) {
        isThrown = true

        expect(error).toStrictEqual(expectedError)
      }

      expect(isThrown).toBe(true)
    })
  })

  describe('post', () => {
    it('should call axios post', async () => {
      axios.post = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }
      const expectedConfig = { headers: { authorization: 'xxx' } }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.post('/users', { id: 2 })

      expect(axios.post).toHaveBeenCalledWith('/users', { id: 2 }, expectedConfig)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should call axios post', async () => {
      axios.post = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }
      const expectedConfig = { headers: { authorization: 'xxx' } }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.post('/users', { id: 2 })

      expect(axios.post).toHaveBeenCalledWith('/users', { id: 2 }, expectedConfig)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should post throw error given promise reject', async () => {
      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const expectedError = new Error('error-test')
      let isThrown = false
      axios.post = jest.fn().mockRejectedValueOnce(expectedError)

      try {
        await axiosClient.post('/users', { id: 2 })
      } catch (error) {
        isThrown = true

        expect(error).toStrictEqual(expectedError)
      }

      expect(isThrown).toBe(true)
    })
  })

  describe('put', () => {
    it('should call axios put', async () => {
      axios.put = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedConfig = { headers: { authorization: 'xxx' } }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.put('/users', { id: 2 })

      expect(axios.put).toHaveBeenCalledWith('/users', { id: 2 }, expectedConfig)
      expect(axios.put).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should put throw error given promise reject', async () => {
      const expectedError = new Error('error-test')
      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      let isThrown = false
      axios.put = jest.fn().mockRejectedValueOnce(expectedError)

      try {
        await axiosClient.put('/users', { id: 2 })
      } catch (error) {
        isThrown = true

        expect(error).toBe(expectedError)
      }

      expect(isThrown).toBe(true)
    })
  })

  describe('delete', () => {
    it('should call axios delete', async () => {
      axios.delete = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedConfig = { headers: { authorization: 'xxx' } }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.delete('/users/1')

      expect(axios.delete).toHaveBeenCalledWith('/users/1', expectedConfig)
      expect(axios.delete).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should delete throw error given promise reject', async () => {
      const expectedError = new Error('error-test')
      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      let isThrown = false
      axios.delete = jest.fn().mockRejectedValueOnce(expectedError)

      try {
        await axiosClient.delete('/users')
      } catch (error) {
        isThrown = true

        expect(error).toStrictEqual(expectedError)
      }

      expect(isThrown).toBe(true)
    })
  })

  describe('patch', () => {
    it('should call axios patch', async () => {
      axios.patch = jest.fn().mockResolvedValue({ data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 })
      const expectedConfig = { headers: { authorization: 'xxx' } }
      const expectedResponse = { data: { id: 1 }, headers: { authorization: 'xxx' }, status: 200 }

      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      const response = await axiosClient.patch('/users', { id: 2 })

      expect(axios.patch).toHaveBeenCalledWith('/users', { id: 2 }, expectedConfig)
      expect(axios.patch).toHaveBeenCalledTimes(1)
      expect(response).toStrictEqual(expectedResponse)
    })

    it('should patch throw error given promise reject', async () => {
      const expectedError = new Error('error-test')
      const axiosClient = new AxiosAdapter(baseURL, timeout, headers)
      let isThrown = false
      axios.patch = jest.fn().mockRejectedValueOnce(expectedError)

      try {
        await axiosClient.patch('/users', { id: 2 })
      } catch (error) {
        isThrown = true

        expect(error).toStrictEqual(expectedError)
      }

      expect(isThrown).toBe(true)
    })
  })
})

