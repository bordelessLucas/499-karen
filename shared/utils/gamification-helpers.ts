import type { BusinessHealthScores, CompanyTier } from '../types/gamification'

export function clampScore(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

export function calculateTotalScore(
  scores: Omit<BusinessHealthScores, 'totalScore'>,
): number {
  const values = [
    scores.marketing,
    scores.vendas,
    scores.automacao,
    scores.credibilidade,
    scores.posicionamento,
  ]

  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  return clampScore(average)
}

export function resolveCompanyTier(totalScore: number): CompanyTier {
  if (totalScore >= 81) {
    return 'Dominante'
  }

  if (totalScore >= 61) {
    return 'Escalável'
  }

  if (totalScore >= 41) {
    return 'Em Crescimento'
  }

  if (totalScore >= 21) {
    return 'Estruturada'
  }

  return 'Iniciante'
}

export function applyBusinessHealthImpact(
  scores: BusinessHealthScores,
  category: keyof Omit<BusinessHealthScores, 'totalScore'>,
  impactValue: number,
): BusinessHealthScores {
  const nextScores = {
    ...scores,
    [category]: clampScore(scores[category] + impactValue),
  }

  const { totalScore: _ignored, ...categoryScores } = nextScores

  return {
    ...categoryScores,
    totalScore: calculateTotalScore(categoryScores),
  }
}
