import crypto, { BinaryLike, CipherKey } from 'crypto'

export class AES {
  #key: CipherKey

  #iv: BinaryLike

  readonly algorithm: string

  constructor(key: CipherKey, iv?: BinaryLike) {
    this.#key = key
    this.#iv = iv ?? crypto.randomBytes(16).toString('hex').slice(0, 16)
    this.algorithm = 'aes-256-gcm'
  }

  public encrypt(payload: string): string {
    const cipherIv = crypto.createCipheriv(this.algorithm, this.#key, this.#iv)
    const encrypted = cipherIv.update(payload, 'utf8', 'base64')

    return encrypted + cipherIv.final('base64')
  }

  public decrypt(ciphertext: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.#key, this.#iv)
    const decrypted = decipher.update(ciphertext, 'utf8', 'base64')

    return decrypted + decipher.final('utf8')
  }
}

