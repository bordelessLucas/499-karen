import { Pressable, Text, View } from 'react-native'
import { ArrowRight, Target } from 'lucide-react-native'
import { SummusCard } from '@/components/ui/SummusCard'
import { dashboardMockData } from '@/constants/dashboard-mock-data'

export function GrowthMissionCard() {
  const { title, mission, potentialImpact } = dashboardMockData.growthMission

  return (
    <SummusCard className="h-full">
      <View className="flex-row items-start gap-3">
        <View className="rounded-2xl bg-violet-50 p-3">
          <Target size={20} color="#7C3AED" />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            {title}
          </Text>
          <Text className="mt-1 text-xl font-bold text-slate-900">{mission}</Text>
        </View>
      </View>

      <View className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3">
        <Text className="text-sm font-bold text-emerald-700">
          Potential Impact +${potentialImpact.toLocaleString('en-US')}
        </Text>
      </View>

      <Pressable className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl bg-summus-900 py-3.5 active:bg-summus-800">
        <Text className="text-sm font-semibold text-white">Start Mission</Text>
        <ArrowRight size={16} color="#FFFFFF" />
      </Pressable>
    </SummusCard>
  )
}
