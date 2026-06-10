import { Text, View } from 'react-native'
import { Flame, Snowflake } from 'lucide-react-native'
import type { KanbanCardWithClient } from '@shared/types'
import { CrmLeadCard } from './CrmLeadCard'

type EnrichedLead = KanbanCardWithClient & { healthScore: number }

type CrmAssistantViewProps = {
  hotLeads: EnrichedLead[]
  coldLeads: EnrichedLead[]
  onLeadPress?: (lead: EnrichedLead) => void
  isWideLayout?: boolean
}

function LeadSection({
  title,
  icon: Icon,
  iconColor,
  leads,
  variant,
  onLeadPress,
}: {
  title: string
  icon: typeof Flame
  iconColor: string
  leads: EnrichedLead[]
  variant: 'hot' | 'cold'
  onLeadPress?: (lead: EnrichedLead) => void
}) {
  return (
    <View className="flex-1 gap-3">
      <View className="flex-row items-center gap-2">
        <Icon size={18} color={iconColor} />
        <Text className="text-lg font-bold text-white">{title}</Text>
        <View className="rounded-full bg-white/10 px-2 py-0.5">
          <Text className="text-xs font-bold text-white/70">{leads.length}</Text>
        </View>
      </View>

      {leads.length === 0 ? (
        <View className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-5">
          <Text className="text-center text-sm text-white/50">
            Nenhum lead nesta categoria no momento.
          </Text>
        </View>
      ) : (
        leads.map((lead) => (
          <CrmLeadCard
            key={lead.id}
            lead={lead}
            variant={variant}
            onPress={() => onLeadPress?.(lead)}
          />
        ))
      )}
    </View>
  )
}

export function CrmAssistantView({
  hotLeads,
  coldLeads,
  onLeadPress,
  isWideLayout = false,
}: CrmAssistantViewProps) {
  return (
    <View className={isWideLayout ? 'flex-row gap-6' : 'gap-8'}>
      <LeadSection
        title="Leads Quentes"
        icon={Flame}
        iconColor="#F59E0B"
        leads={hotLeads}
        variant="hot"
        onLeadPress={onLeadPress}
      />
      <LeadSection
        title="Leads Frios"
        icon={Snowflake}
        iconColor="#94A3B8"
        leads={coldLeads}
        variant="cold"
        onLeadPress={onLeadPress}
      />
    </View>
  )
}
