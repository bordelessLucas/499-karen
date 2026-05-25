import { dashboardStats, recentActivities } from '@shared/data'
import { Pressable, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react-native'
import { useAuth } from '@shared/contexts'
import { AppScreen } from '@/components/layout/AppScreen'
import { PageScroll } from '@/components/layout/PageScroll'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

const activityIcons = {
  cliente: Users,
  automacao: Zap,
  crm: Briefcase,
} as const

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function DashboardScreen() {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { isWebDesktop } = useResponsiveLayout()
  const firstName = currentUser?.email.split('@')[0] ?? 'equipe'

  return (
    <AppScreen>
      <PageScroll>
        <View>
          <Text className="text-sm font-medium text-violet-600">Plataforma BORDERLESS</Text>
          <Text className={`mt-2 font-semibold text-slate-900 ${isWebDesktop ? 'text-4xl' : 'text-3xl'}`}>
            {getGreeting()}, {firstName}
          </Text>
          <Text className={`mt-2 text-slate-500 ${isWebDesktop ? 'text-lg' : 'text-base'}`}>
            Visão executiva da operação comercial em tempo real.
          </Text>
        </View>

        <View className={isWebDesktop ? 'flex-row gap-8' : 'gap-6'}>
          <View className={isWebDesktop ? 'flex-1 gap-6' : 'gap-6'}>
            <View className={`flex-row flex-wrap gap-3 ${isWebDesktop ? '' : ''}`}>
              {dashboardStats.map((stat) => {
                const isPositive = stat.changeType === 'positive'
                const isNegative = stat.changeType === 'negative'

                return (
                  <View
                    key={stat.id}
                    className={[
                      'rounded-3xl border border-slate-200 bg-white p-4 shadow-sm',
                      isWebDesktop ? 'min-w-[220px] flex-1' : 'min-w-[46%] flex-1',
                    ].join(' ')}
                  >
                    <Text className="text-sm font-medium text-slate-500">{stat.label}</Text>
                    <Text className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</Text>
                    <View className="mt-2 flex-row items-center gap-1">
                      {isPositive ? <ArrowUpRight size={14} color="#059669" /> : null}
                      {isNegative ? <ArrowDownRight size={14} color="#e11d48" /> : null}
                      <Text
                        className={[
                          'text-xs font-medium',
                          isPositive ? 'text-emerald-600' : '',
                          isNegative ? 'text-rose-600' : '',
                          stat.changeType === 'neutral' ? 'text-slate-500' : '',
                        ].join(' ')}
                      >
                        {stat.change}
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>

            <Pressable
              onPress={() => router.push('/reports')}
              className="flex-row items-center justify-between rounded-3xl border border-violet-200 bg-violet-50 p-4 active:bg-violet-100"
            >
              <View className="flex-row items-center gap-3">
                <View className="rounded-xl bg-violet-100 p-2">
                  <BarChart3 size={18} color="#7c3aed" />
                </View>
                <View>
                  <Text className="font-semibold text-slate-900">Relatórios e Performance</Text>
                  <Text className="text-sm text-slate-500">KPIs, funil e métricas estratégicas</Text>
                </View>
              </View>
              <Text className="text-sm font-semibold text-violet-600">Ver</Text>
            </Pressable>
          </View>

          <View className={isWebDesktop ? 'w-[420px] shrink-0' : ''}>
            <View className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-slate-900">Atividade recente</Text>
                <TrendingUp size={18} color="#7c3aed" />
              </View>

              <View className="gap-3">
                {recentActivities.map((activity) => {
                  const Icon = activityIcons[activity.type as keyof typeof activityIcons] ?? Users

                  return (
                    <View
                      key={activity.id}
                      className="flex-row items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <View className="rounded-xl bg-violet-100 p-2">
                        <Icon size={16} color="#7c3aed" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold text-slate-900">{activity.title}</Text>
                        <Text className="mt-1 text-sm text-slate-500">{activity.description}</Text>
                        <Text className="mt-2 text-xs font-medium text-slate-400">{activity.time}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
      </PageScroll>
    </AppScreen>
  )
}
