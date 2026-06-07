import { ScrollView, View } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { SummusDashboard } from '@/components/dashboard/SummusDashboard'

export default function HomeScreen() {
  const { isWebDesktop } = useResponsiveLayout()

  return (
    <View className="flex-1 bg-[#F3F6FA]">
      <ScrollView
        className="flex-1"
        contentContainerClassName={[
          'gap-6 pb-10 pt-5',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        showsVerticalScrollIndicator={false}
      >
        <SummusDashboard />
      </ScrollView>
    </View>
  )
}
