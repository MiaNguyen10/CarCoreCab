import Container, { Service } from 'typedi'

import { ConfigService } from 'app/config/ConfigService'
import { IAuthentication } from 'app/config/interfaces'

import { BackendService } from 'cores/services/BackendService'
import { IExtendSession, ILoginResult } from 'cores/services/interfaces'

@Service()
export class AuthService extends BackendService {
  #config: IAuthentication

  constructor() {
    super()
    this.#config = Container.get(ConfigService).authentication
  }

  public async login(email: string, password: string): Promise<ILoginResult> {
    const response = await this.client.post(this.#config.path.login, {
      header: { ...this.header },
      email,
      password,
    })
    const data = response.data as ILoginResult

    return data as ILoginResult
  }

  public async extend(token: string, sessionId: string): Promise<IExtendSession> {
    const response = await this.client.post(this.#config.path.extend, {
      header: { ...this.header },
      token,
      encryptSessionId: sessionId,
    })

    return response.data as IExtendSession
  }
}

