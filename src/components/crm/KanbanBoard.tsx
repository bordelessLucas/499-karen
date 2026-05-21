import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CategoryFilter, KanbanCard, KanbanColumn } from '../../types/crm'
import { KanbanCardPreview } from './KanbanCard'
import { KanbanColumnBoard } from './KanbanColumn'

type KanbanBoardProps = {
  columns: KanbanColumn[]
  cards: KanbanCard[]
  categoryFilter: CategoryFilter
  onCardsChange: (cards: KanbanCard[]) => void
  onAddCard: (columnId: string) => void
  onAddColumn: () => void
  onSelectCard: (cardId: string) => void
}

function findColumnId(
  itemId: string,
  columns: KanbanColumn[],
  cards: KanbanCard[],
): string | undefined {
  if (columns.some((column) => column.id === itemId)) {
    return itemId
  }

  return cards.find((card) => card.id === itemId)?.columnId
}

function getCardsByColumn(cards: KanbanCard[], columnId: string, categoryFilter: CategoryFilter) {
  return cards
    .filter(
      (card) =>
        card.columnId === columnId &&
        (categoryFilter === 'todas' || card.category === categoryFilter),
    )
    .sort((a, b) => a.order - b.order)
}

function normalizeColumnOrders(cards: KanbanCard[], columnId: string) {
  const columnCards = cards
    .filter((card) => card.columnId === columnId)
    .sort((a, b) => a.order - b.order)

  return cards.map((card) => {
    if (card.columnId !== columnId) {
      return card
    }

    const index = columnCards.findIndex((item) => item.id === card.id)
    return { ...card, order: index }
  })
}

export function KanbanBoard({
  columns,
  cards,
  categoryFilter,
  onCardsChange,
  onAddCard,
  onAddColumn,
  onSelectCard,
}: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null)

  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragStart(event: DragStartEvent) {
    const card = cards.find((item) => item.id === event.active.id)
    if (card) {
      setActiveCard(card)
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) {
      return
    }

    const activeId = String(active.id)
    const overId = String(over.id)

    if (activeId === overId) {
      return
    }

    const activeCardItem = cards.find((card) => card.id === activeId)
    if (!activeCardItem) {
      return
    }

    const sourceColumnId = activeCardItem.columnId
    const targetColumnId = findColumnId(overId, columns, cards)

    if (!targetColumnId || sourceColumnId === targetColumnId) {
      return
    }

    const sourceCards = getCardsByColumn(cards, sourceColumnId, 'todas').filter(
      (card) => card.id !== activeId,
    )
    const targetCards = getCardsByColumn(cards, targetColumnId, 'todas')

    const overCard = cards.find((card) => card.id === overId)
    const insertIndex = overCard
      ? targetCards.findIndex((card) => card.id === overId)
      : targetCards.length

    const movedCard = { ...activeCardItem, columnId: targetColumnId, order: insertIndex }

    const nextCards = cards
      .filter((card) => card.id !== activeId)
      .map((card) => {
        if (card.columnId === sourceColumnId) {
          const index = sourceCards.findIndex((item) => item.id === card.id)
          return { ...card, order: index }
        }

        if (card.columnId === targetColumnId) {
          const index = targetCards.findIndex((item) => item.id === card.id)
          return {
            ...card,
            order: index >= insertIndex ? index + 1 : index,
          }
        }

        return card
      })

    onCardsChange(normalizeColumnOrders([...nextCards, movedCard], targetColumnId))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveCard(null)

    if (!over) {
      return
    }

    const activeId = String(active.id)
    const overId = String(over.id)

    const activeCardItem = cards.find((card) => card.id === activeId)
    if (!activeCardItem) {
      return
    }

    const sourceColumnId = activeCardItem.columnId
    const targetColumnId = findColumnId(overId, columns, cards)

    if (!targetColumnId) {
      return
    }

    const sourceCards = getCardsByColumn(cards, sourceColumnId, 'todas')
    const targetCards = getCardsByColumn(cards, targetColumnId, 'todas')

    if (sourceColumnId === targetColumnId) {
      const activeIndex = sourceCards.findIndex((card) => card.id === activeId)
      const overIndex = sourceCards.findIndex((card) => card.id === overId)

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
        return
      }

      const reordered = arrayMove(sourceCards, activeIndex, overIndex).map((card, index) => ({
        ...card,
        order: index,
      }))

      const nextCards = cards.map((card) => {
        if (card.columnId !== sourceColumnId) {
          return card
        }

        return reordered.find((item) => item.id === card.id) ?? card
      })

      onCardsChange(nextCards)
      return
    }

    const overIndex = targetCards.findIndex((card) => card.id === overId)
    const insertIndex = overIndex === -1 ? targetCards.length : overIndex

    const updatedSourceCards = sourceCards
      .filter((card) => card.id !== activeId)
      .map((card, index) => ({ ...card, order: index }))

    const updatedTargetCards = [...targetCards]
    updatedTargetCards.splice(insertIndex, 0, {
      ...activeCardItem,
      columnId: targetColumnId,
      order: insertIndex,
    })

    const normalizedTargetCards = updatedTargetCards.map((card, index) => ({
      ...card,
      order: index,
    }))

    const nextCards = cards.map((card) => {
      if (card.columnId === sourceColumnId && card.id !== activeId) {
        return updatedSourceCards.find((item) => item.id === card.id) ?? card
      }

      if (card.id === activeId) {
        return normalizedTargetCards.find((item) => item.id === card.id) ?? card
      }

      if (card.columnId === targetColumnId && card.id !== activeId) {
        return normalizedTargetCards.find((item) => item.id === card.id) ?? card
      }

      return card
    })

    onCardsChange(nextCards)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-scroll w-full overflow-x-auto overscroll-x-contain">
        <div className="flex w-max min-w-full gap-4 pb-2">
          {sortedColumns.map((column, index) => (
            <KanbanColumnBoard
              key={column.id}
              column={column}
              columnIndex={index}
              cards={getCardsByColumn(cards, column.id, categoryFilter)}
              onAddCard={onAddCard}
              onSelectCard={onSelectCard}
            />
          ))}

          <button
            type="button"
            onClick={onAddColumn}
            className="flex h-fit w-72 shrink-0 items-center justify-center gap-2 rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-sm font-medium text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          >
            <Plus className="h-4 w-4" />
            Nova coluna
          </button>
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeCard ? <KanbanCardPreview card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
