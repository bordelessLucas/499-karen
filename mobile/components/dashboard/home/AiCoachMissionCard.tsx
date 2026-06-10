import { Alert, Pressable, Text, View } from 'react-native'
import { Bot, Sparkles, Target, Zap } from 'lucide-react-native'
import type { MissionImpactCategory } from '@shared/types/gamification'

type AiCoachMissionCardProps = {
  onResolveMission: (
    xpReward: number,
    coinReward: number,
    impactCategory: MissionImpactCategory,
    impactValue: number,
  ) => void
}

const MISSION_XP_REWARD = 120
const MISSION_COIN_REWARD = 25
const MISSION_IMPACT_CATEGORY: MissionImpactCategory = 'posicionamento'
const MISSION_IMPACT_VALUE = 8

export function AiCoachMissionCard({ onResolveMission }: AiCoachMissionCardProps) {
  function handleResolveMission() {
    onResolveMission(
      MISSION_XP_REWARD,
      MISSION_COIN_REWARD,
      MISSION_IMPACT_CATEGORY,
      MISSION_IMPACT_VALUE,
    )

    Alert.alert(
      'Missão em execução!',
      'A IA está a adicionar o CTA na página principal. Receberá a proposta em instantes.',
    )
  }

  return (
    <View
      className="overflow-hidden rounded-3xl border-2 border-gold/50 bg-[#131F35] p-6"
      style={{
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 8,
      }}
    >
      <View className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-electricBlue/10" />
      <View className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-gold/10" />

      <View className="flex-row items-center gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-electricBlue/20">
          <Bot size={22} color="#3B82F6" />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-bold uppercase tracking-wider text-electricBlue">
            Prioridade máxima
          </Text>
          <Text className="text-lg font-bold text-white">AI Coach — O que fazer agora:</Text>
        </View>
        <Sparkles size={18} color="#F59E0B" />
      </View>

      <Text className="mt-4 text-base leading-6 text-white/85">
        Notei que seu site precisa de mais conversão. Missão: Adicionar um CTA na página
        principal.
      </Text>

      <View className="mt-4 flex-row items-center gap-2 self-start rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
        <Target size={14} color="#F59E0B" />
        <Text className="text-xs font-semibold text-gold">
          Impacto estimado: +{MISSION_IMPACT_VALUE} pontos em Posicionamento
        </Text>
      </View>

      <Pressable
        onPress={handleResolveMission}
        className="mt-6 flex-row items-center justify-center gap-2 rounded-2xl bg-electricBlue py-4 active:opacity-80"
        style={{
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
        <Text className="text-base font-bold text-white">Resolver Agora</Text>
      </Pressable>
    </View>
  )
}
