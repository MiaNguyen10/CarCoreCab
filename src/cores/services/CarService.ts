import {
  ICarList,
  ICarListInput,
  ICountCar,
  ICountCarResponse,
  ICreateCarInput,
  IApproveCarInput,
  IDisapproveCarInput,
  IRevokeCarInput,
  ICreateCarResponse,
  IEditCarInput,
  IGetCarDetailInput,
  IGetCarDetailResponse,
} from 'cores/reducers/interfaces'
import { ConfigService } from 'app/config/ConfigService'
import { ICar } from 'app/config/interfaces'
import { BackendService } from 'cores/services/BackendService'
import Container, { Service } from 'typedi'

@Service()
export class CarService extends BackendService {
  #config: ICar

  constructor() {
    super()
    this.#config = Container.get(ConfigService).car
  }

  public async countCar({ token, ...rest }: ICountCar): Promise<ICountCarResponse> {
    const response = await this.client.post(this.#config.path.countCar, {
      header: { ...this.header },
      token,
      filter: {
        ...rest,
      },
    })

    return response.data as ICountCarResponse
  }

  public async fetchCar({ token, ...rest }: ICarListInput): Promise<ICarList> {
    const response = await this.client.post(this.#config.path.listCar, {
      header: { ...this.header },
      token,
      filter: {
        ...rest,
      },
    })

    return response.data as ICarList
  }

  public async createCar(input: ICreateCarInput): Promise<ICreateCarResponse> {
    const response = await this.client.post(this.#config.path.addCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data as ICreateCarResponse
  }

  public async approveCar(input: IApproveCarInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.approveCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data
  }

  public async disapproveCar(input: IDisapproveCarInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.disapproveCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data
  }

  public async revokeCar(input: IRevokeCarInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.revokeCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data
  }

  public async editCar(input: IEditCarInput): Promise<unknown> {
    const response = await this.client.put(this.#config.path.editCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data
  }

  public async getCarDetail(input: IGetCarDetailInput): Promise<IGetCarDetailResponse> {
    const response = await this.client.post(this.#config.path.singleCar, {
      header: { ...this.header },
      ...input,
    })

    return response.data as IGetCarDetailResponse
  }
}

