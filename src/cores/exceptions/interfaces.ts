import { PlainObject } from 'cores/utils/commonType'

export interface IHttpException {
  message: string
  code?: string
  input?: PlainObject
  cause?: Error
  withInput(value: PlainObject): this
  withCause(e: Error): this
}

