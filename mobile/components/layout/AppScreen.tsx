import type { ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { Edge } from 'react-native-safe-area-context'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

type AppScreenProps = {
  children: ReactNode
  className?: string
  edges?: Edge[]
  fullWidth?: boolean
}

export function AppScreen({
  children,
  className = '',
  edges = ['top'],
  fullWidth = false,
}: AppScreenProps) {
  const { isWebDesktop } = useResponsiveLayout()

  if (isWebDesktop) {
    return (
      <View className={`w-full bg-slate-100 ${className}`}>
        <View
          className={[
            'mx-auto w-full',
            fullWidth ? 'max-w-[1600px] px-8 py-6' : 'max-w-7xl px-8 py-6',
          ].join(' ')}
        >
          {children}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className={`flex-1 bg-slate-100 ${className}`} edges={edges}>
      {children}
    </SafeAreaView>
  )
}
