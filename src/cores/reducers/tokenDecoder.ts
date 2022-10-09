import jwtDecode from 'jwt-decode'

export interface ITokenData {
  sessionId: string
  username: string
  teir: string
  scope: string
  expire: number
}

export function tokenDecoder(token: string): ITokenData {
  const tokenData = jwtDecode(token) as ITokenData

  return tokenData
}

export enum ERequiredAction {
  NONE = 'none',
  CHANGE_PASSWORD = 'changePassword',
}

