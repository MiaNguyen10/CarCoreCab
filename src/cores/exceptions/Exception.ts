import { IHttpException } from 'cores/exceptions/interfaces'
import { PlainObject } from 'cores/utils/commonType'

export abstract class Exception extends Error implements IHttpException {
  public message: string

  public code?: string

  public input?: PlainObject

  constructor(message: string, code?: string) {
    super(message)

    this.message = message
    this.code = code
    this.name = code ?? this.name
  }

  withInput(value: PlainObject): this {
    this.input = value

    return this
  }

  withCause(e: Error): this {
    this.cause = e

    return this
  }
}

