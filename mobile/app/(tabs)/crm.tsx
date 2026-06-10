import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { KanbanCardWithClient } from '@shared/types'
import { Mail, X } from 'lucide-react-native'
import { ResponsiveDialog } from '@/components/layout/ResponsiveDialog'
import { CrmAiAlertBanner } from '@/components/crm/CrmAiAlertBanner'
import { CrmAssistantView } from '@/components/crm/CrmAssistantView'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { countInactiveLeads, partitionLeads } from '@/lib/crm-lead-insights'
import { loadLinkedCrmSnapshot, seedLinkedDemoData } from '@/lib/crm-client-service'

export default function CrmScreen() {
  const { isWebDesktop, width } = useResponsiveLayout()
  const isWideLayout = width >= 768

  const [cards, setCards] = useState<KanbanCardWithClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<KanbanCardWithClient | null>(null)

  const loadCrm = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const snapshot = await loadLinkedCrmSnapshot()
      setCards(snapshot.cards)
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : 'Não foi possível carregar os leads.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadCrm()
  }, [loadCrm])

  async function handleSeedDemoData() {
    setIsSeeding(true)
    setError(null)

    try {
      const snapshot = await seedLinkedDemoData()
      setCards(snapshot.cards)
    } catch (seedError) {
      const message =
        seedError instanceof Error ? seedError.message : 'Não foi possível importar os leads demo.'
      setError(message)
    } finally {
      setIsSeeding(false)
    }
  }

  const { hotLeads, coldLeads } = useMemo(() => partitionLeads(cards), [cards])
  const inactiveLeadsCount = useMemo(() => countInactiveLeads(cards), [cards])

  if (isLoading && cards.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-deepBlue" edges={['top']}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-3 text-sm text-white/50">A IA está a analisar os seus leads...</Text>
      </SafeAreaView>
    )
  }

  if (cards.length === 0 && !isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-deepBlue" edges={['top']}>
        <ScrollView
          className="flex-1"
          contentContainerClassName={[
            'flex-1 justify-center gap-6 px-5 pb-10 pt-4',
            isWebDesktop ? 'px-8' : '',
          ].join(' ')}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void loadCrm()} />}
        >
          <View className="gap-3">
            <Text className="text-3xl font-bold text-white">CRM Assistente</Text>
            <Text className="text-sm text-white/60">
              Menos cliques, mais ações automáticas para converter leads.
            </Text>
          </View>

          {error ? (
            <View className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
              <Text className="text-sm text-red-300">{error}</Text>
            </View>
          ) : null}

          <View className="items-center gap-4 rounded-3xl border border-dashed border-white/20 bg-white/5 p-8">
            <Text className="text-center text-base font-medium text-white">
              Nenhum lead encontrado ainda
            </Text>
            <Pressable
              onPress={() => void loadCrm()}
              disabled={isLoading}
              className="rounded-2xl bg-electricBlue px-5 py-3 active:opacity-80"
            >
              <Text className="font-semibold text-white">
                {isLoading ? 'Sincronizando...' : 'Sincronizar leads'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => void handleSeedDemoData()}
              disabled={isSeeding}
              className="rounded-2xl border border-white/20 px-5 py-3 active:opacity-70"
            >
              <Text className="font-medium text-white/70">
                {isSeeding ? 'Importando...' : 'Importar leads demo'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-deepBlue" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={[
          'gap-6 pb-10 pt-4',
          isWebDesktop ? 'px-8' : 'px-5',
        ].join(' ')}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void loadCrm()} />}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2">
          <Text className="text-3xl font-bold text-white">CRM Assistente</Text>
          <Text className="text-sm text-white/60">
            A IA prioriza quem converter agora — sem Kanban, sem fricção.
          </Text>
        </View>

        <CrmAiAlertBanner inactiveLeadsCount={inactiveLeadsCount} />

        {error ? (
          <View className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
            <Text className="text-sm text-red-300">{error}</Text>
          </View>
        ) : null}

        <CrmAssistantView
          hotLeads={hotLeads}
          coldLeads={coldLeads}
          isWideLayout={isWideLayout}
          onLeadPress={setSelectedLead}
        />
      </ScrollView>

      <ResponsiveDialog visible={selectedLead !== null} onClose={() => setSelectedLead(null)}>
        {selectedLead ? (
          <>
            <View className="mb-4 flex-row items-start justify-between gap-4">
              <View className="flex-1">
                <Text className="text-xs font-bold uppercase tracking-wider text-electricBlue">
                  Detalhe do lead
                </Text>
                <Text className="mt-2 text-xl font-bold text-slate-900">{selectedLead.clientName}</Text>
                <Text className="mt-1 text-sm text-slate-500">{selectedLead.title}</Text>
              </View>
              <Pressable onPress={() => setSelectedLead(null)} className="rounded-xl bg-slate-100 p-2">
                <X size={18} color="#64748b" />
              </Pressable>
            </View>

            <Text className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {selectedLead.description || 'Sem descrição adicional.'}
            </Text>

            {selectedLead.client ? (
              <View className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Text className="text-xs font-medium text-slate-500">Empresa</Text>
                <Text className="mt-1 font-medium text-slate-900">{selectedLead.client.company}</Text>
                <View className="mt-2 flex-row items-center gap-1.5">
                  <Mail size={12} color="#64748b" />
                  <Text className="text-xs text-slate-500">{selectedLead.client.email}</Text>
                </View>
              </View>
            ) : null}

            <Pressable
              onPress={() => {
                setSelectedLead(null)
                Alert.alert(
                  'Follow-up agendado',
                  `A IA vai contactar ${selectedLead.clientName} nas próximas horas.`,
                )
              }}
              className="mt-6 rounded-2xl bg-electricBlue py-3 active:opacity-80"
            >
              <Text className="text-center text-sm font-bold text-white">
                Deixar a IA Agir Agora
              </Text>
            </Pressable>
          </>
        ) : null}
      </ResponsiveDialog>
    </SafeAreaView>
  )
}
