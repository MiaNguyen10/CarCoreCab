import { useCallback, useEffect, useRef } from 'react'
import { ETimeoutStatus, IUseTimeoutReturn } from 'app/middlewares/hooks/interfaces'
import { EmptyFunction, VoidFunction } from 'cores/utils/commonType'

export function useTimeout(timeout: number, onTimeout: VoidFunction = EmptyFunction): IUseTimeoutReturn {
  const statusRef = useRef<ETimeoutStatus>(ETimeoutStatus.READY)
  const idTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const timeoutRef = useRef<number>(timeout)
  const onTimeoutRef = useRef<VoidFunction>(onTimeout)
  const isStartRef = useRef<boolean>(false)

  const cancel = useCallback((): void => {
    statusRef.current = ETimeoutStatus.CANCELLED

    isStartRef.current = false
    clearTimeout(idTimeoutRef.current)

    idTimeoutRef.current = undefined
  }, [])

  const start = useCallback((): void => {
    if (timeoutRef.current === 0 || idTimeoutRef.current) {
      return
    }

    statusRef.current = ETimeoutStatus.IN_PROGRESS
    isStartRef.current = true
  }, [])

  const reset = useCallback((newTimeout: number): void => {
    setTimer(newTimeout)
  }, [])

  const setTimer = (time: number) => {
    const timeDiff = getDiffTime(time)

    idTimeoutRef.current = setTimeout((): void => {
      if (statusRef.current !== ETimeoutStatus.CANCELLED) {
        onTimeoutRef.current()
      }
    }, timeDiff)
  }

  const getRemainingTime = useCallback((): number => {
    const timeDiff = getDiffTime(timeoutRef.current)

    return timeDiff > 0 ? timeDiff : 0
  }, [])

  useEffect(() => {
    if (isStartRef.current) {
      setTimer(timeoutRef.current)
    }

    return () => {
      clearTimeout(idTimeoutRef.current)
    }
  }, [isStartRef])

  useEffect((): void => {
    timeoutRef.current = timeout

    start()
  }, [start, timeout])

  useEffect((): void => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  return { start, cancel, reset, getRemainingTime }
}

function getDiffTime(timestamp: number): number {
  return timestamp - Date.now()
}

