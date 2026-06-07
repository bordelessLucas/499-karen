import { Text, View } from 'react-native'
import { BarChart3, Play, Wrench } from 'lucide-react-native'
import { SummusCard } from '@/components/ui/SummusCard'
import { dashboardMockData } from '@/constants/dashboard-mock-data'

const stepIcons = {
  play: Play,
  wand: Wrench,
  chart: BarChart3,
} as const

export function LearnImplementGrowCard() {
  const { steps, currentStep, lessonProgress } = dashboardMockData.learnFlow

  return (
    <SummusCard>
      <Text className="text-lg font-bold text-slate-900">Learn → Implement → Grow</Text>

      <View className="mt-6 flex-row items-start justify-between px-2">
        {steps.map((step, index) => {
          const Icon = stepIcons[step.icon]
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const badge = 'badge' in step ? step.badge : undefined

          return (
            <View key={step.id} className="relative flex-1 items-center">
              {index < steps.length - 1 ? (
                <View className="absolute left-[55%] top-5 z-0 h-0.5 w-full bg-slate-200" />
              ) : null}

              <View className="relative z-10">
                <View
                  className={[
                    'h-10 w-10 items-center justify-center rounded-full',
                    isActive ? 'bg-violet-600' : isCompleted ? 'bg-emerald-500' : 'bg-slate-100',
                  ].join(' ')}
                >
                  <Icon size={17} color={isActive || isCompleted ? '#FFFFFF' : '#64748B'} />
                </View>
                {badge ? (
                  <View className="absolute -right-3 -top-2 rounded-full bg-violet-100 px-1.5 py-0.5">
                    <Text className="text-[8px] font-bold text-violet-700">{badge}</Text>
                  </View>
                ) : null}
              </View>

              <Text
                className={[
                  'mt-2 text-center text-[11px] font-semibold',
                  isActive ? 'text-violet-600' : 'text-slate-500',
                ].join(' ')}
              >
                {step.label}
              </Text>
            </View>
          )
        })}
      </View>

      <View className="mt-6">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs font-medium text-slate-500">Lesson progress</Text>
          <Text className="text-xs font-bold text-violet-600">{lessonProgress}%</Text>
        </View>
        <View className="h-2 overflow-hidden rounded-full bg-slate-100">
          <View
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${lessonProgress}%` }}
          />
        </View>
      </View>
    </SummusCard>
  )
}
