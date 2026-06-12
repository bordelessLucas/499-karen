import { Text, View } from 'react-native'
import type { BusinessHealthScores } from '@shared/types/gamification'

type GrowthNodeStatus = 'completed' | 'in_progress' | 'pending'

type GrowthTreeNode = {
  id: string
  label: string
  resolveValue: (health: BusinessHealthScores) => number
}

const GROWTH_TREE_NODES: GrowthTreeNode[] = [
  { id: 'credibilidade', label: 'Credibilidade', resolveValue: (h) => h.credibilidade },
  { id: 'marketing', label: 'Marketing', resolveValue: (h) => h.marketing },
  {
    id: 'leads',
    label: 'Leads',
    resolveValue: (h) => Math.round((h.marketing + h.vendas) / 2),
  },
  { id: 'vendas', label: 'Vendas', resolveValue: (h) => h.vendas },
  { id: 'automacao', label: 'Automação', resolveValue: (h) => h.automacao },
  { id: 'escala', label: 'Escala', resolveValue: (h) => h.posicionamento },
]

function resolveNodeStatus(value: number): GrowthNodeStatus {
  if (value >= 70) {
    return 'completed'
  }

  if (value >= 40) {
    return 'in_progress'
  }

  return 'pending'
}

function resolveStatusColor(status: GrowthNodeStatus): string {
  const colors: Record<GrowthNodeStatus, string> = {
    completed: '#10B981',
    in_progress: '#F59E0B',
    pending: '#CBD5E1',
  }

  return colors[status]
}

function resolveStatusLabel(status: GrowthNodeStatus): string {
  const labels: Record<GrowthNodeStatus, string> = {
    completed: 'Concluído',
    in_progress: 'Em progresso',
    pending: 'Pendente',
  }

  return labels[status]
}

type GrowthTreeProps = {
  businessHealth: BusinessHealthScores
}

export function GrowthTree({ businessHealth }: GrowthTreeProps) {
  return (
    <View
      className="rounded-3xl bg-white p-6 shadow-sm"
      style={{
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <Text className="text-base font-semibold text-deepBlue">Árvore de Crescimento</Text>
      <Text className="mt-1 text-sm text-slate-500">
        O caminho estratégico da sua empresa, do primeiro contato à escala.
      </Text>

      <View className="mt-6">
        {GROWTH_TREE_NODES.map((node, index) => {
          const value = node.resolveValue(businessHealth)
          const status = resolveNodeStatus(value)
          const dotColor = resolveStatusColor(status)
          const isLast = index === GROWTH_TREE_NODES.length - 1

          return (
            <View key={node.id} className="flex-row gap-4">
              <View className="items-center">
                <View
                  className="h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: dotColor,
                    backgroundColor: status === 'pending' ? '#FFFFFF' : `${dotColor}33`,
                  }}
                />
                {!isLast ? <View className="mt-1 w-0.5 flex-1 bg-slate-200" /> : null}
              </View>

              <View className={['flex-1 flex-row items-start justify-between', isLast ? 'pb-0' : 'pb-5'].join(' ')}>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-deepBlue">{node.label}</Text>
                  <Text className="mt-0.5 text-xs text-slate-400">{resolveStatusLabel(status)}</Text>
                </View>
                <Text className="text-sm font-bold text-slate-400">{value}%</Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
