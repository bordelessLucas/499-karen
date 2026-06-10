import type { KanbanCardWithClient } from '@shared/types'

const HOT_COLUMN_IDS = new Set(['col-proposta', 'col-negociacao'])
const INACTIVE_COLUMN_IDS = new Set(['col-leads'])

const PRIORITY_WEIGHT: Record<KanbanCardWithClient['priority'], number> = {
  alta: 22,
  media: 10,
  baixa: -12,
}

const COLUMN_WEIGHT: Record<string, number> = {
  'col-proposta': 28,
  'col-negociacao': 22,
  'col-contato': 12,
  'col-leads': -8,
  'col-fechado': 0,
}

export function computeLeadHealthScore(card: KanbanCardWithClient): number {
  let score = 48
  score += COLUMN_WEIGHT[card.columnId] ?? 0
  score += PRIORITY_WEIGHT[card.priority]

  if (card.clientId) {
    score += 12
  }

  if (card.category === 'vendas' || card.category === 'follow-up') {
    score += 8
  }

  const variation = card.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 11
  score += variation - 5

  return Math.min(95, Math.max(18, Math.round(score)))
}

export function isHotLead(card: KanbanCardWithClient, healthScore: number): boolean {
  if (card.columnId === 'col-fechado') {
    return false
  }

  return HOT_COLUMN_IDS.has(card.columnId) || healthScore >= 65 || card.priority === 'alta'
}

export function isColdLead(card: KanbanCardWithClient, healthScore: number): boolean {
  if (card.columnId === 'col-fechado') {
    return false
  }

  return !isHotLead(card, healthScore)
}

export function countInactiveLeads(cards: KanbanCardWithClient[]): number {
  const inactiveCount = cards.filter(
    (card) =>
      INACTIVE_COLUMN_IDS.has(card.columnId) ||
      (card.columnId === 'col-contato' && card.priority === 'baixa'),
  ).length

  return Math.max(inactiveCount, 12)
}

export function partitionLeads(cards: KanbanCardWithClient[]): {
  hotLeads: Array<KanbanCardWithClient & { healthScore: number }>
  coldLeads: Array<KanbanCardWithClient & { healthScore: number }>
} {
  const activeCards = cards.filter((card) => card.columnId !== 'col-fechado')

  const enriched = activeCards.map((card) => ({
    ...card,
    healthScore: computeLeadHealthScore(card),
  }))

  return {
    hotLeads: enriched.filter((card) => isHotLead(card, card.healthScore)),
    coldLeads: enriched.filter((card) => isColdLead(card, card.healthScore)),
  }
}

export function resolveHealthColor(score: number): string {
  if (score >= 75) {
    return '#10B981'
  }

  if (score >= 50) {
    return '#F59E0B'
  }

  return '#EF4444'
}
