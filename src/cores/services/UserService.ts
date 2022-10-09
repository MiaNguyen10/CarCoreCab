import Container, { Service } from 'typedi'

import { ConfigService } from 'app/config/ConfigService'
import { IUser } from 'app/config/interfaces'

import {
  IResetPasswordInput,
  IUserList,
  ICreateUserInput,
  IGetUserDetailInput,
  IUpdateUserInput,
} from 'cores/reducers/interfaces'
import { BackendService } from 'cores/services/BackendService'

interface IChangePasswordInput {
  token: string
  oldPassword: string
  newPassword: string
}

interface IEditUserInput {
  token: string
  firstName: string
  lastName: string
}

@Service()
export class UserService extends BackendService {
  #config: IUser

  constructor() {
    super()
    this.#config = Container.get(ConfigService).user
  }

  public async editProfile({ token, firstName, lastName }: IEditUserInput): Promise<void> {
    await this.client.patch(this.#config.path.editUser, {
      header: { ...this.header },
      token,
      name: firstName,
      surname: lastName,
    })
  }

  public async changePassword(input: IChangePasswordInput): Promise<void> {
    await this.client.post(this.#config.path.changePassword, {
      header: { ...this.header },
      ...input,
    })
  }

  public async forgotPassword(email: string): Promise<void> {
    await this.client.post(this.#config.path.forgotPassword, {
      header: { ...this.header },
      email,
    })
  }

  public async resetPassword({ email, password }: IResetPasswordInput): Promise<void> {
    await this.client.post(this.#config.path.resetPassword, {
      header: { ...this.header },
      email,
      password,
    })
  }

  public async fetchUser(token: string, status: string): Promise<IUserList> {
    const response = await this.client.post(this.#config.path.listUser, {
      header: { ...this.header },
      token,
      status,
    })

    return response.data as IUserList
  }

  public async createUser(inputCreate: ICreateUserInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.addUser, {
      header: { ...this.header },
      ...inputCreate,
    })

    return response.data
  }

  public async updateUser(inputUpdate: IUpdateUserInput): Promise<void> {
    await this.client.put(this.#config.path.editUser, {
      header: { ...this.header },
      ...inputUpdate,
    })
  }

  public async getUserDetail(input: IGetUserDetailInput): Promise<unknown> {
    const response = await this.client.post(this.#config.path.singleUser, {
      header: { ...this.header },
      ...input,
    })

    return response.data
  }
}

