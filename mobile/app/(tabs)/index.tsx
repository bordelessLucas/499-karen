import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useGamification } from '@shared/contexts'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { AiCoachMissionCard } from '@/components/dashboard/home/AiCoachMissionCard'
import { ContextBusinessHealthCard } from '@/components/dashboard/home/ContextBusinessHealthCard'
import { HomePremiumHeader } from '@/components/dashboard/home/HomePremiumHeader'

function resolveUserName(email?: string | null): string {
  if (!email) {
    return 'Fundador'
  }

  const localPart = email.split('@')[0] ?? 'Fundador'
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

export default function HomeScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const { currentUser } = useAuth()
  const { businessHealth, companyTier, completeMission } = useGamification()

  const userName = resolveUserName(currentUser?.email)

  return (
    <SafeAreaView className="flex-1 bg-deepBlue" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={[
          'gap-6 pb-10 pt-4',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        showsVerticalScrollIndicator={false}
      >
        <HomePremiumHeader userName={userName} companyTier={companyTier} />

        <View className="gap-2">
          <AiCoachMissionCard onResolveMission={completeMission} />
        </View>

        <ContextBusinessHealthCard businessHealth={businessHealth} />
      </ScrollView>
    </SafeAreaView>
  )
}
