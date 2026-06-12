import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useGamification } from '@shared/contexts'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { GrowthTree } from '@/components/dashboard/home/GrowthTree'
import { HomeGrowthScoreCard } from '@/components/dashboard/home/HomeGrowthScoreCard'
import { HomeSmartHeader } from '@/components/dashboard/home/HomeSmartHeader'
import { NextBestActionCard } from '@/components/dashboard/home/NextBestActionCard'

function resolveUserName(email?: string | null): string {
  if (!email) {
    return 'Karen'
  }

  const localPart = email.split('@')[0] ?? 'Karen'
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

export default function HomeScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const { currentUser } = useAuth()
  const { businessHealth, companyStage, executeAction } = useGamification()

  const userName = resolveUserName(currentUser?.email)

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={[
          'gap-6 pb-10 pt-6',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        showsVerticalScrollIndicator={false}
      >
        <HomeSmartHeader userName={userName} />

        <HomeGrowthScoreCard
          score={businessHealth.totalScore}
          companyStage={companyStage}
        />

        <NextBestActionCard onExecute={executeAction} />

        <GrowthTree businessHealth={businessHealth} />
      </ScrollView>
    </SafeAreaView>
  )
}
