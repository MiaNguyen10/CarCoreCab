import { PlainObject } from 'cores/utils/commonType'

export const loadState = (stateName: string) => {
  try {
    const serialisedState = localStorage.getItem(stateName)
    if(serialisedState ===  null) {
      return undefined
    }

    return JSON.parse(serialisedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (stateName: string, state: PlainObject) => {
  const serialisedState = JSON.stringify(state)
  localStorage.setItem(stateName, serialisedState)
}

export const clear = () => {
  localStorage.clear()
}
