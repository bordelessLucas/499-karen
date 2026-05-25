export type AutomationTemplate = {
  id: string
  title: string
  trigger: string
  action: string
}

export type ActiveAutomation = {
  id: string
  title: string
  description: string
  metricPrimary: string
  metricSecondary: string
  enabled: boolean
}

export const activeAutomationsSeed: ActiveAutomation[] = [
  {
    id: 'auto-1',
    title: 'Follow-up pós-proposta',
    description: 'Envia lembrete automático quando uma oportunidade entra em Proposta.',
    metricPrimary: 'Disparado 42 vezes hoje',
    metricSecondary: 'Última execução há 2h',
    enabled: true,
  },
  {
    id: 'auto-2',
    title: 'Alerta de negociação quente',
    description: 'Notifica a equipe comercial via WhatsApp quando o deal está quente.',
    metricPrimary: 'Disparado 18 vezes hoje',
    metricSecondary: 'Última execução há 45min',
    enabled: true,
  },
  {
    id: 'auto-3',
    title: 'Resumo semanal de pipeline',
    description: 'Consolida métricas do funil e envia relatório toda segunda-feira.',
    metricPrimary: 'Disparado 6 vezes esta semana',
    metricSecondary: 'Última execução há 1 dia',
    enabled: true,
  },
]

export const automationTemplates: AutomationTemplate[] = [
  {
    id: 'template-1',
    title: 'Boas-vindas a novos clientes',
    trigger: 'Novo cliente',
    action: 'E-mail onboarding',
  },
  {
    id: 'template-2',
    title: 'Alerta de Negociação Quente',
    trigger: "Oportunidade em 'Proposta'",
    action: 'Notificar WhatsApp',
  },
  {
    id: 'template-3',
    title: 'Limpeza de Leads',
    trigger: 'Inativo 30 dias',
    action: 'Arquivar lead',
  },
]
