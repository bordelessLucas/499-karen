import {
  ArrowUpRight,
  Briefcase,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { StatCard } from '../components/ui/StatCard'
import { useAuth } from '../contexts/useAuth'

const recentActivities = [
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
  {
    id: '4',
    title: 'Relatório disponível',
    description: 'Resumo semanal de performance gerado.',
    time: 'Ontem',
    type: 'relatorio' as const,
  },
]

const quickActions = [
  {
    label: 'Área de Clientes',
    description: 'Gerencie contas e relacionamentos',
    to: '/clientes',
    icon: Users,
  },
  {
    label: 'CRM & Funil',
    description: 'Acompanhe oportunidades comerciais',
    to: '/crm',
    icon: Briefcase,
  },
  {
    label: 'Automações',
    description: 'Configure fluxos inteligentes',
    to: '/automacoes',
    icon: Zap,
  },
]

const activityIcons = {
  cliente: Users,
  automacao: Zap,
  crm: Briefcase,
  relatorio: TrendingUp,
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function Dashboard() {
  const { currentUser } = useAuth()
  const displayName = currentUser?.email?.split('@')[0] ?? 'usuário'

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Visão geral"
        title={`${getGreeting()}, ${displayName}`}
        description="Centralize indicadores, automações e o crescimento da sua operação em um painel inteligente."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Clientes ativos"
          value="24"
          change="+12% este mês"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          label="Oportunidades no funil"
          value="8"
          change="3 em negociação"
          changeType="neutral"
          icon={Briefcase}
          iconClassName="bg-sky-100 text-sky-600"
        />
        <StatCard
          label="Automações ativas"
          value="5"
          change="2 executadas hoje"
          changeType="positive"
          icon={Zap}
          iconClassName="bg-amber-100 text-amber-600"
        />
        <StatCard
          label="Taxa de conversão"
          value="34%"
          change="+5% vs. mês anterior"
          changeType="positive"
          icon={TrendingUp}
          iconClassName="bg-emerald-100 text-emerald-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Atividade recente</h2>
              <p className="mt-1 text-sm text-slate-500">
                Últimas movimentações da sua operação
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              <Clock className="h-3.5 w-3.5" />
              Tempo real
            </span>
          </div>

          <ul className="mt-6 space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <li
                  key={activity.id}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-4 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-violet-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{activity.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{activity.description}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-slate-400">
                    {activity.time}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-violet-600 to-violet-700 p-6 text-white shadow-lg shadow-violet-600/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
                Inteligência
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Automação premium</h2>
            <p className="mt-2 text-sm leading-6 text-violet-100">
              Sua plataforma está pronta para escalar com fluxos inteligentes, CRM
              integrado e experiência consistente.
            </p>
            <Link
              to="/automacoes"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/25"
            >
              Explorar automações
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Acesso rápido</h2>
            <p className="mt-1 text-sm text-slate-500">Navegue para os módulos principais</p>
            <ul className="mt-4 space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <li key={action.to}>
                    <Link
                      to={action.to}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                        <Icon className="h-5 w-5 text-violet-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900">{action.label}</p>
                        <p className="text-xs text-slate-500">{action.description}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
