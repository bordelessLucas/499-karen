import { useCallback, useEffect, useState } from 'react'

import {

  ActivityIndicator,

  Pressable,

  RefreshControl,

  Text,

  View,

} from 'react-native'

import { categoryLabels, priorityLabels } from '@shared/data'

import type { KanbanCardWithClient } from '@shared/types'

import { Mail, X } from 'lucide-react-native'

import { AppScreen } from '@/components/layout/AppScreen'

import { PageScroll } from '@/components/layout/PageScroll'

import { ResponsiveDialog } from '@/components/layout/ResponsiveDialog'

import { CrmKanbanBoard } from '@/components/crm/CrmKanbanBoard'

import { ScreenHeader } from '@/components/ui/ScreenHeader'

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

import {

  loadLinkedCrmSnapshot,

  moveOpportunityToColumn,

  seedLinkedDemoData,

} from '@/lib/crm-client-service'
import { buildOptimisticCards } from '@/lib/crm-optimistic'



export default function CrmScreen() {

  const { isWebDesktop } = useResponsiveLayout()

  const [columns, setColumns] = useState<Awaited<ReturnType<typeof loadLinkedCrmSnapshot>>['columns']>([])

  const [cards, setCards] = useState<KanbanCardWithClient[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [isSeeding, setIsSeeding] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [selectedCard, setSelectedCard] = useState<KanbanCardWithClient | null>(null)

  const [activeDragCardId, setActiveDragCardId] = useState<string | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)



  const loadCrm = useCallback(async () => {

    setIsLoading(true)

    setError(null)



    try {

      const snapshot = await loadLinkedCrmSnapshot()

      setColumns(snapshot.columns)

      setCards(snapshot.cards)

    } catch (loadError) {

      const message =

        loadError instanceof Error ? loadError.message : 'Não foi possível carregar o funil.'

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

      setColumns(snapshot.columns)

      setCards(snapshot.cards)

    } catch (seedError) {

      const message =

        seedError instanceof Error ? seedError.message : 'Não foi possível importar o funil demo.'

      setError(message)

    } finally {

      setIsSeeding(false)

    }

  }



  const handleMoveCard = useCallback(
    async (cardId: string, targetColumnId: string, targetIndex?: number) => {
      const movingCard = cards.find((card) => card.id === cardId)
      if (!movingCard) {
        return
      }

      if (movingCard.columnId === targetColumnId) {
        return
      }

      const previousCards = cards
      const optimisticCards = buildOptimisticCards(
        cards,
        columns,
        cardId,
        targetColumnId,
        targetIndex,
      )

      setCards(optimisticCards)
      setError(null)

      try {
        await moveOpportunityToColumn(cardId, targetColumnId, targetIndex)
      } catch (moveError) {
        setCards(previousCards)
        const message =
          moveError instanceof Error ? moveError.message : 'Não foi possível mover a oportunidade.'
        setError(message)
      }
    },
    [cards, columns],
  )



  if (isLoading && columns.length === 0) {

    return (

      <AppScreen className="items-center justify-center">

        <ActivityIndicator size="large" color="#7c3aed" />

        <Text className="mt-3 text-sm text-slate-500">Carregando funil...</Text>

      </AppScreen>

    )

  }



  if (columns.length === 0 && !isLoading) {

    return (

      <AppScreen>

        <PageScroll

          contentClassName="flex-1 justify-center"

          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void loadCrm()} />}

        >

          <ScreenHeader

            badge="Pipeline comercial"

            title="CRM & Funil"

            description="Puxe para atualizar — clientes existentes serão sincronizados automaticamente."

          />

          {error ? (

            <View className="rounded-2xl border border-red-200 bg-red-50 p-4">

              <Text className="text-sm text-red-700">{error}</Text>

            </View>

          ) : null}

          <View className="items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white p-8">

            <Text className="text-center text-base font-medium text-slate-800">

              Funil ainda não configurado

            </Text>

            <Pressable

              onPress={() => void loadCrm()}

              disabled={isLoading}

              className="rounded-full bg-violet-600 px-5 py-3"

            >

              <Text className="font-medium text-white">

                {isLoading ? 'Sincronizando...' : 'Sincronizar clientes'}

              </Text>

            </Pressable>

            <Pressable

              onPress={() => void handleSeedDemoData()}

              disabled={isSeeding}

              className="rounded-full border border-slate-200 bg-white px-5 py-3"

            >

              <Text className="font-medium text-slate-600">

                {isSeeding ? 'Importando...' : 'Ou importar funil demo'}

              </Text>

            </Pressable>

          </View>

        </PageScroll>

      </AppScreen>

    )

  }



  return (

    <AppScreen fullWidth={isWebDesktop}>

      <PageScroll

        refreshControl={

          isWebDesktop ? undefined : (

            <RefreshControl refreshing={isLoading} onRefresh={() => void loadCrm()} />

          )

        }

      >

        <ScreenHeader

          badge="Pipeline comercial"

          title="CRM & Funil"

          description={

            isWebDesktop

              ? 'Arraste e solte oportunidades entre as colunas do funil.'

              : 'Pressione e segure um card, depois arraste entre as etapas.'

          }

        />



        {error ? (

          <View className="rounded-2xl border border-red-200 bg-red-50 p-4">

            <Text className="text-sm text-red-700">{error}</Text>

          </View>

        ) : null}



        <CrmKanbanBoard

          columns={columns}

          cards={cards}

          onCardPress={setSelectedCard}

          onMoveCard={(cardId, targetColumnId, targetIndex) => {

            void handleMoveCard(cardId, targetColumnId, targetIndex)

          }}

          activeDragCardId={activeDragCardId}

          onDragStart={setActiveDragCardId}
          onDragEnd={() => {
            setActiveDragCardId(null)
            setOverColumnId(null)
          }}
          overColumnId={overColumnId}
          onDragOver={setOverColumnId}
        />

      </PageScroll>



      <ResponsiveDialog visible={selectedCard !== null} onClose={() => setSelectedCard(null)}>

        {selectedCard ? (

          <>

            <View className="mb-4 flex-row items-start justify-between gap-4">

              <View className="flex-1">

                <View className="flex-row flex-wrap gap-2">

                  <View className="rounded-full bg-violet-100 px-2.5 py-0.5">

                    <Text className="text-xs font-medium text-violet-700">

                      {categoryLabels[selectedCard.category]}

                    </Text>

                  </View>

                  <Text className="text-xs font-medium text-amber-700">

                    Prioridade {priorityLabels[selectedCard.priority].toLowerCase()}

                  </Text>

                </View>

                <Text className="mt-3 text-xl font-semibold text-slate-900">{selectedCard.title}</Text>

              </View>

              <Pressable onPress={() => setSelectedCard(null)} className="rounded-xl bg-slate-100 p-2">

                <X size={18} color="#64748b" />

              </Pressable>

            </View>

            <Text className="text-sm font-medium text-slate-700">Descrição</Text>

            <Text className="mt-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">

              {selectedCard.description || 'Nenhuma descrição informada.'}

            </Text>

            <View className="mt-4 gap-3">

              <View className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                <Text className="text-xs font-medium text-slate-500">Cliente vinculado</Text>

                <Text className="mt-1 font-medium text-slate-900">{selectedCard.displayClientName}</Text>

                {selectedCard.client ? (

                  <>

                    <Text className="mt-1 text-sm text-slate-500">{selectedCard.client.company}</Text>

                    <View className="mt-2 flex-row items-center gap-1.5">

                      <Mail size={12} color="#64748b" />

                      <Text className="text-xs text-slate-500">{selectedCard.client.email}</Text>

                    </View>

                  </>

                ) : (

                  <Text className="mt-1 text-xs text-amber-600">Lead sem cadastro vinculado.</Text>

                )}

              </View>

            </View>

            <Pressable

              onPress={() => setSelectedCard(null)}

              className="mt-6 rounded-2xl bg-violet-600 py-3"

            >

              <Text className="text-center text-sm font-semibold text-white">Fechar</Text>

            </Pressable>

          </>

        ) : null}

      </ResponsiveDialog>

    </AppScreen>

  )

}


