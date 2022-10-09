import Container from 'typedi'

import { BackendApiClient } from 'app/ioc/token'
import { HttpClient } from 'cores/adapters/interfaces'
import { IBackend } from 'app/config/interfaces'
import { PlainObject } from 'cores/utils/commonType'
import { ConfigService } from 'app/config/ConfigService'

export abstract class BackendService {
  #config: IBackend

  protected readonly client: HttpClient

  protected readonly header: PlainObject

  constructor() {
    this.#config = Container.get(ConfigService).backend
    this.client = Container.get(BackendApiClient)
    this.header = {
      ...this.#config.headers,
    }
  }
}

