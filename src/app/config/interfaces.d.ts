import { STATUS } from 'app/config/Constant'
import { addCompany, editCompany } from 'cores/thunk/company'
import { ICompany } from 'cores/reducers/company/index'
import { PlainObject } from 'cores/utils/commonType'
import { string } from 'yup/lib/locale'

export interface ILanguage extends PlainObject {
  default: string
  supported: string[]
}

export interface ISession extends PlainObject {
  idleTime: number
}
export interface IGoogle extends PlainObject {
  host: string
}

export interface IRecaptcha extends PlainObject {
  path: string
  key: string
  secret: string
}

export interface IAuthentication extends PlainObject {
  path: {
    login: string
    extend: string
  }
  stateName: string
}

export interface IUser extends PlainObject {
  path: {
    forgotPassword: string
    resetPassword: string
    changePassword: string
    listUser: string
    singleUser: string
    addUser: string
    editUser: string
    deleteUser: string
  }
  stateName: string
}

export interface ICompanyPath extends PlainObject {
  path: {
    listCompany: string
    singleCompany: string
    addCompany: string
    editCompany: string
  }
  stateName: string
}

export interface ICar extends PlainObject {
  path: {
    listCar: string
    singleCar: string
    addCar: string
    editCar: string
    countCar: string
    approveCar: string
    disapproveCar: string
    revokeCar: string
  }
  stateName: string
}

export interface IConfig extends PlainObject {
  language: ILanguage
  recaptcha: IRecaptcha
  authentication: IAuthentication
}

export interface IBackend extends PlainObject {
  host: string
  port: number
  headers: PlainObject
}
export interface PaginateProps {
  page: number
}
export interface DateField {
  createDt: string
  lastEditDt: string
}
export interface PageUrlProps {
  isAdd?: boolean
  isEdit?: boolean
  isView?: boolean
}

export type status = STATUS.ACTIVE | STATUS.INACTIVE | STATUS.DELETE
export type carStatus = STATUS.PENDING | STATUS.APPROVED | STATUS.DRAFT

