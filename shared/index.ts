export * from './types'
export * from './data'
export * from './storage'
export * from './services'
export * from './contexts'
export * from './constants/firestore-collections'
export {
  buildLinkedCrmSnapshot,
  buildMissingClientOpportunityCards,
  dedupeCardsById,
  enrichCardsWithClients,
  enrichClientsWithPipeline,
  linkCardsToClients,
  mergeClientOpportunities,
  resolveDefaultColumns,
} from './utils/link-crm-clients'
export type {
  ClientWithPipeline,
  KanbanCardWithClient,
  LinkedCrmSnapshot,
} from './utils/link-crm-clients'
export { generateId } from './utils/generate-id'
