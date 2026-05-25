export type ReportKpi = {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

export type GrowthDataPoint = {
  month: string
  oportunidades: number
  fechamentos: number
}

export type ProgressMetric = {
  label: string
  value: number
  barClassName: string
}

export const reportKpis: ReportKpi[] = [
  {
    id: 'revenue',
    label: 'Receita Estimada',
    value: 'R$ 45.200',
    change: '+15%',
    changeType: 'positive',
  },
  {
    id: 'leads',
    label: 'Novos Leads',
    value: '124',
    change: '+8%',
    changeType: 'positive',
  },
  {
    id: 'conversion',
    label: 'Taxa de Conversão',
    value: '28%',
    change: '-2%',
    changeType: 'negative',
  },
  {
    id: 'closing-time',
    label: 'Tempo Médio de Fechamento',
    value: '14 dias',
    change: 'Estável vs mês anterior',
    changeType: 'neutral',
  },
]

export const growthChartData: GrowthDataPoint[] = [
  { month: 'Jan', oportunidades: 42, fechamentos: 18 },
  { month: 'Fev', oportunidades: 48, fechamentos: 22 },
  { month: 'Mar', oportunidades: 55, fechamentos: 26 },
  { month: 'Abr', oportunidades: 61, fechamentos: 29 },
  { month: 'Mai', oportunidades: 68, fechamentos: 34 },
  { month: 'Jun', oportunidades: 74, fechamentos: 38 },
]

export const lossReasons: ProgressMetric[] = [
  { label: 'Preço acima do budget', value: 38, barClassName: 'bg-violet-500' },
  { label: 'Timing inadequado', value: 24, barClassName: 'bg-sky-500' },
  { label: 'Concorrência direta', value: 18, barClassName: 'bg-amber-500' },
  { label: 'Falta de fit com produto', value: 12, barClassName: 'bg-rose-500' },
  { label: 'Outros motivos', value: 8, barClassName: 'bg-slate-400' },
]

export const channelPerformance: ProgressMetric[] = [
  { label: 'Indicações', value: 42, barClassName: 'bg-violet-500' },
  { label: 'Inbound / Site', value: 28, barClassName: 'bg-emerald-500' },
  { label: 'Outbound', value: 18, barClassName: 'bg-sky-500' },
  { label: 'Parceiros', value: 12, barClassName: 'bg-amber-500' },
]
