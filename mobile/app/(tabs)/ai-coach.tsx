import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGamification } from '@shared/contexts'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { AiCoachMissionCard } from '@/components/dashboard/home/AiCoachMissionCard'

const SUGGESTED_MISSIONS = [
  {
    id: 'mission-1',
    title: 'Otimizar headline do site',
    impact: '+8 Posicionamento',
  },
  {
    id: 'mission-2',
    title: 'Reativar leads inativos',
    impact: '+6 Vendas',
  },
  {
    id: 'mission-3',
    title: 'Publicar artigo de SEO',
    impact: '+5 Credibilidade',
  },
]

export default function AiCoachScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const { completeMission } = useGamification()

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
        <View className="gap-2">
          <Text className="text-3xl font-bold text-white">AI Coach</Text>
          <Text className="text-sm text-white/60">
            Missões proativas geradas pela IA para acelerar o seu crescimento.
          </Text>
        </View>

        <AiCoachMissionCard onResolveMission={completeMission} />

        <View className="gap-3">
          <Text className="text-lg font-bold text-white">Próximas missões sugeridas</Text>
          {SUGGESTED_MISSIONS.map((mission) => (
            <View
              key={mission.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <Text className="text-base font-semibold text-white">{mission.title}</Text>
              <Text className="mt-1 text-xs font-medium text-gold">{mission.impact}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
