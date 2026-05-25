import type { KeyValueStorage } from './types'

let storageProvider: KeyValueStorage | null = null

export function configureStorage(provider: KeyValueStorage) {
  storageProvider = provider
}

export function getStorage(): KeyValueStorage {
  if (!storageProvider) {
    throw new Error(
      'Storage provider not configured. Call configureStorage() at app bootstrap.',
    )
  }

  return storageProvider
}
