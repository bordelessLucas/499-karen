import { Pressable, Text, View } from 'react-native'
import { Flame, Snowflake, TrendingUp } from 'lucide-react-native'
import type { KanbanCardWithClient } from '@shared/types'
import { resolveHealthColor } from '@/lib/crm-lead-insights'

type CrmLeadCardProps = {
  lead: KanbanCardWithClient & { healthScore: number }
  variant: 'hot' | 'cold'
  onPress?: () => void
}

export function CrmLeadCard({ lead, variant, onPress }: CrmLeadCardProps) {
  const healthColor = resolveHealthColor(lead.healthScore)
  const VariantIcon = variant === 'hot' ? Flame : Snowflake
  const variantColor = variant === 'hot' ? '#F59E0B' : '#94A3B8'

  return (
    <Pressable
      onPress={onPress}
      className="rounded-3xl border border-white/10 bg-white/5 p-4 active:opacity-80"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <VariantIcon size={14} color={variantColor} />
            <Text className="text-base font-bold text-white">{lead.clientName}</Text>
          </View>
          <Text className="mt-1 text-sm text-white/60" numberOfLines={2}>
            {lead.title}
          </Text>
        </View>

        <View
          className="items-center rounded-2xl border px-3 py-2"
          style={{ borderColor: `${healthColor}44`, backgroundColor: `${healthColor}18` }}
        >
          <TrendingUp size={14} color={healthColor} />
          <Text className="mt-0.5 text-sm font-bold" style={{ color: healthColor }}>
            {lead.healthScore}%
          </Text>
        </View>
      </View>

      <View className="mt-3">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Health Score · chance de fechamento
          </Text>
        </View>
        <View className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <View
            className="h-full rounded-full"
            style={{ width: `${lead.healthScore}%`, backgroundColor: healthColor }}
          />
        </View>
      </View>
    </Pressable>
  )
}
