import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Clock,
  DownloadCloud,
  Percent,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'

type PeriodOption = '7d' | '30d' | '90d' | '12m'

const periodLabels: Record<PeriodOption, string> = {
  '7d': 'Últimos 7 dias',
  '30d': 'Últimos 30 dias',
  '90d': 'Últimos 90 dias',
  '12m': 'Últimos 12 meses',
}

const kpiCards = [
  {
    id: 'revenue',
    label: 'Receita Estimada',
    value: 'R$ 45.200',
    change: '+15%',
    changeType: 'positive' as const,
    icon: Wallet,
    iconClassName: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'leads',
    label: 'Novos Leads',
    value: '124',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Users,
    iconClassName: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'conversion',
    label: 'Taxa de Conversão',
    value: '28%',
    change: '-2%',
    changeType: 'negative' as const,
    icon: Percent,
    iconClassName: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'closing-time',
    label: 'Tempo Médio de Fechamento',
    value: '14 dias',
    change: 'Estável vs mês anterior',
    changeType: 'neutral' as const,
    icon: Clock,
    iconClassName: 'bg-amber-100 text-amber-700',
  },
]

const growthChartData = [
  { month: 'Jan', oportunidades: 42, fechamentos: 18 },
  { month: 'Fev', oportunidades: 48, fechamentos: 22 },
  { month: 'Mar', oportunidades: 55, fechamentos: 26 },
  { month: 'Abr', oportunidades: 61, fechamentos: 29 },
  { month: 'Mai', oportunidades: 68, fechamentos: 34 },
  { month: 'Jun', oportunidades: 74, fechamentos: 38 },
]

const lossReasons = [
  { label: 'Preço acima do budget', value: 38, color: 'bg-violet-500' },
  { label: 'Timing inadequado', value: 24, color: 'bg-sky-500' },
  { label: 'Concorrência direta', value: 18, color: 'bg-amber-500' },
  { label: 'Falta de fit com produto', value: 12, color: 'bg-rose-500' },
  { label: 'Outros motivos', value: 8, color: 'bg-slate-400' },
]

const channelPerformance = [
  { label: 'Indicações', value: 42, color: 'bg-violet-500' },
  { label: 'Inbound / Site', value: 28, color: 'bg-emerald-500' },
  { label: 'Outbound', value: 18, color: 'bg-sky-500' },
  { label: 'Parceiros', value: 12, color: 'bg-amber-500' },
]

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      <div className="mt-2 space-y-1">
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm text-slate-600">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}:
            </span>{' '}
            {entry.value}
          </p>
        ))}
      </div>
    </div>
  )
}

type ProgressListProps = {
  title: string
  description: string
  items: { label: string; value: number; color: string }[]
}

function ProgressList({ title, description, items }: ProgressListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-900">{item.value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('30d')

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        badge="Inteligência de dados"
        title="Relatórios e Performance"
        description="Acompanhe as métricas estratégicas e o crescimento da sua operação."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Calendar className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value as PeriodOption)}
                className="appearance-none rounded-2xl border border-slate-200 bg-white py-3 pr-10 pl-11 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                aria-label="Selecionar período"
              >
                {Object.entries(periodLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-600"
            >
              <DownloadCloud className="h-4 w-4" />
              Exportar
            </button>
          </div>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          const isPositive = kpi.changeType === 'positive'
          const isNegative = kpi.changeType === 'negative'

          return (
            <article
              key={kpi.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{kpi.value}</p>
                  <div
                    className={[
                      'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                      isPositive ? 'text-emerald-600' : '',
                      isNegative ? 'text-rose-600' : '',
                      kpi.changeType === 'neutral' ? 'text-slate-500' : '',
                    ].join(' ')}
                  >
                    {isPositive ? <ArrowUpRight className="h-4 w-4" /> : null}
                    {isNegative ? <ArrowDownRight className="h-4 w-4" /> : null}
                    {kpi.change}
                  </div>
                </div>
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${kpi.iconClassName}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Oportunidades vs Fechamentos</h2>
            <p className="mt-1 text-sm text-slate-500">
              Evolução mensal do funil comercial nos últimos 6 meses.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700">
            <TrendingUp className="h-3.5 w-3.5" />
            Tendência de crescimento
          </span>
        </div>

        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthChartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOportunidades" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFechamentos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: 16, fontSize: 13 }}
              />
              <Area
                type="monotone"
                dataKey="oportunidades"
                name="Oportunidades Criadas"
                stroke="#7c3aed"
                strokeWidth={2.5}
                fill="url(#colorOportunidades)"
              />
              <Area
                type="monotone"
                dataKey="fechamentos"
                name="Vendas Fechadas"
                stroke="#64748b"
                strokeWidth={2.5}
                fill="url(#colorFechamentos)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProgressList
          title="Motivos de Perda"
          description="Principais fatores que impediram o fechamento no período."
          items={lossReasons}
        />

        <ProgressList
          title="Performance por Canal"
          description="Contribuição de cada canal na geração de oportunidades qualificadas."
          items={channelPerformance}
        />
      </section>

      <section className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Meta mensal: 82% atingida</p>
              <p className="text-sm text-slate-500">
                Faltam 9 fechamentos para bater a meta de junho com folga.
              </p>
            </div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 sm:w-64">
            <div className="h-full w-[82%] rounded-full bg-violet-600" />
          </div>
        </div>
      </section>
    </div>
  )
}
