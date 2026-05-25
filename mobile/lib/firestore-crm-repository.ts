import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type DocumentData,
  type Firestore,
} from 'firebase/firestore'
import type { KanbanCard, KanbanColumn } from '@shared/types'
import { firestoreCollections } from '@shared/constants/firestore-collections'

export type FirestoreCrmRepository = {
  listColumns(): Promise<KanbanColumn[]>
  listCards(): Promise<KanbanCard[]>
  upsertColumn(column: KanbanColumn): Promise<void>
  upsertCard(card: KanbanCard): Promise<void>
  getCardById(id: string): Promise<KanbanCard | null>
}

export function createFirestoreCrmRepository(db: Firestore): FirestoreCrmRepository {
  const columnsRef = collection(db, firestoreCollections.kanbanColumns)
  const cardsRef = collection(db, firestoreCollections.opportunities)

  return {
    async listColumns() {
      const snapshot = await getDocs(columnsRef)
      return snapshot.docs.map((document) => document.data() as KanbanColumn)
    },

    async listCards() {
      const snapshot = await getDocs(cardsRef)
      return snapshot.docs.map((document) => document.data() as KanbanCard)
    },

    async getCardById(id: string) {
      const document = await getDoc(doc(db, firestoreCollections.opportunities, id))
      if (!document.exists()) {
        return null
      }

      return document.data() as KanbanCard
    },

    async upsertColumn(column: KanbanColumn) {
      await setDoc(doc(db, firestoreCollections.kanbanColumns, column.id), column as DocumentData, {
        merge: true,
      })
    },

    async upsertCard(card: KanbanCard) {
      await setDoc(doc(db, firestoreCollections.opportunities, card.id), card as DocumentData, {
        merge: true,
      })
    },
  }
}
