import { Text, View } from 'react-native'
import { CheckCircle2, Flame, Sparkles } from 'lucide-react-native'
import { useGamification } from '@shared/contexts'
import { SummusCard } from '@/components/ui/SummusCard'

export function GamificationStatsRow() {
  const { completedActions, influencePoints, streakDays } = useGamification()

  const stats = [
    {
      id: 'actions',
      label: 'Actions Completed',
      value: completedActions.toLocaleString('en-US'),
      icon: CheckCircle2,
      color: '#0EA5E9',
    },
    {
      id: 'influence',
      label: 'Influence Points',
      value: influencePoints.toLocaleString('en-US'),
      icon: Sparkles,
      color: '#FBBF24',
    },
    {
      id: 'streak',
      label: 'Day Streak',
      value: String(streakDays),
      icon: Flame,
      color: '#F97316',
    },
  ]

  return (
    <SummusCard>
      <View className="flex-row flex-wrap gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <View key={stat.id} className="min-w-[100px] flex-1 flex-row items-center gap-3">
              <View className="rounded-xl bg-slate-50 p-2.5">
                <Icon size={18} color={stat.color} />
              </View>
              <View>
                <Text className="text-lg font-bold text-slate-900">{stat.value}</Text>
                <Text className="text-[11px] font-medium text-slate-500">{stat.label}</Text>
              </View>
            </View>
          )
        })}
      </View>
    </SummusCard>
  )
}
