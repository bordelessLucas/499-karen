import { Text, View } from 'react-native'
import { Check } from 'lucide-react-native'
import type { RecentActivityItem } from '@shared/types/gamification'

type ProgressTimelineProps = {
  activities: RecentActivityItem[]
}

function resolveActivityColor(type: RecentActivityItem['type']): string {
  const colors: Record<RecentActivityItem['type'], string> = {
    marketing: '#3B82F6',
    vendas: '#10B981',
    automacao: '#F59E0B',
    credibilidade: '#A78BFA',
    posicionamento: '#F59E0B',
    general: '#94A3B8',
  }

  return colors[type]
}

export function ProgressTimeline({ activities }: ProgressTimelineProps) {
  if (activities.length === 0) {
    return (
      <View className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <Text className="text-center text-sm text-white/50">
          Complete missões para ver o seu progresso aqui.
        </Text>
      </View>
    )
  }

  return (
    <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
      {activities.map((activity, index) => {
        const isLast = index === activities.length - 1
        const dotColor = resolveActivityColor(activity.type)

        return (
          <View key={activity.id} className="flex-row gap-4">
            <View className="items-center">
              <View
                className="h-8 w-8 items-center justify-center rounded-full border-2"
                style={{ borderColor: dotColor, backgroundColor: `${dotColor}22` }}
              >
                <Check size={14} color={dotColor} strokeWidth={3} />
              </View>
              {!isLast ? <View className="mt-1 w-0.5 flex-1 bg-white/15" /> : null}
            </View>

            <View className={['flex-1', isLast ? 'pb-0' : 'pb-6'].join(' ')}>
              <Text className="text-xs font-bold uppercase tracking-wider text-gold">
                {activity.date}
              </Text>
              <Text className="mt-1 text-base font-semibold text-white">
                ✓ {activity.action}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
