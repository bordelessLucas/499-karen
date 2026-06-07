import { Pressable, Text, View } from 'react-native'
import { Bell, Sparkles } from 'lucide-react-native'
import { dashboardMockData } from '@/constants/dashboard-mock-data'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

type DashboardHeaderProps = {
  isDesktop: boolean
}

export function DashboardHeader({ isDesktop }: DashboardHeaderProps) {
  const { firstName } = dashboardMockData.user

  return (
    <View
      className={[
        'flex-row items-start justify-between gap-4',
        isDesktop ? '' : 'flex-col',
      ].join(' ')}
    >
      <View className="flex-1">
        <Text className={`font-bold text-slate-900 ${isDesktop ? 'text-3xl' : 'text-2xl'}`}>
          {getGreeting()}, {firstName} 👋
        </Text>
        <Text className={`mt-1 text-slate-500 ${isDesktop ? 'text-base' : 'text-sm'}`}>
          Your AI is working for you. Let&apos;s grow your business.
        </Text>
      </View>

      <View className="flex-row items-center gap-3 self-end">
        <Pressable className="flex-row items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 active:bg-slate-50">
          <Sparkles size={15} color="#7C3AED" />
          <Text className="text-sm font-semibold text-slate-800">Ask AI</Text>
        </Pressable>

        <Pressable className="relative rounded-full border border-slate-200 bg-white p-2.5 active:bg-slate-50">
          <Bell size={18} color="#475569" />
          <View className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-rose-500">
            <Text className="text-[9px] font-bold text-white">3</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}
