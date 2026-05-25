import { useMemo, type CSSProperties } from 'react'
import { Text, View } from 'react-native'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import type { KanbanCardWithClient, KanbanColumn } from '@shared/types'
import { CrmOpportunityCard } from './CrmOpportunityCard'

type CrmKanbanDesktopProps = {
  columns: KanbanColumn[]
  cards: KanbanCardWithClient[]
  onCardPress: (card: KanbanCardWithClient) => void
  onMoveCard: (cardId: string, targetColumnId: string, targetIndex?: number) => void
  activeDragCardId: string | null
  onDragStart: (cardId: string) => void
  onDragEnd: () => void
  overColumnId?: string | null
  onDragOver?: (columnId: string | null) => void
}

type ColumnGroup = {
  column: KanbanColumn
  cards: KanbanCardWithClient[]
}

function DesktopDraggableCard({
  card,
  onPress,
  isGhost,
}: {
  card: KanbanCardWithClient
  onPress: () => void
  isGhost: boolean
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.id,
    data: { type: 'card', card, columnId: card.columnId },
  })

  const style: CSSProperties = {
    opacity: isDragging || isGhost ? 0.35 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
    transition: isDragging ? undefined : 'opacity 150ms ease, transform 200ms ease',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CrmOpportunityCard
        card={card}
        onPress={onPress}
        isDragging={isGhost}
        isLifted={false}
      />
    </div>
  )
}

function DesktopKanbanColumn({
  group,
  onCardPress,
  activeDragCardId,
  isOver,
}: {
  group: ColumnGroup
  onCardPress: (card: KanbanCardWithClient) => void
  activeDragCardId: string | null
  isOver: boolean
}) {
  const { setNodeRef } = useDroppable({
    id: group.column.id,
    data: { type: 'column', columnId: group.column.id },
  })

  return (
    <div
      ref={setNodeRef}
      className={[
        'flex w-80 shrink-0 flex-col rounded-3xl border bg-white shadow-sm transition-colors duration-150',
        isOver ? 'border-violet-400 bg-violet-50/40' : 'border-slate-200',
      ].join(' ')}
    >
      <View className="flex-row items-center gap-3 border-b border-slate-100 px-4 py-4">
        <View className="h-2.5 w-2.5 rounded-full bg-violet-500" />
        <Text className="text-base font-semibold text-slate-900">{group.column.title}</Text>
        <View className="rounded-full bg-slate-100 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-slate-600">{group.cards.length}</Text>
        </View>
      </View>
      <div className="flex min-h-[420px] flex-col gap-3 p-4">
        {group.cards.length === 0 ? (
          <Text className="py-8 text-center text-sm text-slate-400">
            {isOver ? 'Solte aqui' : 'Nenhuma oportunidade nesta etapa.'}
          </Text>
        ) : (
          group.cards.map((card) => (
            <DesktopDraggableCard
              key={card.id}
              card={card}
              onPress={() => onCardPress(card)}
              isGhost={activeDragCardId === card.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export function CrmKanbanDesktop({
  columns,
  cards,
  onCardPress,
  onMoveCard,
  activeDragCardId,
  onDragStart,
  onDragEnd,
  overColumnId = null,
  onDragOver,
}: CrmKanbanDesktopProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor),
  )

  const groupedCards = useMemo<ColumnGroup[]>(() => {
    return columns.map((column) => ({
      column,
      cards: cards
        .filter((card) => card.columnId === column.id)
        .sort((left, right) => left.order - right.order),
    }))
  }, [columns, cards])

  const activeCard = cards.find((card) => card.id === activeDragCardId) ?? null

  function resolveTargetColumnId(overId: string | number | undefined): string | null {
    if (!overId) {
      return null
    }

    const overIdString = String(overId)
    const targetColumn = columns.find((column) => column.id === overIdString)
    if (targetColumn) {
      return targetColumn.id
    }

    const targetCard = cards.find((card) => card.id === overIdString)
    return targetCard?.columnId ?? null
  }

  function handleDragStart(event: DragStartEvent) {
    onDragStart(String(event.active.id))
  }

  function handleDragOver(event: DragOverEvent) {
    onDragOver?.(resolveTargetColumnId(event.over?.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const cardId = String(event.active.id)
    const targetColumnId = resolveTargetColumnId(event.over?.id)

    if (targetColumnId) {
      const targetCards = cards
        .filter((card) => card.columnId === targetColumnId && card.id !== cardId)
        .sort((left, right) => left.order - right.order)

      onMoveCard(cardId, targetColumnId, targetCards.length)
    }

    onDragOver?.(null)
    onDragEnd()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max flex-row gap-4">
          {groupedCards.map((group) => (
            <DesktopKanbanColumn
              key={group.column.id}
              group={group}
              onCardPress={onCardPress}
              activeDragCardId={activeDragCardId}
              isOver={overColumnId === group.column.id}
            />
          ))}
        </div>
      </div>
      <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1)' }}>
        {activeCard ? (
          <div className="w-72 rotate-1 cursor-grabbing shadow-2xl">
            <CrmOpportunityCard card={activeCard} isLifted />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
