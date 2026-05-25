import { createFirestoreClientRepository } from './firestore-client-repository'
import { createFirestoreCrmRepository } from './firestore-crm-repository'
import { getFirestoreDb } from './firebase'

let clientRepository: ReturnType<typeof createFirestoreClientRepository> | null = null
let crmRepository: ReturnType<typeof createFirestoreCrmRepository> | null = null

export function getClientRepository() {
  if (!clientRepository) {
    clientRepository = createFirestoreClientRepository(getFirestoreDb())
  }

  return clientRepository
}

export function getCrmRepository() {
  if (!crmRepository) {
    crmRepository = createFirestoreCrmRepository(getFirestoreDb())
  }

  return crmRepository
}
