import crypto from 'crypto'
import { ECDH } from '../ECDH'

jest.mock('crypto')

describe('encrypter', () => {
  const fakeKeyPair = { publicKey: { export: jest.fn() }, privateKey: 'expected-private-key' }
  let ecdh: ECDH

  beforeEach(() => {
    ;(crypto.generateKeyPairSync as jest.Mock).mockReturnValue(fakeKeyPair)
    ecdh = new ECDH()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('should construct and generate key pair properly', () => {
    expect(crypto.generateKeyPairSync as jest.Mock).toBeCalledTimes(1)
    expect(crypto.generateKeyPairSync as jest.Mock).toBeCalledWith('x25519')
  })

  describe('publicKey', () => {
    it('should export an base64 public key', () => {
      const expectedPublicKeyBuffer = Buffer.from('expected-string', 'base64')
      fakeKeyPair.publicKey.export.mockReturnValueOnce('expected-string')

      const publicKeyBuffer = ecdh.publicKey

      expect(publicKeyBuffer).toEqual(expectedPublicKeyBuffer)
      expect(fakeKeyPair.publicKey.export).toBeCalledWith({ type: 'spki', format: 'pem' })
    })
  })

  describe('combine', () => {
    it('should combine the public key properly', () => {
      const bobPublicKey = Buffer.from('bob private key', 'base64')

      ecdh.combine(bobPublicKey)

      expect(crypto.diffieHellman).toBeCalledWith({
        publicKey: crypto.createPublicKey(bobPublicKey),
        privateKey: 'expected-private-key',
      })
    })
  })
})

