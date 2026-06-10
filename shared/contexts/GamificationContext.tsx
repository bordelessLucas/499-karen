import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { GamificationContext, type GamificationContextValue } from './gamification-context'
import type {
  BusinessHealthScores,
  MissionImpactCategory,
  RecentActivityItem,
  UserGamificationState,
} from '../types/gamification'
import {
  applyBusinessHealthImpact,
  calculateTotalScore,
  resolveCompanyTier,
} from '../utils/gamification-helpers'
import { generateId } from '../utils/generate-id'

const INITIAL_BUSINESS_HEALTH: Omit<BusinessHealthScores, 'totalScore'> = {
  marketing: 72,
  vendas: 58,
  automacao: 45,
  credibilidade: 80,
  posicionamento: 65,
}

const INITIAL_GAMIFICATION_STATE: UserGamificationState = {
  level: 12,
  title: 'Growth Builder',
  streakDays: 14,
  influencePoints: 2450,
  completedActions: 32,
  businessHealth: {
    ...INITIAL_BUSINESS_HEALTH,
    totalScore: calculateTotalScore(INITIAL_BUSINESS_HEALTH),
  },
  companyTier: resolveCompanyTier(calculateTotalScore(INITIAL_BUSINESS_HEALTH)),
  economy: {
    currentXp: 3150,
    nextLevelXp: 5000,
    coins: 420,
  },
  recentActivity: [
    {
      id: 'activity-1',
      date: 'Hoje',
      action: 'Criou campanha',
      type: 'marketing',
    },
    {
      id: 'activity-2',
      date: 'Ontem',
      action: 'Criou landing page',
      type: 'posicionamento',
    },
    {
      id: 'activity-3',
      date: '3 dias atrás',
      action: 'Configurou CRM',
      type: 'vendas',
    },
  ],
}

type GamificationProviderProps = {
  children: ReactNode
  initialState?: UserGamificationState
}

const MISSION_ACTIVITY_LABELS: Record<MissionImpactCategory, string> = {
  marketing: 'Missão de Marketing concluída',
  vendas: 'Missão de Vendas concluída',
  automacao: 'Fluxo de Automação ativado',
  credibilidade: 'Ativo de Credibilidade publicado',
  posicionamento: 'Posicionamento de marca reforçado',
}

function resolveXpProgress(currentXp: number, nextLevelXp: number): number {
  if (nextLevelXp <= 0) {
    return 0
  }

  return Math.min(1, Math.max(0, currentXp / nextLevelXp))
}

function resolveActivityDateLabel(): string {
  return 'Hoje'
}

function createActivityEntry(
  impactCategory: MissionImpactCategory,
  impactValue: number,
): RecentActivityItem {
  return {
    id: generateId(),
    date: resolveActivityDateLabel(),
    action: `${MISSION_ACTIVITY_LABELS[impactCategory]} (+${impactValue} pts)`,
    type: impactCategory,
  }
}

function applyXpReward(state: UserGamificationState, xpReward: number): UserGamificationState {
  if (xpReward <= 0) {
    return state
  }

  let nextXp = state.economy.currentXp + xpReward
  let nextLevel = state.level
  let nextMaxXp = state.economy.nextLevelXp
  let nextTitle = state.title

  while (nextXp >= nextMaxXp) {
    nextXp -= nextMaxXp
    nextLevel += 1
    nextMaxXp = Math.round(nextMaxXp * 1.15)
    nextTitle = `Level ${nextLevel} Achiever`
  }

  return {
    ...state,
    level: nextLevel,
    title: nextTitle,
    economy: {
      ...state.economy,
      currentXp: nextXp,
      nextLevelXp: nextMaxXp,
    },
  }
}

export function GamificationProvider({
  children,
  initialState = INITIAL_GAMIFICATION_STATE,
}: GamificationProviderProps) {
  const [state, setState] = useState<UserGamificationState>(initialState)

  const addXp = useCallback((amount: number) => {
    setState((current) => applyXpReward(current, amount))
  }, [])

  const completeMission = useCallback(
    (
      xpReward: number,
      coinReward: number,
      impactCategory: MissionImpactCategory,
      impactValue: number,
    ) => {
      if (xpReward < 0 || coinReward < 0 || impactValue < 0) {
        return
      }

      setState((current) => {
        const withXp = applyXpReward(current, xpReward)
        const nextBusinessHealth = applyBusinessHealthImpact(
          withXp.businessHealth,
          impactCategory,
          impactValue,
        )

        return {
          ...withXp,
          businessHealth: nextBusinessHealth,
          companyTier: resolveCompanyTier(nextBusinessHealth.totalScore),
          economy: {
            ...withXp.economy,
            coins: withXp.economy.coins + coinReward,
          },
          completedActions: withXp.completedActions + 1,
          influencePoints: withXp.influencePoints + Math.round(xpReward * 0.5),
          recentActivity: [
            createActivityEntry(impactCategory, impactValue),
            ...withXp.recentActivity,
          ].slice(0, 20),
        }
      })
    },
    [],
  )

  const incrementCompletedActions = useCallback((amount = 1) => {
    if (amount <= 0) {
      return
    }

    setState((current) => ({
      ...current,
      completedActions: current.completedActions + amount,
    }))
  }, [])

  const incrementInfluencePoints = useCallback((amount: number) => {
    if (amount <= 0) {
      return
    }

    setState((current) => ({
      ...current,
      influencePoints: current.influencePoints + amount,
    }))
  }, [])

  const updateStreak = useCallback((days: number) => {
    if (days < 0) {
      return
    }

    setState((current) => ({
      ...current,
      streakDays: days,
    }))
  }, [])

  const contextValue = useMemo<GamificationContextValue>(() => {
    const { currentXp, nextLevelXp } = state.economy
    const xpProgress = resolveXpProgress(currentXp, nextLevelXp)
    const xpRemaining = Math.max(0, nextLevelXp - currentXp)

    return {
      ...state,
      currentXp,
      maxXp: nextLevelXp,
      xpProgress,
      xpRemaining,
      addXp,
      completeMission,
      incrementCompletedActions,
      incrementInfluencePoints,
      updateStreak,
    }
  }, [
    state,
    addXp,
    completeMission,
    incrementCompletedActions,
    incrementInfluencePoints,
    updateStreak,
  ])

  return (
    <GamificationContext.Provider value={contextValue}>{children}</GamificationContext.Provider>
  )
}

export { useGamification } from './useGamification'
