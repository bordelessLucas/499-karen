import type { TaskCategory, TaskPriority } from '../types/crm'

export const categoryLabels: Record<TaskCategory, string> = {
  vendas: 'Vendas',
  suporte: 'Suporte',
  marketing: 'Marketing',
  'follow-up': 'Follow-up',
}

export const priorityLabels: Record<TaskPriority, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
}
