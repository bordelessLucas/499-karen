import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { activeAutomationsSeed, automationTemplates } from '@shared/data'
import { Clock, Sparkles, Zap } from 'lucide-react-native'
import { AppScreen } from '@/components/layout/AppScreen'
import { PageScroll } from '@/components/layout/PageScroll'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

export default function AutomationsScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const [automations, setAutomations] = useState(activeAutomationsSeed)

  function toggleAutomation(id: string) {
    setAutomations((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    )
  }

  return (
    <AppScreen>
      <PageScroll>
        <ScreenHeader
          badge="Orquestração inteligente"
          title="Automações"
          description="Gerencie fluxos ativos e ative templates prontos em um toque."
        />

        <View className={isWebDesktop ? 'flex-row gap-8' : 'gap-6'}>
          <View className={isWebDesktop ? 'flex-1' : ''}>
            <Text className="text-lg font-semibold text-slate-900">Fluxos ativos</Text>
            <View className="mt-3 gap-3">
              {automations.map((automation) => (
                <View
                  key={automation.id}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Text className="font-semibold text-slate-900">{automation.title}</Text>
                      <Text className="mt-1 text-sm text-slate-500">{automation.description}</Text>
                    </View>
                    <Pressable
                      onPress={() => toggleAutomation(automation.id)}
                      className={[
                        'h-7 w-12 rounded-full p-0.5',
                        automation.enabled ? 'bg-violet-600' : 'bg-slate-200',
                      ].join(' ')}
                    >
                      <View
                        className={[
                          'h-6 w-6 rounded-full bg-white',
                          automation.enabled ? 'ml-auto' : '',
                        ].join(' ')}
                      />
                    </Pressable>
                  </View>
                  <View className="mt-3 flex-row flex-wrap gap-2">
                    <View className="flex-row items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                      <Zap size={12} color="#7c3aed" />
                      <Text className="text-xs font-medium text-slate-600">
                        {automation.metricPrimary}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                      <Clock size={12} color="#64748b" />
                      <Text className="text-xs font-medium text-slate-600">
                        {automation.metricSecondary}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className={isWebDesktop ? 'w-[420px] shrink-0' : ''}>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-slate-900">Galeria de templates</Text>
              <View className="flex-row items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1">
                <Sparkles size={12} color="#7c3aed" />
                <Text className="text-xs font-medium text-violet-700">Plug & Play</Text>
              </View>
            </View>
            <View className="gap-3">
              {automationTemplates.map((item) => (
                <View
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <Text className="font-semibold text-slate-900">{item.title}</Text>
                  <View className="mt-3 gap-2">
                    <View className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <Text className="text-xs font-medium text-slate-400">Gatilho</Text>
                      <Text className="mt-0.5 text-sm text-slate-700">{item.trigger}</Text>
                    </View>
                    <View className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <Text className="text-xs font-medium text-slate-400">Ação</Text>
                      <Text className="mt-0.5 text-sm text-slate-700">{item.action}</Text>
                    </View>
                  </View>
                  <Pressable className="mt-4 rounded-2xl border border-slate-200 py-3 active:bg-violet-50">
                    <Text className="text-center text-sm font-semibold text-slate-700">
                      Ativar Template
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </View>
      </PageScroll>
    </AppScreen>
  )
}
