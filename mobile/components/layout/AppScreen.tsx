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
  variant?: 'light' | 'dark'
}

export function AppScreen({
  children,
  className = '',
  edges = ['top'],
  fullWidth = false,
  variant = 'light',
}: AppScreenProps) {
  const { isWebDesktop } = useResponsiveLayout()
  const bgClass = variant === 'dark' ? 'bg-summus-950' : 'bg-[#F3F6FA]'

  if (isWebDesktop) {
    return (
      <View className={`w-full ${bgClass} ${className}`}>
        <View
          className={[
            'mx-auto w-full',
            fullWidth ? 'max-w-[1600px] px-6 py-5 lg:px-8 lg:py-6' : 'max-w-7xl px-6 py-5 lg:px-8 lg:py-6',
          ].join(' ')}
        >
          {children}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className={`flex-1 ${bgClass} ${className}`} edges={edges}>
      <View className="flex-1 px-4 py-4">{children}</View>
    </SafeAreaView>
  )
}
