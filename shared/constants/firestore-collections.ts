export const firestoreCollections = {
  clients: 'clients',
  opportunities: 'opportunities',
  kanbanColumns: 'kanban_columns',
  automations: 'automations',
  users: 'users',
} as const

export type FirestoreCollection = (typeof firestoreCollections)[keyof typeof firestoreCollections]
