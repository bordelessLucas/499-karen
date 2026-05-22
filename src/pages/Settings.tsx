import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Check,
  CreditCard,
  Globe,
  ImagePlus,
  KeyRound,
  Link2,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Save,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'

type SettingsTab = 'geral' | 'seguranca' | 'integracoes' | 'equipe' | 'faturamento'

type SaveStatus = 'idle' | 'saving' | 'saved'

type TabConfig = {
  id: SettingsTab
  label: string
  description: string
  icon: LucideIcon
}

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  status: 'ativo' | 'pendente' | 'inativo'
}

type Integration = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  iconClassName: string
  connected: boolean
}

type ActiveSession = {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

const tabs: TabConfig[] = [
  {
    id: 'geral',
    label: 'Geral',
    description: 'Identidade e preferências da empresa',
    icon: Building2,
  },
  {
    id: 'seguranca',
    label: 'Segurança',
    description: 'Senha e sessões ativas',
    icon: Shield,
  },
  {
    id: 'integracoes',
    label: 'Integrações',
    description: 'Conecte ferramentas externas',
    icon: Link2,
  },
  {
    id: 'equipe',
    label: 'Equipe',
    description: 'Usuários e permissões',
    icon: Users,
  },
  {
    id: 'faturamento',
    label: 'Faturamento',
    description: 'Plano e assinatura',
    icon: CreditCard,
  },
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Karen Silva',
    email: 'karen@borderless.io',
    role: 'Administradora',
    status: 'ativo',
  },
  {
    id: '2',
    name: 'Lucas Ferreira',
    email: 'lucas@borderless.io',
    role: 'Gerente Comercial',
    status: 'ativo',
  },
  {
    id: '3',
    name: 'Marina Costa',
    email: 'marina@borderless.io',
    role: 'Operações',
    status: 'pendente',
  },
  {
    id: '4',
    name: 'Pedro Almeida',
    email: 'pedro@borderless.io',
    role: 'Suporte',
    status: 'inativo',
  },
]

const integrations: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Dispare alertas e follow-ups direto no WhatsApp.',
    icon: MessageCircle,
    iconClassName: 'bg-emerald-100 text-emerald-700',
    connected: true,
  },
  {
    id: 'crm',
    name: 'CRM Externo',
    description: 'Sincronize oportunidades com seu CRM legado.',
    icon: Zap,
    iconClassName: 'bg-violet-100 text-violet-700',
    connected: false,
  },
  {
    id: 'email',
    name: 'E-mail Marketing',
    description: 'Conecte campanhas e automações de e-mail.',
    icon: Mail,
    iconClassName: 'bg-sky-100 text-sky-700',
    connected: false,
  },
]

const activeSessions: ActiveSession[] = [
  {
    id: 'session-1',
    device: 'Chrome · Windows',
    location: 'São Paulo, BR',
    lastActive: 'Agora',
    current: true,
  },
  {
    id: 'session-2',
    device: 'Safari · iPhone 15',
    location: 'Rio de Janeiro, BR',
    lastActive: 'Há 3 horas',
    current: false,
  },
  {
    id: 'session-3',
    device: 'Edge · MacBook Pro',
    location: 'Curitiba, BR',
    lastActive: 'Ontem',
    current: false,
  },
]

const statusConfig: Record<TeamMember['status'], { label: string; className: string }> = {
  ativo: { label: 'Ativo', className: 'bg-emerald-100 text-emerald-700' },
  pendente: { label: 'Pendente', className: 'bg-amber-100 text-amber-700' },
  inativo: { label: 'Inativo', className: 'bg-slate-100 text-slate-600' },
}

