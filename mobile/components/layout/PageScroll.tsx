import type { ReactNode } from 'react'
import { ScrollView, View, type ScrollViewProps } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

type PageScrollProps = ScrollViewProps & {
  children: ReactNode
  contentClassName?: string
}

export function PageScroll({ children, contentClassName = '', ...props }: PageScrollProps) {
  const { isWebDesktop } = useResponsiveLayout()

  if (isWebDesktop) {
    return (
      <View className={['gap-8 pb-10', contentClassName].join(' ')}>{children}</View>
    )
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName={['gap-6 p-5 pb-10', contentClassName].join(' ')}
      {...props}
    >
      {children}
    </ScrollView>
  )
}
