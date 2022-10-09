import { ReturnedFunction, VoidFunction } from 'cores/utils/commonType'

export interface UseTimeoutCallbackParams {
  getRemainingTime: () => number
  resetTimeout: (newTimeout?: number) => void
}

export interface IUseTimeoutReturn {
  start: VoidFunction
  cancel: VoidFunction
  reset: VoidFunction
  getRemainingTime: ReturnedFunction<number>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TimeoutCallback = (params: UseTimeoutCallbackParams) => any

export enum ETimeoutStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESET = 'RESET',
}

export interface ISessionTimeoutOptions {
  onTimeout: VoidFunction

  expiredDate: number
  disabled?: boolean
}

export interface ISessionTimeoutReturn {
  getRemainingTime: ReturnedFunction<number>
  cancelTimeout: VoidFunction
}

