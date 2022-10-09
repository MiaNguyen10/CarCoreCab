import { Exception } from 'cores/exceptions/Exception'

export class HttpException extends Exception {
  constructor(message?: string, code?: string) {
    const errorMessage = message ?? 'HttpException: unable to identify the cause'

    super(errorMessage, code)
  }
}

