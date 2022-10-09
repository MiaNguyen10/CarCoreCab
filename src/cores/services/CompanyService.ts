import { ConfigService } from 'app/config/ConfigService'
import {
  ICompanyDetail,
  ICompanyList,
  IGetCompanyDetailInput,
  ICompanyCreateInput,
  ICompanyUpdateInput,
} from 'cores/reducers/interfaces'
import Container, { Service } from 'typedi'
import { ICompanyPath } from 'app/config/interfaces.d'
import { BackendService } from './BackendService'

@Service()
export class CompanyService extends BackendService {
  #config: ICompanyPath

  constructor() {
    super()
    this.#config = Container.get(ConfigService).company
  }

  public async fetchCompany(token: string, status: string): Promise<ICompanyList> {
    const response = await this.client.post(this.#config.path.listCompany, {
      header: { ...this.header },
      token: token,
      filter: {
        status: status,
      },
    })

    return response.data as ICompanyList
  }

  public async createCompany(inputCreate: ICompanyCreateInput): Promise<ICompanyDetail> {
    const response = await this.client.post(this.#config.path.addCompany, {
      header: { ...this.header },
      ...inputCreate,
    })

    return response.data as ICompanyDetail
  }

  public async updateCompany(inputUpdate: ICompanyUpdateInput): Promise<void> {
    await this.client.put(this.#config.path.editCompany, {
      header: { ...this.header },
      ...inputUpdate,
    })
  }

  public async getCompanyDetail(inputCompanyDetail: IGetCompanyDetailInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.singleCompany, {
      header: { ...this.header },
      ...inputCompanyDetail,
    })

    return response.data
  }
}

