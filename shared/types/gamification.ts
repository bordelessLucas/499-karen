export type GamificationLevel = {
  level: number
  title: string
}

export type GamificationProgress = {
  currentXp: number
  maxXp: number
}

export type GamificationStats = {
  streakDays: number
  influencePoints: number
  completedActions: number
}

export type UserGamificationState = GamificationLevel &
  GamificationProgress &
  GamificationStats
