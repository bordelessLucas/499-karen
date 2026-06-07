import { Text, View } from 'react-native'
import { Heart } from 'lucide-react-native'
import Svg, { Circle } from 'react-native-svg'
import { SummusCard } from '@/components/ui/SummusCard'
import { dashboardMockData } from '@/constants/dashboard-mock-data'

function HealthRing({ score, maxScore }: { score: number; maxScore: number }) {
  const radius = 48
  const stroke = 7
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = (score / maxScore) * circumference

  return (
    <Svg width={radius * 2} height={radius * 2}>
      <Circle
        stroke="#E2E8F0"
        fill="transparent"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <Circle
        stroke="#10B981"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        rotation={-90}
        origin={`${radius}, ${radius}`}
      />
    </Svg>
  )
}

export function BusinessHealthCard() {
  const { score, maxScore, categories } = dashboardMockData.businessHealth

  return (
    <SummusCard className="h-full">
      <Text className="text-lg font-bold text-slate-900">Business Health</Text>

      <View className="mt-4 items-center">
        <View className="relative items-center justify-center">
          <HealthRing score={score} maxScore={maxScore} />
          <View className="absolute items-center justify-center">
            <Heart size={20} color="#10B981" fill="#10B981" />
          </View>
        </View>
        <Text className="mt-3 text-4xl font-bold text-slate-900">
          {score}
          <Text className="text-xl font-medium text-slate-400">/{maxScore}</Text>
        </Text>
      </View>

      <View className="mt-5 gap-2.5">
        {categories.map((category) => (
          <View key={category.label}>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] font-medium text-slate-600">{category.label}</Text>
              <Text className="text-[11px] font-semibold text-slate-800">{category.value}%</Text>
            </View>
            <View className="h-1 overflow-hidden rounded-full bg-slate-100">
              <View
                className="h-full rounded-full"
                style={{ width: `${category.value}%`, backgroundColor: category.color }}
              />
            </View>
          </View>
        ))}
      </View>
    </SummusCard>
  )
}
