import { useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import {
  LearnImplementFlow,
  type LearnImplementFlowRef,
} from '@/components/dashboard/home/LearnImplementFlow'
import { MagicBuilderShortcut } from '@/components/dashboard/home/MagicBuilderShortcut'

export default function LearnScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const learnFlowRef = useRef<LearnImplementFlowRef>(null)

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
          <Text className="text-3xl font-bold text-white">Learn & Implement</Text>
          <Text className="text-sm text-white/60">
            Aprenda na hora e execute com IA — sem páginas em branco.
          </Text>
        </View>

        <LearnImplementFlow ref={learnFlowRef} />
        <MagicBuilderShortcut onPress={() => learnFlowRef.current?.openBuilder()} />
      </ScrollView>
    </SafeAreaView>
  )
}
