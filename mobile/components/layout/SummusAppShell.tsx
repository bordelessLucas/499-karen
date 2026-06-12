import type { ReactNode } from 'react'
import { View } from 'react-native'

type SummusAppShellProps = {
  children: ReactNode
}

export function SummusAppShell({ children }: SummusAppShellProps) {
  return (
    <View className="min-h-full flex-1 bg-deepBlue">
      {children}
    </View>
  )
}
