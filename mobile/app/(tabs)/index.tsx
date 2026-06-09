import { useRef, useState } from 'react'
import { Alert, Pressable, ScrollView, Text, View } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { AskAiModal } from '@/components/dashboard/home/AskAiModal'
import { BusinessGrowthScoreCard } from '@/components/dashboard/home/BusinessGrowthScoreCard'
import {
  LearnImplementFlow,
  type LearnImplementFlowRef,
} from '@/components/dashboard/home/LearnImplementFlow'
import { MagicBuilderShortcut } from '@/components/dashboard/home/MagicBuilderShortcut'

function DashboardHeader({ onAskAi }: { onAskAi: () => void }) {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-2xl font-bold text-deepBlue">Good morning 👋</Text>
        <Text className="mt-1 text-sm text-deepBlue/50">Pronto para escalar hoje?</Text>
      </View>
      <Pressable
        onPress={onAskAi}
        className="rounded-2xl border border-gold bg-gold/10 px-4 py-2.5 active:opacity-70"
      >
        <Text className="text-sm font-bold text-gold">+ Ask AI</Text>
      </Pressable>
    </View>
  )
}

function AiCoachBanner() {
  return (
    <View className="rounded-3xl bg-deepBlue p-6">
      <Text className="text-lg font-bold text-white">Oportunidades de Alto Impacto</Text>
      <Text className="mt-3 text-sm leading-6 text-white/60">
        Suas missões geradas por IA aparecerão aqui. O coach está analisando seus dados
        para sugerir as próximas ações de maior retorno.
      </Text>
      <View className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/5 p-4">
        <Text className="text-xs font-medium uppercase tracking-wider text-electricBlue">
          IA Coach · Proativo
        </Text>
        <Text className="mt-2 text-sm text-white/80">
          Missão sugerida: revisar funil de conversão da semana e ativar 1 agente de
          automação.
        </Text>
      </View>
    </View>
  )
}

export default function HomeScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const [isAskAiOpen, setIsAskAiOpen] = useState(false)
  const learnFlowRef = useRef<LearnImplementFlowRef>(null)

  function handleAskAiAccept() {
    setIsAskAiOpen(false)
    Alert.alert(
      'Headline em revisão',
      'A IA está a reescrever a headline principal do seu site. Receberá a proposta em instantes.',
    )
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-[#F8FAFC]"
        contentContainerClassName={[
          'gap-6 pb-10 pt-5',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader onAskAi={() => setIsAskAiOpen(true)} />
        <AiCoachBanner />
        <BusinessGrowthScoreCard />
        <LearnImplementFlow ref={learnFlowRef} />
        <MagicBuilderShortcut onPress={() => learnFlowRef.current?.openBuilder()} />
      </ScrollView>

      <AskAiModal
        visible={isAskAiOpen}
        onClose={() => setIsAskAiOpen(false)}
        onAccept={handleAskAiAccept}
      />
    </>
  )
}
