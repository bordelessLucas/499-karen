export type DashboardStat = {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

export const dashboardStats: DashboardStat[] = [
  {
    id: 'clients',
    label: 'Clientes ativos',
    value: '128',
    change: '+12% vs mês anterior',
    changeType: 'positive',
  },
  {
    id: 'pipeline',
    label: 'Oportunidades no funil',
    value: '8',
    change: '+3 novas esta semana',
    changeType: 'positive',
  },
  {
    id: 'automations',
    label: 'Automações ativas',
    value: '3',
    change: '100% operacionais',
    changeType: 'neutral',
  },
  {
    id: 'conversion',
    label: 'Taxa de conversão',
    value: '28%',
    change: '-2% vs mês anterior',
    changeType: 'negative',
  },
]

export const recentActivities = [
  {
    id: '1',
    title: 'Novo cliente cadastrado',
    description: 'TechNova Solutions entrou na base de clientes.',
    time: 'Há 2 horas',
    type: 'cliente' as const,
  },
  {
    id: '2',
    title: 'Automação ativada',
    description: 'Fluxo de boas-vindas disparado para 3 contatos.',
    time: 'Há 5 horas',
    type: 'automacao' as const,
  },
  {
    id: '3',
    title: 'Oportunidade no funil',
    description: 'Proposta enviada para Mercado Azul Ltda.',
    time: 'Ontem',
    type: 'crm' as const,
  },
]
