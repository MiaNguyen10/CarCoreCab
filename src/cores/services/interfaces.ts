import { status, DateField } from 'app/config/interfaces'
import { PlainObject } from 'cores/utils/commonType'

export interface IResponseHeader {
  partnerId: string
  requestId: string
  requestDt: string
  responseId: string
  responseDt: string
  statusCode: string
}

export interface ILoginRequest extends PlainObject {
  username: string
  password: string
}

export interface ILoginResult extends PlainObject {
  sessionId: string
  token: string
  requireAction: string
  serverPublic: string
}

export interface IExtendSession extends PlainObject {
  token: string
}

export interface ICompanyDetail extends PlainObject, DateField {
  id?: string
  name: string
  coordinatorName: string
  coordinatorTel: string
  status: status
  createBy: string
}

export interface ICompanyList extends PlainObject {
  companies: ICompanyDetail[]
}
export interface IForgotPasswordResult extends PlainObject {
  header: IResponseHeader
}

