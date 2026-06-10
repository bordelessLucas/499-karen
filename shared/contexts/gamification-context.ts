import { createContext } from 'react'
import type {
  MissionImpactCategory,
  UserGamificationState,
} from '../types/gamification'

export type GamificationContextValue = UserGamificationState & {
  /** Retrocompatibilidade com consumidores legados */
  currentXp: number
  maxXp: number
  xpProgress: number
  xpRemaining: number
  addXp: (amount: number) => void
  completeMission: (
    xpReward: number,
    coinReward: number,
    impactCategory: MissionImpactCategory,
    impactValue: number,
  ) => void
  incrementCompletedActions: (amount?: number) => void
  incrementInfluencePoints: (amount: number) => void
  updateStreak: (days: number) => void
}

export const GamificationContext = createContext<GamificationContextValue | undefined>(undefined)
