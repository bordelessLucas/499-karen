import { Plus, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { initialClients } from '../data/initial-clients'
import type { Client, ClientStatus } from '../types/client'

const statusConfig: Record<
  ClientStatus,
  { label: string; className: string }
> = {
  ativo: { label: 'Ativo', className: 'bg-emerald-100 text-emerald-700' },
  prospecto: { label: 'Prospecto', className: 'bg-amber-100 text-amber-700' },
  inativo: { label: 'Inativo', className: 'bg-slate-100 text-slate-600' },
}

const statusFilters: { value: ClientStatus | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'prospecto', label: 'Prospectos' },
  { value: 'inativo', label: 'Inativos' },
]

type NewClientForm = {
  name: string
  company: string
  email: string
  status: ClientStatus
}

const emptyForm: NewClientForm = {
  name: '',
  company: '',
  email: '',
  status: 'prospecto',
}

function formatToday() {
  return new Date().toLocaleDateString('pt-BR')
}

export function Clientes() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'todos'>('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<NewClientForm>(emptyForm)

  const filteredClients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === 'todos' || client.status === statusFilter
      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [clients, searchQuery, statusFilter])

  function handleAddClient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newClient: Client = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      status: form.status,
      lastContact: formatToday(),
    }

    setClients((current) => [newClient, ...current])
    setForm(emptyForm)
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Gestão de contas"
        title="Área de Clientes"
        description="Visualize, filtre e gerencie o relacionamento com suas contas em uma experiência premium e organizada."
        action={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
          >
            <Plus className="h-4 w-4" />
            Novo cliente
          </button>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar por nome, empresa ou e-mail..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition',
                statusFilter === filter.value
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600',
              ].join(' ')}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 font-semibold text-slate-700">Cliente</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Empresa</th>
                <th className="px-6 py-4 font-semibold text-slate-700">E-mail</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Último contato
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum cliente encontrado para os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const status = statusConfig[client.status]
                  return (
                    <tr
                      key={client.id}
                      className="border-b border-slate-50 transition last:border-0 hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-700">
                            {client.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{client.company}</td>
                      <td className="px-6 py-4 text-slate-600">{client.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{client.lastContact}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          {filteredClients.length} de {clients.length} clientes exibidos
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-client-title"
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="new-client-title" className="text-xl font-semibold text-slate-900">
                  Novo cliente
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Preencha os dados para adicionar à sua base.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleAddClient}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="client-name">
                  Nome
                </label>
                <input
                  id="client-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="client-company"
                >
                  Empresa
                </label>
                <input
                  id="client-company"
                  value={form.company}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, company: event.target.value }))
                  }
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="client-email">
                  E-mail
                </label>
                <input
                  id="client-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="client-status">
                  Status
                </label>
                <select
                  id="client-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as ClientStatus,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option value="prospecto">Prospecto</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  Salvar cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
