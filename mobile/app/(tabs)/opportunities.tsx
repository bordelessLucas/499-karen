import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { KanbanCardWithClient } from '@shared/types'
import { useGamification } from '@shared/contexts'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { GrowthFlowList } from '@/components/opportunities/GrowthFlowList'
import { buildGrowthFlowLeads } from '@/lib/crm-lead-insights'
import { loadLinkedCrmSnapshot, seedLinkedDemoData } from '@/lib/crm-client-service'

export default function OpportunitiesScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const { executeAction } = useGamification()

  const [cards, setCards] = useState<KanbanCardWithClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOpportunities = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const snapshot = await loadLinkedCrmSnapshot()
      setCards(snapshot.cards)
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : 'Não foi possível carregar as oportunidades.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadOpportunities()
  }, [loadOpportunities])

  async function handleSeedDemoData() {
    setIsSeeding(true)
    setError(null)

    try {
      const snapshot = await seedLinkedDemoData()
      setCards(snapshot.cards)
    } catch (seedError) {
      const message =
        seedError instanceof Error
          ? seedError.message
          : 'Não foi possível importar oportunidades demo.'
      setError(message)
    } finally {
      setIsSeeding(false)
    }
  }

  const growthFlowLeads = useMemo(() => buildGrowthFlowLeads(cards), [cards])
  const totalPipelineImpact = useMemo(
    () => growthFlowLeads.reduce((sum, lead) => sum + lead.dealImpact, 0),
    [growthFlowLeads],
  )

  if (isLoading && cards.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F8FAFC]" edges={['top']}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-3 text-sm text-slate-500">
          A IA está priorizando as suas oportunidades...
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={[
          'gap-6 pb-10 pt-6',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => void loadOpportunities()} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2">
          <Text className="text-3xl font-bold tracking-tight text-deepBlue">Oportunidades</Text>
          <Text className="text-base leading-6 text-slate-500">
            Fluxo de Crescimento — cada lead com a próxima ação que mais impacta o seu faturamento.
          </Text>
        </View>

        {growthFlowLeads.length > 0 ? (
          <View className="rounded-3xl bg-white p-5 shadow-sm">
            <Text className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pipeline ativo
            </Text>
            <Text className="mt-1 text-2xl font-bold text-deepBlue">
              +R$ {totalPipelineImpact.toLocaleString('pt-BR')}
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Impacto potencial se as ações de hoje forem executadas.
            </Text>
          </View>
        ) : null}

        {error ? (
          <View className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        ) : null}

        {cards.length === 0 && !isLoading ? (
          <View className="items-center gap-4 rounded-3xl border border-dashed border-slate-200 bg-white p-8">
            <Text className="text-center text-base font-medium text-deepBlue">
              Nenhuma oportunidade encontrada ainda
            </Text>
            <Pressable
              onPress={() => void loadOpportunities()}
              disabled={isLoading}
              className="rounded-2xl bg-electricBlue px-5 py-3 active:opacity-80"
            >
              <Text className="font-semibold text-white">
                {isLoading ? 'Sincronizando...' : 'Sincronizar oportunidades'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => void handleSeedDemoData()}
              disabled={isSeeding}
              className="rounded-2xl border border-slate-200 px-5 py-3 active:opacity-70"
            >
              <Text className="font-medium text-slate-600">
                {isSeeding ? 'Importando...' : 'Importar dados demo'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <GrowthFlowList
            leads={growthFlowLeads}
            onExecuteLead={() => executeAction('follow-up-leads')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
