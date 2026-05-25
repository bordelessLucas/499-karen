import type { ReactNode } from 'react'
import { View } from 'react-native'
import { AppSidebar } from './AppSidebar'

type WebAppShellProps = {
  children: ReactNode
}

export function WebAppShell({ children }: WebAppShellProps) {
  return (
    <View className="min-h-screen flex-row bg-slate-100">
      <View className="sticky top-0 z-10 h-screen shrink-0 self-start">
        <AppSidebar />
      </View>
      <View className="min-h-screen flex-1">{children}</View>
    </View>
  )
}
