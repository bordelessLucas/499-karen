import { Text, View } from 'react-native'
import type { ProgressMetric } from '@shared/data'

type ProgressListProps = {
  title: string
  description: string
  items: ProgressMetric[]
}

export function ProgressList({ title, description, items }: ProgressListProps) {
  return (
    <View className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <Text className="text-lg font-semibold text-slate-900">{title}</Text>
      <Text className="mt-1 text-sm text-slate-500">{description}</Text>
      <View className="mt-5 gap-4">
        {items.map((item) => (
          <View key={item.label}>
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="flex-1 text-sm font-medium text-slate-700">{item.label}</Text>
              <Text className="text-sm font-semibold text-slate-900">{item.value}%</Text>
            </View>
            <View className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <View className={`h-full rounded-full ${item.barClassName}`} style={{ width: `${item.value}%` }} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
