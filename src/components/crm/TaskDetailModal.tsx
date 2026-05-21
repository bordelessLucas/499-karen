import { Calendar, Columns3, Tag, User, X } from 'lucide-react'
import type { KanbanCard } from '../../types/crm'
import { categoryConfig, priorityConfig } from './crm-config'

type TaskDetailModalProps = {
  card: KanbanCard
  columnTitle: string
  onClose: () => void
}

export function TaskDetailModal({ card, columnTitle, onClose }: TaskDetailModalProps) {
  const category = categoryConfig[card.category]
  const priority = priorityConfig[card.priority]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-detail-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.className}`}
              >
                {category.label}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${priority.className}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${priority.dotClassName}`} />
                Prioridade {priority.label.toLowerCase()}
              </span>
            </div>
            <h2 id="task-detail-title" className="text-xl font-semibold text-slate-900">
              {card.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <section className="space-y-2">
            <h3 className="text-sm font-medium text-slate-700">Descrição</h3>
            <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
              {card.description || 'Nenhuma descrição informada.'}
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <User className="h-3.5 w-3.5" />
                Cliente
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900">{card.clientName}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                Prazo
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900">{card.dueDate}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Tag className="h-3.5 w-3.5" />
                Categoria
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900">{category.label}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Columns3 className="h-3.5 w-3.5" />
                Etapa do funil
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900">{columnTitle}</p>
            </div>
          </section>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
