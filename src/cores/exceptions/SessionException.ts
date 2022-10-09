import { Exception } from 'cores/exceptions/Exception'

export class SessionException extends Exception {
  constructor(message?: string, code?: string) {
    const errorMessage = message ?? 'SessionException: unable to identify the cause'

    super(errorMessage, code)
  }
}

