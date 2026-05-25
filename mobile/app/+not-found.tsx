import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <View className="flex-1 items-center justify-center bg-slate-100 p-6">
        <Text className="text-xl font-semibold text-slate-900">Esta tela não existe.</Text>
        <Link href="/(tabs)" className="mt-4">
          <Text className="font-semibold text-violet-600">Voltar ao início</Text>
        </Link>
      </View>
    </>
  )
}
