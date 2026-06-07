import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { GamificationContext, type GamificationContextValue } from './gamification-context'
import type { UserGamificationState } from '../types/gamification'

const INITIAL_GAMIFICATION_STATE: UserGamificationState = {
  level: 12,
  title: 'Growth Builder',
  currentXp: 3150,
  maxXp: 5000,
  streakDays: 14,
  influencePoints: 2450,
  completedActions: 32,
}

type GamificationProviderProps = {
  children: ReactNode
  initialState?: UserGamificationState
}

function resolveXpProgress(currentXp: number, maxXp: number): number {
  if (maxXp <= 0) {
    return 0
  }

  return Math.min(1, Math.max(0, currentXp / maxXp))
}

export function GamificationProvider({
  children,
  initialState = INITIAL_GAMIFICATION_STATE,
}: GamificationProviderProps) {
  const [state, setState] = useState<UserGamificationState>(initialState)

  const addXp = useCallback((amount: number) => {
    if (amount <= 0) {
      return
    }

    setState((current) => {
      let nextXp = current.currentXp + amount
      let nextLevel = current.level
      let nextMaxXp = current.maxXp
      let nextTitle = current.title

      while (nextXp >= nextMaxXp) {
        nextXp -= nextMaxXp
        nextLevel += 1
        nextMaxXp = Math.round(nextMaxXp * 1.15)
        nextTitle = `Level ${nextLevel} Achiever`
      }

      return {
        ...current,
        level: nextLevel,
        title: nextTitle,
        currentXp: nextXp,
        maxXp: nextMaxXp,
      }
    })
  }, [])

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
    const xpProgress = resolveXpProgress(state.currentXp, state.maxXp)
    const xpRemaining = Math.max(0, state.maxXp - state.currentXp)

    return {
      ...state,
      xpProgress,
      xpRemaining,
      addXp,
      incrementCompletedActions,
      incrementInfluencePoints,
      updateStreak,
    }
  }, [state, addXp, incrementCompletedActions, incrementInfluencePoints, updateStreak])

  return (
    <GamificationContext.Provider value={contextValue}>{children}</GamificationContext.Provider>
  )
}
