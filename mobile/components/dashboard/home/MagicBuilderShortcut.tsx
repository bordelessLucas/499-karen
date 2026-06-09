import { Pressable, Text, View } from 'react-native'
import { Sparkles, Wand2 } from 'lucide-react-native'

type MagicBuilderShortcutProps = {
  onPress: () => void
}

export function MagicBuilderShortcut({ onPress }: MagicBuilderShortcutProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-3xl border border-gold/30 bg-deepBlue p-5 active:opacity-90"
    >
      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
        <Wand2 size={22} color="#F59E0B" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-bold text-white">Construtor Mágico</Text>
        <Text className="mt-1 text-sm text-white/60">
          Gere o ecossistema do seu negócio com IA em poucos cliques.
        </Text>
      </View>
      <View className="flex-row items-center gap-1 rounded-full bg-gold px-3 py-1.5">
        <Sparkles size={12} color="#0F172A" />
        <Text className="text-xs font-bold text-deepBlue">IA</Text>
      </View>
    </Pressable>
  )
}
