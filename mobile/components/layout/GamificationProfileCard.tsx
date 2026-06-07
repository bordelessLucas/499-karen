import { Pressable, Text, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { useGamification } from '@shared/contexts'

type GamificationProfileCardProps = {
  displayName?: string
  planLabel?: string
  onViewProgress?: () => void
}

function formatXp(value: number): string {
  return value.toLocaleString('en-US')
}

export function GamificationProfileCard({
  displayName = 'Sarah Johnson',
  planLabel = 'Elite Plan',
  onViewProgress,
}: GamificationProfileCardProps) {
  const { level, title, currentXp, maxXp, xpProgress } = useGamification()
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <View className="rounded-xl bg-summus-800/60 p-3">
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-summus-700">
          <Text className="text-xs font-bold text-gold-300">{initials}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-white">{displayName}</Text>
          <Text className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
            {planLabel}
          </Text>
        </View>
      </View>

      <Text className="mt-3 text-[11px] text-slate-400">
        Your Level:{' '}
        <Text className="font-semibold text-gold-400">
          Level {level} / {title}
        </Text>
      </Text>

      <View className="mt-2.5">
        <View className="h-1.5 overflow-hidden rounded-full bg-summus-950">
          <View
            className="h-full rounded-full bg-gold-400"
            style={{ width: `${Math.round(xpProgress * 100)}%` }}
          />
        </View>
        <Text className="mt-1.5 text-[10px] font-medium text-slate-500">
          {formatXp(currentXp)} / {formatXp(maxXp)} XP
        </Text>
      </View>

      <Pressable
        onPress={onViewProgress}
        className="mt-2 flex-row items-center gap-1 active:opacity-70"
      >
        <Text className="text-[11px] font-semibold text-electric-400">View Progress</Text>
        <ChevronRight size={12} color="#38BDF8" />
      </Pressable>
    </View>
  )
}
