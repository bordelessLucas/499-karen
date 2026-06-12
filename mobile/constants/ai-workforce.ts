import type { LucideIcon } from 'lucide-react-native'
import {
  Bot,
  HeartPulse,
  Search,
  UserCheck,
  Workflow,
} from 'lucide-react-native'

export type AiWorkforceAgent = {
  id: string
  name: string
  role: string
  history: string
  icon: LucideIcon
  accentColor: string
}

export const AI_WORKFORCE_AGENTS: AiWorkforceAgent[] = [
  {
    id: 'marketing-therapist',
    name: 'Marketing Therapist',
    role: 'Analisa tom emocional e posicionamento da sua comunicação',
    history: 'Otimizou 5 peças de conteúdo ontem',
    icon: HeartPulse,
    accentColor: '#EC4899',
  },
  {
    id: 'seo-strategist',
    name: 'SEO Strategist',
    role: 'Identifica oportunidades de tráfego orgânico de alto valor',
    history: 'Encontrou 4 palavras-chave com potencial esta semana',
    icon: Search,
    accentColor: '#3B82F6',
  },
  {
    id: 'lead-recovery-specialist',
    name: 'Lead Recovery Specialist',
    role: 'Reativa leads inativos com sequências personalizadas',
    history: 'Recuperou 3 leads ontem',
    icon: UserCheck,
    accentColor: '#10B981',
  },
  {
    id: 'automation-builder',
    name: 'Automation Builder',
    role: 'Cria e mantém fluxos que economizam horas da sua equipe',
    history: 'Automatizou 2 follow-ups esta manhã',
    icon: Workflow,
    accentColor: '#F59E0B',
  },
]

export const AI_WORKFORCE_HEADER_ICON = Bot
