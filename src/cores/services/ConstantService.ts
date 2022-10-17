import { ConfigService } from 'app/config/ConfigService'
import { IConstantPath } from 'app/config/interfaces'
import { IProvinceList } from 'cores/reducers/interfaces'
import Container, { Service } from 'typedi'
import { BackendService } from './BackendService'

@Service()
export class ConstantService extends BackendService {
  #config: IConstantPath

  constructor() {
    super()
    this.#config = Container.get(ConfigService).constant
  }

  public async getProvinceList(token: string, status: string): Promise<IProvinceList> {
    const response = await this.client.post(this.#config.path.listProvince, {
      header: { ...this.header },
      token: token,
      filter: {
        status: status,
      },
    })

    return response.data as IProvinceList
  }
}

