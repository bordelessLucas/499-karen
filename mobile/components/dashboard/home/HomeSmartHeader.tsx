import { Text, View } from 'react-native'

type HomeSmartHeaderProps = {
  userName: string
  actionCount?: number
}

function resolveGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Bom dia'
  }

  if (hour < 18) {
    return 'Boa tarde'
  }

  return 'Boa noite'
}

export function HomeSmartHeader({ userName, actionCount = 3 }: HomeSmartHeaderProps) {
  const greeting = resolveGreeting()

  return (
    <View className="gap-2">
      <Text className="text-3xl font-bold tracking-tight text-deepBlue">
        {greeting}, {userName}.
      </Text>
      <Text className="text-base leading-6 text-slate-500">
        Hoje existem {actionCount} ações que podem acelerar o crescimento da sua empresa.
      </Text>
    </View>
  )
}
