import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

type ScreenHeaderProps = {
  badge?: string
  title: string
  description?: string
  action?: ReactNode
}

export function ScreenHeader({ badge, title, description, action }: ScreenHeaderProps) {
  const { isWebDesktop } = useResponsiveLayout()

  return (
    <View className="flex-row items-start justify-between gap-3">
      <View className="flex-1">
        {badge ? (
          <Text className="text-sm font-medium text-violet-600">{badge}</Text>
        ) : null}
        <Text
          className={[
            'font-semibold text-slate-900',
            badge ? 'mt-2' : '',
            isWebDesktop ? 'text-4xl' : 'text-3xl',
          ].join(' ')}
        >
          {title}
        </Text>
        {description ? (
          <Text className={['mt-2 text-slate-500', isWebDesktop ? 'text-lg' : 'text-base'].join(' ')}>
            {description}
          </Text>
        ) : null}
      </View>
      {action ? <View className="shrink-0">{action}</View> : null}
    </View>
  )
}
