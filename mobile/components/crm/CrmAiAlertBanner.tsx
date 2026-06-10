import { Alert, Pressable, Text, View } from 'react-native'
import { Bot, Sparkles, Zap } from 'lucide-react-native'

type CrmAiAlertBannerProps = {
  inactiveLeadsCount: number
}

export function CrmAiAlertBanner({ inactiveLeadsCount }: CrmAiAlertBannerProps) {
  function handleReactivate() {
    Alert.alert(
      'Automação ativada!',
      `A IA criou um fluxo de reativação para ${inactiveLeadsCount} leads inativos. As mensagens começam a ser enviadas agora.`,
    )
  }

  return (
    <View
      className="overflow-hidden rounded-3xl border-2 border-gold/40 bg-[#131F35] p-5"
      style={{
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 6,
      }}
    >
      <View className="flex-row items-start gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-electricBlue/20">
          <Bot size={22} color="#3B82F6" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Sparkles size={12} color="#F59E0B" />
            <Text className="text-xs font-bold uppercase tracking-wider text-gold">
              Assistente CRM
            </Text>
          </View>
          <Text className="mt-2 text-base leading-6 text-white">
            Você possui {inactiveLeadsCount} leads sem contato há 14 dias.
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleReactivate}
        className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl bg-electricBlue py-3.5 active:opacity-80"
      >
        <Zap size={16} color="#FFFFFF" fill="#FFFFFF" />
        <Text className="text-sm font-bold text-white">Reativar Agora (Criar Automação)</Text>
      </Pressable>
    </View>
  )
}
