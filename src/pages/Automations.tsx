import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  ArrowRight,
  Bell,
  Clock,
  Mail,
  MessageCircle,
  Plus,
  Sparkles,
  UserPlus,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'

type ActiveAutomation = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  iconClassName: string
  metricPrimary: string
  metricSecondary: string
  enabled: boolean
}

type AutomationTemplate = {
  id: string
  title: string
  trigger: string
  action: string
  icon: LucideIcon
  iconClassName: string
  accentClassName: string
}

const initialActiveAutomations: ActiveAutomation[] = [
  {
    id: 'auto-1',
    title: 'Follow-up pós-proposta',
    description: 'Envia lembrete automático quando uma oportunidade entra em Proposta.',
    icon: Mail,
    iconClassName: 'bg-violet-100 text-violet-700',
    metricPrimary: 'Disparado 42 vezes hoje',
    metricSecondary: 'Última execução há 2h',
    enabled: true,
  },
  {
    id: 'auto-2',
    title: 'Alerta de negociação quente',
    description: 'Notifica a equipe comercial via WhatsApp quando o deal está quente.',
    icon: MessageCircle,
    iconClassName: 'bg-emerald-100 text-emerald-700',
    metricPrimary: 'Disparado 18 vezes hoje',
    metricSecondary: 'Última execução há 45min',
    enabled: true,
  },
  {
    id: 'auto-3',
    title: 'Resumo semanal de pipeline',
    description: 'Consolida métricas do funil e envia relatório toda segunda-feira.',
    icon: Bell,
    iconClassName: 'bg-sky-100 text-sky-700',
    metricPrimary: 'Disparado 6 vezes esta semana',
    metricSecondary: 'Última execução há 1 dia',
    enabled: true,
  },
]

const automationTemplates: AutomationTemplate[] = [
  {
    id: 'template-1',
    title: 'Boas-vindas a novos clientes',
    trigger: 'Novo cliente',
    action: 'E-mail onboarding',
    icon: UserPlus,
    iconClassName: 'bg-violet-100 text-violet-700',
    accentClassName: 'from-violet-500/10 to-violet-500/5',
  },
  {
    id: 'template-2',
    title: 'Alerta de Negociação Quente',
    trigger: "Oportunidade em 'Proposta'",
    action: 'Notificar WhatsApp',
    icon: MessageCircle,
    iconClassName: 'bg-emerald-100 text-emerald-700',
    accentClassName: 'from-emerald-500/10 to-emerald-500/5',
  },
  {
    id: 'template-3',
    title: 'Limpeza de Leads',
    trigger: 'Inativo 30 dias',
    action: 'Arquivar lead',
    icon: Archive,
    iconClassName: 'bg-amber-100 text-amber-700',
    accentClassName: 'from-amber-500/10 to-amber-500/5',
  },
]

type ToggleSwitchProps = {
  enabled: boolean
  onToggle: () => void
  label: string
}

function ToggleSwitch({ enabled, onToggle, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={[
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition',
        enabled ? 'bg-violet-600 shadow-inner shadow-violet-700/20' : 'bg-slate-200',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 rounded-full bg-white shadow-sm transition',
          enabled ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}

export function Automations() {
  const [activeAutomations, setActiveAutomations] = useState(initialActiveAutomations)

  function toggleAutomation(id: string) {
    setActiveAutomations((current) =>
      current.map((automation) =>
        automation.id === id ? { ...automation, enabled: !automation.enabled } : automation,
      ),
    )
  }

  return (
    <div className="min-w-0 space-y-10">
      <PageHeader
        badge="Orquestração inteligente"
        title="Automações Inteligentes"
        description="Gerencie seus fluxos ativos ou descubra novos templates para escalar sua operação."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
          >
            <Plus className="h-4 w-4" />
            Nova Automação
          </button>
        }
      />

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Automações ativas</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fluxos em execução monitorados em tempo real.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {activeAutomations.filter((item) => item.enabled).length} fluxos rodando
          </span>
        </div>

        <div className="space-y-3">
          {activeAutomations.map((automation) => {
            const Icon = automation.icon

            return (
              <article
                key={automation.id}
                className={[
                  'flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm transition sm:flex-row sm:items-center sm:justify-between',
                  automation.enabled ? 'border-slate-200' : 'border-slate-100 opacity-80',
                ].join(' ')}
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${automation.iconClassName}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{automation.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{automation.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        <Zap className="h-3 w-3 text-violet-500" />
                        {automation.metricPrimary}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {automation.metricSecondary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span
                    className={[
                      'text-xs font-medium',
                      automation.enabled ? 'text-emerald-600' : 'text-slate-400',
                    ].join(' ')}
                  >
                    {automation.enabled ? 'Ativo' : 'Pausado'}
                  </span>
                  <ToggleSwitch
                    enabled={automation.enabled}
                    onToggle={() => toggleAutomation(automation.id)}
                    label={`Alternar ${automation.title}`}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Galeria de templates</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ative fluxos prontos em um clique e escale sem complexidade.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            Recomendados para você
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {automationTemplates.map((template) => {
            const Icon = template.icon

            return (
              <article
                key={template.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md"
              >
                <div className={`bg-linear-to-br ${template.accentClassName} px-5 pt-5 pb-4`}>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ${template.iconClassName}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-slate-900">{template.title}</h3>

                  <div className="mt-4 space-y-2">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                      <p className="text-xs font-medium text-slate-400">Gatilho</p>
                      <p className="mt-0.5 text-sm text-slate-700">{template.trigger}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-violet-400" />
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                      <p className="text-xs font-medium text-slate-400">Ação</p>
                      <p className="mt-0.5 text-sm text-slate-700">{template.action}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition group-hover:border-violet-200 group-hover:text-violet-600 hover:bg-violet-50"
                  >
                    Ativar Template
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
