import { PlainObject } from 'cores/utils/commonType'

export class LocalStorageAdapter {
  #storage: Storage

  constructor(storage: Storage) {
    this.#storage = storage
  }

  public loadState<T>(stateName: string): T | undefined {
    try {
      const serialisedState = this.#storage.getItem(stateName)
      if (serialisedState === null) {
        return undefined
      }

      return JSON.parse(serialisedState)
    } catch (error) {
      return undefined
    }
  }

  public saveState(stateName: string, state: PlainObject) {
    const serialisedState = JSON.stringify(state)

    this.#storage.setItem(stateName, serialisedState)
  }

  public remove(name: string) {
    this.#storage.removeItem(name)
  }

  public clear() {
    this.#storage.clear()
  }
}

