import { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native'
import { Sparkles, Zap } from 'lucide-react-native'
import { GROWTH_ACTIONS } from '@shared/constants/growth-actions'

const FEATURED_ACTION_ID = 'reactivate-inactive-leads'
const featuredAction = GROWTH_ACTIONS[FEATURED_ACTION_ID]

type NextBestActionCardProps = {
  onExecute: (actionId: string) => void
}

function formatRevenue(amount: number): string {
  return amount.toLocaleString('pt-BR')
}

export function NextBestActionCard({ onExecute }: NextBestActionCardProps) {
  const [isExecuting, setIsExecuting] = useState(false)

  function handleExecute() {
    if (isExecuting) {
      return
    }

    setIsExecuting(true)

    setTimeout(() => {
      onExecute(FEATURED_ACTION_ID)
      setIsExecuting(false)

      Alert.alert(
        'Execução iniciada',
        'A IA está reativando os seus leads inativos. Receberá um resumo em instantes.',
      )
    }, 1200)
  }

  return (
    <View
      className="overflow-hidden rounded-3xl border-2 border-gold/40 bg-white p-6"
      style={{
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 4,
      }}
    >
      <View className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-electricBlue/5" />
      <View className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-gold/10" />

      <View className="flex-row items-center gap-2">
        <Sparkles size={16} color="#F59E0B" />
        <Text className="text-xs font-bold uppercase tracking-wider text-gold">
          Revenue First
        </Text>
      </View>

      <Text className="mt-4 text-lg font-semibold text-deepBlue">
        Sua maior oportunidade hoje:
      </Text>

      <Text className="mt-2 text-xl font-bold leading-7 text-deepBlue">
        {featuredAction.title}
      </Text>

      <View className="mt-4 self-start rounded-full bg-emerald/10 px-3.5 py-2">
        <Text className="text-sm font-bold text-emerald">
          Impacto estimado: +R$ {formatRevenue(featuredAction.revenueGain)}
        </Text>
      </View>

      <Pressable
        onPress={handleExecute}
        disabled={isExecuting}
        className="mt-6 flex-row items-center justify-center gap-2 rounded-2xl bg-electricBlue py-4 active:opacity-90 disabled:opacity-70"
        style={{
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        {isExecuting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
        )}
        <Text className="text-base font-bold text-white">
          {isExecuting ? 'Executando...' : 'Executar Agora'}
        </Text>
      </Pressable>
    </View>
  )
}
