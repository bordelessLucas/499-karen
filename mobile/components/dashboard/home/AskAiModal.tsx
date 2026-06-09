import { Modal, Pressable, Text, View } from 'react-native'
import { Bot, Sparkles, X } from 'lucide-react-native'

type AskAiModalProps = {
  visible: boolean
  onClose: () => void
  onAccept: () => void
}

export function AskAiModal({ visible, onClose, onAccept }: AskAiModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/60 px-5" onPress={onClose}>
        <Pressable
          className="w-full max-w-md rounded-3xl bg-deepBlue p-6"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="flex-row items-start justify-between gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-electricBlue/20">
              <Bot size={22} color="#3B82F6" />
            </View>
            <Pressable onPress={onClose} className="rounded-full p-1 active:opacity-70">
              <X size={20} color="#94A3B8" />
            </Pressable>
          </View>

          <View className="mt-4 flex-row items-center gap-1.5">
            <Sparkles size={14} color="#F59E0B" />
            <Text className="text-xs font-bold uppercase tracking-wider text-gold">
              CEO Invisível
            </Text>
          </View>

          <Text className="mt-3 text-base leading-6 text-white">
            Notei que a conversão do seu site caiu 12% esta semana. Quer que eu reescreva a
            headline principal agora para melhorar isso?
          </Text>

          <Pressable
            onPress={onAccept}
            className="mt-6 rounded-2xl bg-electricBlue py-3.5 active:opacity-80"
          >
            <Text className="text-center text-sm font-bold text-white">Sim, reescreve agora</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            className="mt-3 rounded-2xl border border-white/20 py-3.5 active:opacity-70"
          >
            <Text className="text-center text-sm font-semibold text-white/80">Outro assunto</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
