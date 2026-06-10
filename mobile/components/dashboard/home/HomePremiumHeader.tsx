import { Text, View } from 'react-native'
import { Crown } from 'lucide-react-native'
import type { CompanyTier } from '@shared/types/gamification'

type HomePremiumHeaderProps = {
  userName: string
  companyTier: CompanyTier
}

function formatCompanyTierBadge(tier: CompanyTier): string {
  if (tier === 'Em Crescimento') {
    return 'Empresa em Crescimento'
  }

  return `Empresa ${tier}`
}

export function HomePremiumHeader({ userName, companyTier }: HomePremiumHeaderProps) {
  return (
    <View className="gap-4">
      <View className="self-start flex-row items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-2">
        <Crown size={16} color="#F59E0B" fill="#F59E0B" />
        <Text className="text-xs font-bold uppercase tracking-wider text-gold">
          {formatCompanyTierBadge(companyTier)}
        </Text>
      </View>

      <Text className="text-3xl font-bold text-white">Bom dia, {userName}</Text>
      <Text className="text-sm text-white/60">
        O seu AI Coach preparou a missão de maior impacto para hoje.
      </Text>
    </View>
  )
}
