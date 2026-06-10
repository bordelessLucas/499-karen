import type { LucideIcon } from 'lucide-react-native'
import { Bot, Globe, Target, Trophy, Users, Zap } from 'lucide-react-native'
import type { UserGamificationState } from '@shared/types/gamification'

export type AchievementDefinition = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  isUnlocked: (state: UserGamificationState) => boolean
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-site',
    title: 'Primeiro Site',
    description: 'Publicou a primeira versão do site',
    icon: Globe,
    isUnlocked: (state) => state.businessHealth.posicionamento >= 50,
  },
  {
    id: 'hundred-leads',
    title: '100 Leads',
    description: 'Alcançou 100 leads qualificados',
    icon: Users,
    isUnlocked: (state) => state.businessHealth.vendas >= 80,
  },
  {
    id: 'first-automation',
    title: 'Primeira Automação',
    description: 'Ativou o primeiro fluxo automático',
    icon: Zap,
    isUnlocked: (state) =>
      state.businessHealth.automacao >= 45 ||
      state.recentActivity.some((item) => item.type === 'automacao'),
  },
  {
    id: 'first-campaign',
    title: 'Primeira Campanha',
    description: 'Lançou uma campanha de captação',
    icon: Target,
    isUnlocked: (state) =>
      state.recentActivity.some((item) => item.type === 'marketing'),
  },
  {
    id: 'crm-master',
    title: 'CRM Configurado',
    description: 'Estruturou o pipeline de vendas',
    icon: Bot,
    isUnlocked: (state) => state.businessHealth.vendas >= 55,
  },
  {
    id: 'growth-builder',
    title: 'Growth Builder',
    description: 'Atingiu o nível 10 de evolução',
    icon: Trophy,
    isUnlocked: (state) => state.level >= 10,
  },
]
