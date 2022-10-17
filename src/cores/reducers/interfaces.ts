import { CarStatus, status, DateField, CompanyStatus } from 'app/config/interfaces'
import { IRegistrationBook, ICarPhotos, IConsole, IDashboard, ITaxSign } from 'app/pages/carPage/types'

export interface IBackendError {
  errorCode: string
  errorDesc: string
}

export interface IBackendErrorResponse {
  header: {
    error: IBackendError
    partnerId: string
    requestDt: string
    requestId: string
    responseDt: string
    responseId: string
    statusCode: string
  }
}

export enum RequestState {
  IDEAL = 'idle',
  REQUESTING = 'requesting',
  FAILED = 'failed',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
}

export interface IResetPasswordInput {
  email: string
  password: string
}

export interface IEditProfileInput {
  firstName: string
  lastName: string
}

export interface IChangePasswordInput {
  oldPassword: string
  newPassword: string
}

export interface ICompanyDetail extends DateField {
  id?: string
  name: string
  coordinatorName: string
  coordinatorTel: string
  status: status
  createBy: string
}

export interface ICompanyList {
  companies: ICompanyDetail[]
}

export interface ICompanyCreateInput {
  token: string
  companyId: string
  name: string
  coordinatorName: string
  coordinatorTel: string
  status: CompanyStatus
}

export interface ICompanyUpdateInput {
  token: string
  companyId: string
  name: string
  coordinatorName: string
  coordinatorTel: string
  status: CompanyStatus
}

export interface IGetCompanyDetailInput {
  token: string
  companyId: string
}

export interface IUserResponse extends DateField {
  id: string
  email: string
  name: string
  surname: string
  companyId: string
  role: string
  status: CompanyStatus
  createBy: string
  lastEditBy: string
}

export interface IUserDetail {
  no: number
  id: string
  email: string
  name: {
    firstName: string
    lastName: string
  }
  company: string
  role: string
  status: status
  createBy: {
    by: string
    date: string
  }
  editBy: {
    by: string
    date: string
  }
}

export interface IUserList {
  users: IUserResponse[]
}

export interface ICreateUserInput {
  token: string
  companyId: string
  name: string
  surname: string
  userRole: string
  email: string
}

export interface IUpdateUserInput {
  token: string
  companyId: string
  name: string
  surname: string
  userRole: string
  email: string
}

export interface IGetUserDetailInput {
  token: string
  id?: string
}
export interface ICountCar {
  token: string
  filter?: {
    makeBrand?: string
    model?: string
    status?: CarStatus
  }
}

export interface ICountCarResponse {
  numberOfCarCase: number
}

export interface ICarListInput {
  token: string
  filter?: {
    startFrom?: number
    endAt?: number
    licensePlateDigit?: string
    licensePlate?: string
    makeBrand?: string
    model?: string
    status?: CarStatus
  }
}

export interface ICarDetail {
  id: string
  licensePlateNo: string
  province: string
  makeBrand: string
  model: string
  subModel: string
  modelYear: string
  submitterId: string
  lastUpdateById: string
  status: CarStatus
}

export interface ICarList {
  cars: ICarDetail[]
}

export interface ICreateCarInput {
  token: string
  registrationBook: IRegistrationBook
  carPhotos?: ICarPhotos[]
  console?: IConsole
  dashboard?: IDashboard
  taxSign?: ITaxSign
}

export interface IApproveCarInput {
  token: string
  carId: string
}

export interface IDisapproveCarInput {
  token: string
  carId: string
}

export interface IRevokeCarInput {
  token: string
  carId: string
}

export interface ICreateCarResponse {
  carId: string
}

export interface IEditCarInput {
  token: string
  id: string
  registrationBook: IRegistrationBook
  carPhotos?: ICarPhotos[]
  console?: IConsole
  dashboard?: IDashboard
  taxSign?: ITaxSign
}

export interface IGetCarDetailResponse {
  id?: string
  submitterId?: string
  lastUpdateById?: string
  status?: string
  registrationBook: IRegistrationBook
  carPhotos?: ICarPhotos[]
  console?: IConsole
  dashboard?: IDashboard
  taxSign?: ITaxSign
}

export interface IGetCarDetailInput {
  id: string
}

export interface IProvinceList {
  provinces: string[]
}
