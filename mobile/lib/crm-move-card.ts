import type { KanbanCard, KanbanColumn } from '@shared/types'
import { dedupeCardsById } from '@shared/utils/link-crm-clients'

export function normalizeColumnOrders(
  cards: KanbanCard[],
  columns: KanbanColumn[],
): KanbanCard[] {
  const columnIds = new Set(columns.map((column) => column.id))
  const uniqueCards = dedupeCardsById(cards)
  const cardsByColumn = new Map<string, KanbanCard[]>()

  for (const card of uniqueCards) {
    if (!columnIds.has(card.columnId)) {
      continue
    }

    const columnCards = cardsByColumn.get(card.columnId) ?? []
    columnCards.push(card)
    cardsByColumn.set(card.columnId, columnCards)
  }

  const normalized = new Map<string, KanbanCard>()

  for (const column of columns) {
    const columnCards = (cardsByColumn.get(column.id) ?? []).sort(
      (left, right) => left.order - right.order,
    )

    columnCards.forEach((card, index) => {
      normalized.set(card.id, { ...card, order: index })
    })
  }

  const orphanedCards = uniqueCards.filter(
    (card) => !columnIds.has(card.columnId) && !normalized.has(card.id),
  )

  return [...normalized.values(), ...orphanedCards]
}

export function moveCardBetweenColumns(
  cards: KanbanCard[],
  cardId: string,
  targetColumnId: string,
  targetIndex?: number,
): KanbanCard[] {
  const movingCard = cards.find((card) => card.id === cardId)
  if (!movingCard) {
    return cards
  }

  const sourceColumnId = movingCard.columnId
  const cardsWithoutMoving = cards.filter((card) => card.id !== cardId)
  const targetCards = cardsWithoutMoving
    .filter((card) => card.columnId === targetColumnId)
    .sort((left, right) => left.order - right.order)

  const insertIndex =
    targetIndex === undefined
      ? targetCards.length
      : Math.max(0, Math.min(targetIndex, targetCards.length))

  const nextTargetCards = [...targetCards]
  nextTargetCards.splice(insertIndex, 0, { ...movingCard, columnId: targetColumnId })

  const nextCards = cardsWithoutMoving.filter((card) => card.columnId !== targetColumnId)
  const insertedTargetCards = nextTargetCards.map((card, index) => ({
    ...card,
    columnId: targetColumnId,
    order: index,
  }))

  const sourceCards = cardsWithoutMoving
    .filter((card) => card.columnId === sourceColumnId)
    .sort((left, right) => left.order - right.order)
    .map((card, index) => ({ ...card, order: index }))

  return dedupeCardsById([...nextCards, ...insertedTargetCards, ...sourceCards])
}
