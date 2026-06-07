import { createContext } from 'react'
import type { UserGamificationState } from '../types/gamification'

export type GamificationContextValue = UserGamificationState & {
  xpProgress: number
  xpRemaining: number
  addXp: (amount: number) => void
  incrementCompletedActions: (amount?: number) => void
  incrementInfluencePoints: (amount: number) => void
  updateStreak: (days: number) => void
}

export const GamificationContext = createContext<GamificationContextValue | undefined>(undefined)
