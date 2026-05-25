import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type DocumentData,
  type Firestore,
} from 'firebase/firestore'
import type { Client } from '@shared/types'
import { firestoreCollections } from '@shared/constants/firestore-collections'

export type FirestoreClientRepository = {
  listClients(): Promise<Client[]>
  getClientById(id: string): Promise<Client | null>
  upsertClient(client: Client): Promise<void>
}

export function createFirestoreClientRepository(db: Firestore): FirestoreClientRepository {
  const clientsRef = collection(db, firestoreCollections.clients)

  return {
    async listClients() {
      const snapshot = await getDocs(clientsRef)
      return snapshot.docs.map((document) => {
        const data = document.data() as Partial<Client>

        return {
          id: data.id ?? document.id,
          name: data.name ?? 'Cliente sem nome',
          company: data.company ?? '—',
          email: data.email ?? '—',
          status: data.status ?? 'prospecto',
          lastContact: data.lastContact ?? '—',
        }
      })
    },

    async getClientById(id: string) {
      const document = await getDoc(doc(db, firestoreCollections.clients, id))
      if (!document.exists()) {
        return null
      }

      const data = document.data() as Partial<Client>

      return {
        id: data.id ?? document.id,
        name: data.name ?? 'Cliente sem nome',
        company: data.company ?? '—',
        email: data.email ?? '—',
        status: data.status ?? 'prospecto',
        lastContact: data.lastContact ?? '—',
      }
    },

    async upsertClient(client: Client) {
      await setDoc(doc(db, firestoreCollections.clients, client.id), client as DocumentData, {
        merge: true,
      })
    },
  }
}
