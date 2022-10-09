export type PlainObject = Record<string, unknown>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VoidFunction = (...args: any[]) => void

export type ReturnedFunction<T> = () => T

export const EmptyFunction = () => void 0

