import type { TaskCategory, TaskPriority } from '../../types/crm'

export const categoryConfig: Record<
  TaskCategory,
  { label: string; className: string }
> = {
  vendas: { label: 'Vendas', className: 'bg-violet-100 text-violet-700' },
  suporte: { label: 'Suporte', className: 'bg-sky-100 text-sky-700' },
  marketing: { label: 'Marketing', className: 'bg-pink-100 text-pink-700' },
  'follow-up': { label: 'Follow-up', className: 'bg-amber-100 text-amber-700' },
}

export const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string; dotClassName: string }
> = {
  baixa: {
    label: 'Baixa',
    className: 'text-slate-500',
    dotClassName: 'bg-slate-400',
  },
  media: {
    label: 'Média',
    className: 'text-amber-600',
    dotClassName: 'bg-amber-500',
  },
  alta: {
    label: 'Alta',
    className: 'text-rose-600',
    dotClassName: 'bg-rose-500',
  },
}

export const columnAccentColors = [
  'bg-violet-500',
  'bg-sky-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
]

export function getColumnAccentColor(index: number) {
  return columnAccentColors[index % columnAccentColors.length]
}
