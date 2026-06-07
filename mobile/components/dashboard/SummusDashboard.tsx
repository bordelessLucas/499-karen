import { View } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { DashboardHeader } from './DashboardHeader'
import { AiCoachCard } from './AiCoachCard'
import { BusinessHealthCard } from './BusinessHealthCard'
import { GrowthMissionCard } from './GrowthMissionCard'
import { LearnImplementGrowCard } from './LearnImplementGrowCard'

export function SummusDashboard() {
  const { isWebDesktop, width } = useResponsiveLayout()
  const isWide = isWebDesktop || width >= 768

  return (
    <View className="gap-6">
      <DashboardHeader isDesktop={isWide} />

      <AiCoachCard isDesktop={isWide} />

      <View className={isWide ? 'flex-row gap-5' : 'gap-5'}>
        <View className={isWide ? 'flex-1' : ''}>
          <GrowthMissionCard />
        </View>
        <View className={isWide ? 'flex-1' : ''}>
          <BusinessHealthCard />
        </View>
      </View>

      <LearnImplementGrowCard />
    </View>
  )
}
