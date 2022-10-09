import crypto from 'crypto'
import { AES } from '../AES'

jest.mock('crypto')

describe('AES', () => {
  const expectedKey = 'K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72'
  const expectedIv = '3aed50de6e45efdec2cf9acc474733b8'
  const expectedAlgorithm = 'aes-256-gcm'
  let aes: AES

  beforeEach(() => {
    if (expect.getState().currentTestName.includes('skipBeforeEach')) {
      return
    }

    aes = new AES(expectedKey, expectedIv)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('should initialize AES encryption properly [skipBeforeEach]', () => {
      const aes = new AES(expectedKey, expectedIv)

      expect(aes.algorithm).toEqual('aes-256-gcm')
      expect(crypto.randomBytes).not.toBeCalled()
    })

    it('should initialize AES encryption without IV properly [skipBeforeEach]', () => {
      ;(crypto.randomBytes as jest.Mock).mockReturnValue(Buffer.from(expectedIv, 'base64'))

      const aes = new AES(expectedKey)

      expect(aes.algorithm).toEqual('aes-256-gcm')
      expect(crypto.randomBytes).toBeCalledTimes(1)
    })
  })

  describe('encrypt', () => {
    it('should encrypt the given payload properly', () => {
      const expectedCipherText = 'expected-ciphertext'
      const expectedFinal = 'expected-final'
      const fakeCipherIv = {
        update: jest.fn().mockReturnValueOnce(expectedCipherText),
        final: jest.fn().mockReturnValueOnce(expectedFinal),
      }
      ;(crypto.createCipheriv as jest.Mock).mockReturnValue(fakeCipherIv)

      const ciphertext = aes.encrypt('expect-payload')

      expect(ciphertext).toEqual(expectedCipherText + expectedFinal)
      expect(crypto.createCipheriv).toBeCalledWith(expectedAlgorithm, expectedKey, expectedIv)
      expect(fakeCipherIv.update).toBeCalledWith('expect-payload', 'utf8', 'base64')
    })
  })

  describe('decrypt', () => {
    it('should decrypt the ciphertext properly', () => {
      const expecteText = 'expected-text'
      const expectedFinal = 'expected-final'
      const fakeDecipherIv = {
        update: jest.fn().mockReturnValueOnce(expecteText),
        final: jest.fn().mockReturnValueOnce(expectedFinal),
      }
      ;(crypto.createDecipheriv as jest.Mock).mockReturnValue(fakeDecipherIv)

      const text = aes.decrypt('expect-ciphertext')

      expect(text).toEqual(expecteText + expectedFinal)
      expect(crypto.createDecipheriv).toBeCalledWith(expectedAlgorithm, expectedKey, expectedIv)
      expect(fakeDecipherIv.update).toBeCalledWith('expect-ciphertext', 'utf8', 'base64')
    })
  })
})

