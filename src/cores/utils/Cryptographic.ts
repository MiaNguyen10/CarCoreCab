import { Crypto } from '@peculiar/webcrypto'

export class Cryptographic {
  #crypto: Crypto

  #keyPair?: CryptoKeyPair

  public readonly algorithm: string = 'ECDH-ES'

  public readonly curve: string = 'X25519'

  public readonly pemHeader: string = '-----BEGIN PUBLIC KEY-----'

  public readonly pemFooter: string = '-----END PUBLIC KEY-----'

  constructor() {
    this.#crypto = new Crypto()
  }

  public async generateKeyPairSync(): Promise<string> {
    this.#keyPair = await this.#crypto.subtle.generateKey(
      {
        name: this.algorithm,
        namedCurve: this.curve,
      },
      false,
      ['deriveKey', 'deriveBits'],
    )

    const publicKey = await this.#crypto.subtle.exportKey('spki', this.#keyPair.publicKey)

    return this.abTob64(publicKey)
  }

  public async deriveKey(publicKey: string): Promise<string> {
    if (!this.#keyPair) {
      throw new Error('Private key is not generated')
    }

    const extractKey = this.b64Toab(publicKey.replace(this.pemHeader, '').replace(this.pemFooter, ''))
    const serverPublicKey = await this.#crypto.subtle.importKey(
      'spki',
      extractKey,
      { name: this.algorithm, namedCurve: this.curve },
      true,
      [],
    )

    const sharedSecret = await this.#crypto.subtle.deriveBits(
      { name: this.algorithm, public: serverPublicKey },
      this.#keyPair?.privateKey,
      256,
    )

    return this.abTob64(sharedSecret)
  }

  private b64Toab(b64: string): ArrayBuffer {
    return Uint8Array.from(Buffer.from(b64, 'base64'))
  }

  private abTob64(ab: ArrayBuffer): string {
    const result = Buffer.from(new Uint8Array(ab))

    return result.toString('base64')
  }
}

