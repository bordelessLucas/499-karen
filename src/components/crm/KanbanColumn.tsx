import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import type { KanbanCard, KanbanColumn } from '../../types/crm'
import { getColumnAccentColor } from './crm-config'
import { KanbanCardItem } from './KanbanCard'

type KanbanColumnProps = {
  column: KanbanColumn
  columnIndex: number
  cards: KanbanCard[]
  onAddCard: (columnId: string) => void
  onSelectCard: (cardId: string) => void
}

export function KanbanColumnBoard({
  column,
  columnIndex,
  cards,
  onAddCard,
  onSelectCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', columnId: column.id },
  })

  const cardIds = cards.map((card) => card.id)
  const accentColor = getColumnAccentColor(columnIndex)

  return (
    <section className="flex w-72 shrink-0 flex-col rounded-3xl border border-slate-200 bg-slate-50/80 shadow-sm">
      <header className="flex items-center justify-between gap-2 border-b border-slate-200/80 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accentColor}`} />
          <h2 className="truncate font-semibold text-slate-900">{column.title}</h2>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs font-medium text-slate-600 shadow-sm">
            {cards.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAddCard(column.id)}
          className="rounded-xl p-1.5 text-slate-400 transition hover:bg-white hover:text-violet-600"
          aria-label={`Adicionar card em ${column.title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </header>

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={[
            'flex min-h-[120px] flex-1 flex-col gap-3 p-3 transition',
            isOver ? 'rounded-b-3xl bg-violet-50/60 ring-2 ring-inset ring-violet-200' : '',
          ].join(' ')}
        >
          {cards.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-8 text-center text-sm text-slate-400">
              Arraste cards aqui ou crie um novo
            </div>
          ) : (
            cards.map((card) => (
              <KanbanCardItem key={card.id} card={card} onSelect={onSelectCard} />
            ))
          )}
        </div>
      </SortableContext>
    </section>
  )
}
