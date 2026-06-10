export type GamificationLevel = {
  level: number
  title: string
}

export type BusinessHealthCategoryKey =
  | 'marketing'
  | 'vendas'
  | 'automacao'
  | 'credibilidade'
  | 'posicionamento'

export type BusinessHealthScores = {
  marketing: number
  vendas: number
  automacao: number
  credibilidade: number
  posicionamento: number
  totalScore: number
}

export type CompanyTier =
  | 'Iniciante'
  | 'Estruturada'
  | 'Em Crescimento'
  | 'Escalável'
  | 'Dominante'

export type GamificationEconomy = {
  currentXp: number
  nextLevelXp: number
  coins: number
}

export type RecentActivityItem = {
  id: string
  date: string
  action: string
  type: BusinessHealthCategoryKey | 'general'
}

export type MissionImpactCategory = BusinessHealthCategoryKey

export type GamificationStats = {
  streakDays: number
  influencePoints: number
  completedActions: number
}

export type UserGamificationState = GamificationLevel &
  GamificationStats & {
    businessHealth: BusinessHealthScores
    companyTier: CompanyTier
    economy: GamificationEconomy
    recentActivity: RecentActivityItem[]
  }

/** @deprecated Use `economy.currentXp` — mantido para retrocompatibilidade */
export type GamificationProgress = {
  currentXp: number
  maxXp: number
}
