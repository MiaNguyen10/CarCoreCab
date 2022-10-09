import 'reflect-metadata'
import { LocalStorageAdapter } from '../LocalStorageAdapter'

describe('LocalStorageAdapter', () => {
  const fakeStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  } as unknown as Storage
  let instanceUnderTest: LocalStorageAdapter

  beforeEach(() => {
    instanceUnderTest = new LocalStorageAdapter(fakeStorage)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('loadState', () => {
    it('should load an item from storage properly', () => {
      const expectedStateName = 'expected-state-name'
      const expectedState = { id: 123 }
      fakeStorage.getItem = jest.fn().mockReturnValueOnce(JSON.stringify(expectedState))

      const result = instanceUnderTest.loadState(expectedStateName)

      expect(result).toEqual(expectedState)
      expect(fakeStorage.getItem).toBeCalledWith(expectedStateName)
    })

    it('should return undefined when item is not found', () => {
      const result = instanceUnderTest.loadState('non-existent')

      expect(result).toEqual(undefined)
    })
  })

  describe('saveState', () => {
    it('should save an given state properly', () => {
      const expectedStateName = 'expected-state-name'
      const expectedState = { id: 123 }

      instanceUnderTest.saveState(expectedStateName, expectedState)

      expect(fakeStorage.setItem).toBeCalledWith(expectedStateName, JSON.stringify(expectedState))
    })
  })

  describe('remove', () => {
    it('should remove the state from the storage properly', () => {
      instanceUnderTest.remove('expected-state-name')

      expect(fakeStorage.removeItem).toBeCalledWith('expected-state-name')
    })
  })

  describe('clear', () => {
    it('should clear all items from the storage', () => {
      instanceUnderTest.clear()

      expect(fakeStorage.clear).toBeCalledTimes(1)
    })
  })
})

