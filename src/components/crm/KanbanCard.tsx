import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, GripVertical, User } from 'lucide-react'
import type { KanbanCard } from '../../types/crm'
import { categoryConfig, priorityConfig } from './crm-config'

type KanbanCardProps = {
  card: KanbanCard
  onSelect?: (cardId: string) => void
}

export function KanbanCardItem({ card, onSelect }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: 'card', columnId: card.columnId },
  })

  const category = categoryConfig[card.category]
  const priority = priorityConfig[card.priority]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={[
        'group rounded-2xl border bg-white p-4 shadow-sm transition',
        isDragging
          ? 'border-violet-300 shadow-lg ring-2 ring-violet-200 opacity-90'
          : 'border-slate-200 hover:border-violet-200 hover:shadow-md',
      ].join(' ')}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 cursor-grab touch-none rounded-lg p-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500 active:cursor-grabbing"
          aria-label="Arrastar card"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onSelect?.(card.id)}
          className="min-w-0 flex-1 space-y-3 text-left transition hover:opacity-90"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.className}`}
            >
              {category.label}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${priority.className}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${priority.dotClassName}`} />
              {priority.label}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            {card.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{card.description}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {card.clientName}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {card.dueDate}
            </span>
          </div>
        </button>
      </div>
    </article>
  )
}

export function KanbanCardPreview({ card }: KanbanCardProps) {
  const category = categoryConfig[card.category]
  const priority = priorityConfig[card.priority]

  return (
    <article className="w-72 rounded-2xl border border-violet-300 bg-white p-4 shadow-lg ring-2 ring-violet-200">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.className}`}
          >
            {category.label}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${priority.className}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${priority.dotClassName}`} />
            {priority.label}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900">{card.title}</h3>
      </div>
    </article>
  )
}
