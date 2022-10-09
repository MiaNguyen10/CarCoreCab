export interface IError {
  code: string
  message: string
  name: string
  stack: string
}

export function backendErrorToMessage(error: IError): string {
  const errorMapper = new Map([
    ['LWS-E001', 'BACKEND_ERROR_INTERNAL_SERVER_ERROR'],
    ['LWS-E002', 'BACKEND_ERROR_INVALID_REQUEST'],
    ['LWS-E003', 'BACKEND_ERROR_DATA_CORRUPTED'],
    ['LWS-E004', 'BACKEND_ERROR_FEATURE_DISABLED'],
    ['LWS-E011', 'BACKEND_ERROR_LOGIN_FAILED'],
    ['LWS-E012', 'BACKEND_ERROR_USER_LOCKED'],
    ['LWS-E013', 'BACKEND_ERROR_SESSION_EXPIRED'],
    ['LWS-E021', 'BACKEND_ERROR_PASSWORD_NOT_MATCH'],
    ['LWS-E022', 'BACKEND_ERROR_CREATE_PROFILE_FAILED'],
  ])

  return errorMapper.get(error.code) ?? 'BACKEND_ERROR_FALLBACK'
}

