import { Text, View } from 'react-native'
import { TrendingUp } from 'lucide-react-native'
import type { CompanyStage } from '@shared/types/gamification'

type HomeGrowthScoreCardProps = {
  score: number
  companyStage: CompanyStage
}

const MAX_SCORE = 100

function resolveStagePercentile(score: number): number {
  return Math.min(95, Math.max(8, Math.round(score * 0.93)))
}

export function HomeGrowthScoreCard({ score, companyStage }: HomeGrowthScoreCardProps) {
  const percentile = resolveStagePercentile(score)

  return (
    <View
      className="rounded-3xl bg-white p-6 shadow-sm"
      style={{
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center gap-2">
        <TrendingUp size={18} color="#10B981" />
        <Text className="text-base font-semibold text-deepBlue">Business Growth Score</Text>
      </View>

      <View className="mt-5 flex-row items-end gap-2">
        <Text className="text-5xl font-bold text-deepBlue">{score}</Text>
        <Text className="mb-1.5 text-2xl font-medium text-deepBlue/30">/{MAX_SCORE}</Text>
      </View>

      <View className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <View
          className="h-full rounded-full bg-emerald"
          style={{ width: `${score}%` }}
        />
      </View>

      <Text className="mt-4 text-sm leading-6 text-slate-600">
        Sua empresa está mais avançada que{' '}
        <Text className="font-semibold text-deepBlue">{percentile}%</Text> das empresas do seu
        estágio <Text className="font-semibold text-deepBlue">({companyStage})</Text>.
      </Text>
    </View>
  )
}
