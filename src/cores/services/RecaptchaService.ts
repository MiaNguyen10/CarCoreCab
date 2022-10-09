import { ConfigService } from 'app/config/ConfigService'
import { IRecaptcha } from 'app/config/interfaces'
import { GoogleToken } from 'app/ioc/token'
import { HttpClient } from 'cores/adapters/interfaces'
import Container, { Service } from 'typedi'

interface RecaptchaResponse {
  success: boolean
  challenge_ts: number
  hostname: string
}

@Service()
export class RecaptchaService {
  #client: HttpClient

  #config: IRecaptcha

  constructor() {
    this.#client = Container.get(GoogleToken)
    this.#config = Container.get(ConfigService).recaptcha
  }

  public async verify(token: string): Promise<boolean> {
    const response = await this.#client.post(this.#config.path, {
      secret: this.#config.secret,
      response: token,
    })

    const data = response.data as RecaptchaResponse

    return data.success
  }
}

