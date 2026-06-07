import { Text, View } from 'react-native'
import { CalendarDays } from 'lucide-react-native'
import { SummusCard } from '@/components/ui/SummusCard'
import { dashboardMockData } from '@/constants/dashboard-mock-data'

export function TodaysBookingsCard() {
  const { appointmentsToday, estimatedRevenue, items } = dashboardMockData.bookings

  return (
    <SummusCard className="h-full">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <CalendarDays size={18} color="#0EA5E9" />
          <Text className="text-lg font-bold text-slate-900">Today&apos;s Bookings</Text>
        </View>
      </View>

      <View className="mb-4 flex-row gap-4">
        <View className="flex-1 rounded-xl bg-sky-50 p-3">
          <Text className="text-xs font-medium text-sky-700">Appointments</Text>
          <Text className="mt-1 text-xl font-bold text-slate-900">{appointmentsToday}</Text>
        </View>
        <View className="flex-1 rounded-xl bg-emerald-50 p-3">
          <Text className="text-xs font-medium text-emerald-700">Est. Revenue</Text>
          <Text className="mt-1 text-xl font-bold text-slate-900">
            ${estimatedRevenue.toLocaleString('en-US')}
          </Text>
        </View>
      </View>

      <View className="gap-2">
        {items.map((booking) => (
          <View
            key={booking.id}
            className="flex-row items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3"
          >
            <Text className="w-16 text-xs font-semibold text-slate-500">{booking.time}</Text>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-slate-900">{booking.name}</Text>
              <Text className="text-xs text-slate-500">{booking.service}</Text>
            </View>
            <View className="rounded-full bg-emerald-100 px-2.5 py-1">
              <Text className="text-[10px] font-bold text-emerald-700">{booking.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </SummusCard>
  )
}
