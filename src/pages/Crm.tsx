import { LayoutGrid, Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { KanbanBoard } from '../components/crm/KanbanBoard'
import { TaskDetailModal } from '../components/crm/TaskDetailModal'
import { categoryConfig } from '../components/crm/crm-config'
import { PageHeader } from '../components/ui/PageHeader'
import { initialCards, initialColumns } from '../data/initial-crm'
import type {
  CategoryFilter,
  KanbanCard,
  KanbanColumn,
  TaskCategory,
  TaskPriority,
} from '../types/crm'

type NewCardForm = {
  title: string
  description: string
  category: TaskCategory
  priority: TaskPriority
  clientName: string
  dueDate: string
  columnId: string
}

const emptyCardForm: NewCardForm = {
  title: '',
  description: '',
  category: 'vendas',
  priority: 'media',
  clientName: '',
  dueDate: '',
  columnId: '',
}

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'follow-up', label: 'Follow-up' },
]

function formatToday() {
  return new Date().toLocaleDateString('pt-BR')
}

export function Crm() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('todas')
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [cardForm, setCardForm] = useState<NewCardForm>(emptyCardForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns],
  )

  const visibleCardsCount = useMemo(() => {
    if (categoryFilter === 'todas') {
      return cards.length
    }

    return cards.filter((card) => card.category === categoryFilter).length
  }, [cards, categoryFilter])

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) ?? null,
    [cards, selectedCardId],
  )

  const selectedCardColumnTitle = useMemo(() => {
    if (!selectedCard) {
      return ''
    }

    return columns.find((column) => column.id === selectedCard.columnId)?.title ?? 'Sem coluna'
  }, [columns, selectedCard])

  function openCardModal(columnId?: string) {
    const targetColumnId = columnId ?? sortedColumns[0]?.id ?? ''
    setCardForm({ ...emptyCardForm, columnId: targetColumnId, dueDate: formatToday() })
    setIsCardModalOpen(true)
  }

  function handleAddCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const columnCards = cards.filter((card) => card.columnId === cardForm.columnId)

    const newCard: KanbanCard = {
      id: crypto.randomUUID(),
      title: cardForm.title.trim(),
      description: cardForm.description.trim(),
      category: cardForm.category,
      priority: cardForm.priority,
      clientName: cardForm.clientName.trim() || 'Sem cliente',
      dueDate: cardForm.dueDate.trim() || formatToday(),
      columnId: cardForm.columnId,
      order: columnCards.length,
    }

    setCards((current) => [...current, newCard])
    setCardForm(emptyCardForm)
    setIsCardModalOpen(false)
  }

  function handleAddColumn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = newColumnTitle.trim()
    if (!title) {
      return
    }

    const newColumn: KanbanColumn = {
      id: crypto.randomUUID(),
      title,
      order: columns.length,
    }

    setColumns((current) => [...current, newColumn])
    setNewColumnTitle('')
    setIsColumnModalOpen(false)
  }

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        badge="Pipeline comercial"
        title="CRM & Funil"
        description="Gerencie oportunidades em um Kanban interativo. Crie colunas, organize tasks por categoria e mova cards com drag and drop."
        action={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsColumnModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-600"
            >
              <LayoutGrid className="h-4 w-4" />
              Nova coluna
            </button>
            <button
              type="button"
              onClick={() => openCardModal()}
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
            >
              <Plus className="h-4 w-4" />
              Nova oportunidade
            </button>
          </div>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setCategoryFilter(filter.value)}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition',
                categoryFilter === filter.value
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600',
              ].join(' ')}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-500">
          {visibleCardsCount} oportunidade{visibleCardsCount === 1 ? '' : 's'} ·{' '}
          {columns.length} coluna{columns.length === 1 ? '' : 's'}
        </p>
      </div>

      <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <KanbanBoard
          columns={columns}
          cards={cards}
          categoryFilter={categoryFilter}
          onCardsChange={setCards}
          onAddCard={openCardModal}
          onAddColumn={() => setIsColumnModalOpen(true)}
          onSelectCard={setSelectedCardId}
        />
      </section>

      {selectedCard ? (
        <TaskDetailModal
          card={selectedCard}
          columnTitle={selectedCardColumnTitle}
          onClose={() => setSelectedCardId(null)}
        />
      ) : null}

      {isCardModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-card-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="new-card-title" className="text-xl font-semibold text-slate-900">
                  Nova oportunidade
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Crie um card estilo task para acompanhar no funil.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCardModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleAddCard}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="card-title">
                  Título
                </label>
                <input
                  id="card-title"
                  value={cardForm.title}
                  onChange={(event) =>
                    setCardForm((current) => ({ ...current, title: event.target.value }))
                  }
                  required
                  placeholder="Ex: Proposta comercial Q2"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="card-description">
                  Descrição
                </label>
                <textarea
                  id="card-description"
                  value={cardForm.description}
                  onChange={(event) =>
                    setCardForm((current) => ({ ...current, description: event.target.value }))
                  }
                  rows={3}
                  placeholder="Detalhes da oportunidade..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="card-category">
                    Categoria
                  </label>
                  <select
                    id="card-category"
                    value={cardForm.category}
                    onChange={(event) =>
                      setCardForm((current) => ({
                        ...current,
                        category: event.target.value as TaskCategory,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  >
                    {Object.entries(categoryConfig).map(([value, config]) => (
                      <option key={value} value={value}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="card-priority">
                    Prioridade
                  </label>
                  <select
                    id="card-priority"
                    value={cardForm.priority}
                    onChange={(event) =>
                      setCardForm((current) => ({
                        ...current,
                        priority: event.target.value as TaskPriority,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="card-client">
                    Cliente
                  </label>
                  <input
                    id="card-client"
                    value={cardForm.clientName}
                    onChange={(event) =>
                      setCardForm((current) => ({ ...current, clientName: event.target.value }))
                    }
                    placeholder="Nome do cliente"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="card-due-date">
                    Prazo
                  </label>
                  <input
                    id="card-due-date"
                    value={cardForm.dueDate}
                    onChange={(event) =>
                      setCardForm((current) => ({ ...current, dueDate: event.target.value }))
                    }
                    placeholder="DD/MM/AAAA"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="card-column">
                  Coluna
                </label>
                <select
                  id="card-column"
                  value={cardForm.columnId}
                  onChange={(event) =>
                    setCardForm((current) => ({ ...current, columnId: event.target.value }))
                  }
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  {sortedColumns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCardModalOpen(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  Criar card
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isColumnModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-column-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="new-column-title" className="text-xl font-semibold text-slate-900">
                  Nova coluna
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Adicione uma etapa personalizada ao seu funil.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsColumnModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleAddColumn}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="column-title">
                  Nome da coluna
                </label>
                <input
                  id="column-title"
                  value={newColumnTitle}
                  onChange={(event) => setNewColumnTitle(event.target.value)}
                  required
                  placeholder="Ex: Qualificação"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsColumnModalOpen(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  Criar coluna
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