const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100'

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('geral')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [companyName, setCompanyName] = useState('Borderless Solutions')
  const [timezone, setTimezone] = useState('America/Sao_Paulo')
  const [connectedIntegrations, setConnectedIntegrations] = useState(
    () => new Set(integrations.filter((item) => item.connected).map((item) => item.id)),
  )

  useEffect(() => {
    if (saveStatus !== 'saved') {
      return
    }

    const timer = window.setTimeout(() => setSaveStatus('idle'), 2500)
    return () => window.clearTimeout(timer)
  }, [saveStatus])

  function handleSave() {
    setSaveStatus('saving')

    window.setTimeout(() => {
      setSaveStatus('saved')
    }, 900)
  }

  function toggleIntegration(id: string) {
    setConnectedIntegrations((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  return (
    <div className="min-w-0 space-y-8">
      <PageHeader
        badge="Administração"
        title="Configurações"
        description="Personalize sua operação, gerencie acessos e escale o BORDERLESS com controle total."
        action={
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={[
              'inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-lg transition disabled:cursor-not-allowed disabled:opacity-80',
              saveStatus === 'saved'
                ? 'bg-emerald-600 text-white shadow-emerald-600/25 hover:bg-emerald-500'
                : 'bg-violet-600 text-white shadow-violet-600/25 hover:bg-violet-500',
            ].join(' ')}
          >
            {saveStatus === 'saved' ? (
              <>
                <Check className="h-4 w-4" />
                Alterações salvas
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
              </>
            )}
          </button>
        }
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <nav className="lg:w-72 lg:shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex min-w-[220px] shrink-0 items-start gap-3 rounded-2xl border px-4 py-3 text-left transition lg:min-w-0 lg:w-full',
                    isActive
                      ? 'border-violet-200 bg-white text-violet-700 shadow-sm'
                      : 'border-transparent bg-white/70 text-slate-600 hover:border-slate-200 hover:bg-white',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                      isActive ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{tab.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{tab.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </nav>

        <section className="min-w-0 flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <activeTabConfig.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{activeTabConfig.label}</h2>
                <p className="text-sm text-slate-500">{activeTabConfig.description}</p>
              </div>
            </div>
          </div>

          {activeTab === 'geral' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="company-name">
                  Nome da empresa
                </label>
                <input
                  id="company-name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Logo da empresa</label>
                <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">borderless-logo.png</p>
                      <p className="text-sm text-slate-500">PNG ou SVG · Máx. 2 MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-600"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Enviar logo
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="timezone">
                  Fuso horário
                </label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(event) => setTimezone(event.target.value)}
                    className={`${inputClassName} pl-11`}
                  >
                    <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
                    <option value="America/Manaus">América/Manaus (GMT-4)</option>
                    <option value="America/New_York">América/Nova York (GMT-5)</option>
                    <option value="Europe/Lisbon">Europa/Lisboa (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'seguranca' ? (
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Senha de acesso</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Recomendamos trocar sua senha a cada 90 dias.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-600"
                  >
                    <KeyRound className="h-4 w-4" />
                    Trocar senha
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Sessões ativas</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Dispositivos conectados à sua conta BORDERLESS.
                </p>

                <div className="mt-4 space-y-3">
                  {activeSessions.map((session) => (
                    <article
                      key={session.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                          <MonitorSmartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{session.device}</p>
                          <p className="text-sm text-slate-500">
                            {session.location} · {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                          Sessão atual
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex w-fit rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                        >
                          Encerrar
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'integracoes' ? (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {integrations.map((integration) => {
                const Icon = integration.icon
                const isConnected = connectedIntegrations.has(integration.id)

                return (
                  <article
                    key={integration.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${integration.iconClassName}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                          {isConnected ? (
                            <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                              Conectado
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{integration.description}</p>
                        <button
                          type="button"
                          onClick={() => toggleIntegration(integration.id)}
                          className={[
                            'mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition',
                            isConnected
                              ? 'border border-slate-200 bg-white text-slate-700 hover:border-rose-200 hover:text-rose-600'
                              : 'bg-violet-600 text-white shadow-sm shadow-violet-600/20 hover:bg-violet-500',
                          ].join(' ')}
                        >
                          {isConnected ? 'Desconectar' : 'Conectar'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}

          {activeTab === 'equipe' ? (
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80">
                      <th className="px-5 py-4 font-semibold text-slate-700">Usuário</th>
                      <th className="px-5 py-4 font-semibold text-slate-700">Cargo</th>
                      <th className="px-5 py-4 font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => {
                      const status = statusConfig[member.status]

                      return (
                        <tr
                          key={member.id}
                          className="border-b border-slate-50 transition last:border-0 hover:bg-slate-50/50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-700">
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{member.name}</p>
                                <p className="text-slate-500">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600">{member.role}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activeTab === 'faturamento' ? (
            <div className="space-y-4">
              <article className="overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-600 to-violet-700 p-6 text-white shadow-lg shadow-violet-600/20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                      <Sparkles className="h-3.5 w-3.5" />
                      Plano atual
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold">Borderless Pro</h3>
                    <p className="mt-2 max-w-xl text-sm text-violet-100">
                      Ideal para equipes comerciais em crescimento, com CRM, automações e
                      relatórios avançados incluídos.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
                    <p className="text-sm text-violet-100">Valor mensal</p>
                    <p className="mt-1 text-3xl font-semibold">R$ 297</p>
                    <p className="mt-1 text-xs text-violet-100">Renovação em 12/06/2026</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {['Até 10 usuários', 'Automações ilimitadas', 'Relatórios avançados'].map(
                    (feature) => (
                      <div
                        key={feature}
                        className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium"
                      >
                        {feature}
                      </div>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  <Sparkles className="h-4 w-4" />
                  Upgrade
                </button>
              </article>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-700">Próxima cobrança</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">R$ 297,00 em 12/06/2026</p>
                <p className="mt-1 text-sm text-slate-500">
                  Cartão corporativo terminando em •••• 4242
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}
