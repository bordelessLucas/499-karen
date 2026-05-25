import { enrichCardsWithClients } from '@shared/utils/link-crm-clients'
import type { Client, KanbanCardWithClient, KanbanColumn } from '@shared/types'
import { moveCardBetweenColumns, normalizeColumnOrders } from '@/lib/crm-move-card'

export function extractClientsFromCards(cards: KanbanCardWithClient[]): Client[] {
  const clients = new Map<string, Client>()

  for (const card of cards) {
    if (card.client) {
      clients.set(card.client.id, card.client)
    }
  }

  return [...clients.values()]
}

export function buildOptimisticCards(
  cards: KanbanCardWithClient[],
  columns: KanbanColumn[],
  cardId: string,
  targetColumnId: string,
  targetIndex?: number,
): KanbanCardWithClient[] {
  const movedCards = normalizeColumnOrders(
    moveCardBetweenColumns(cards, cardId, targetColumnId, targetIndex),
    columns,
  )

  return enrichCardsWithClients(movedCards, extractClientsFromCards(cards), columns)
}
