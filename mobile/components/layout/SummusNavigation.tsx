import { Pressable, ScrollView, Text, View } from 'react-native'
import { Link, usePathname } from 'expo-router'
import { summusNavItems } from '@/constants/summus-nav-items'
import { SummusLogo } from '@/components/ui/SummusLogo'
import { GamificationProfileCard } from './GamificationProfileCard'

type SummusNavigationProps = {
  onNavigate?: () => void
}

export function SummusNavigation({ onNavigate }: SummusNavigationProps) {
  const pathname = usePathname()

  return (
    <View className="h-full w-[272px] bg-summus-900">
      <View className="border-b border-summus-700/80 px-5 py-5 items-center">
        <SummusLogo compact />
      </View>

      <ScrollView
        className="flex-1 px-3 py-3"
        contentContainerClassName="gap-0.5 pb-3"
        showsVerticalScrollIndicator={false}
      >
        {summusNavItems.map((item) => {
          const isActive = item.match(pathname)
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                onPress={onNavigate}
                className={[
                  'flex-row items-center gap-3 rounded-lg py-2.5 pl-3 pr-3',
                  isActive ? 'bg-summus-800' : 'bg-transparent',
                ].join(' ')}
              >
                {isActive ? (
                  <View className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gold-400" />
                ) : null}
                <Icon size={18} color={isActive ? '#FBBF24' : '#64748B'} />
                <Text
                  className={[
                    'flex-1 text-[13px] font-medium',
                    isActive ? 'font-semibold text-gold-400' : 'text-slate-400',
                  ].join(' ')}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          )
        })}
      </ScrollView>

      <View className="border-t border-summus-700/80 p-4">
        <GamificationProfileCard />
      </View>
    </View>
  )
}
