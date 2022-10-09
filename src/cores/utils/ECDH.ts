import crypto, { KeyPairKeyObjectResult } from 'crypto'

export class ECDH {
  #keyPair: KeyPairKeyObjectResult

  constructor() {
    this.#keyPair = crypto.generateKeyPairSync('x25519')
  }

  get publicKey(): Buffer {
    const exportedKey = this.#keyPair.publicKey.export({ type: 'spki', format: 'pem' })

    return Buffer.from(exportedKey.toString(), 'base64')
  }

  public combine(publicKey: string | Buffer): Buffer {
    return crypto.diffieHellman({
      publicKey: crypto.createPublicKey(publicKey),
      privateKey: this.#keyPair.privateKey,
    })
  }
}

