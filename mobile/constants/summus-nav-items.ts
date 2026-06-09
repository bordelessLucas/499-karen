import type { LucideIcon } from 'lucide-react-native'
import { BookOpen, Bot, Gem, LayoutGrid } from 'lucide-react-native'

export type SummusNavItem = {
  href: string
  label: string
  icon: LucideIcon
  match: (path: string) => boolean
}

export const summusNavItems: SummusNavItem[] = [
  {
    href: '/(tabs)',
    label: 'Home',
    icon: LayoutGrid,
    match: (path) => path === '/' || path === '/index' || path.endsWith('/(tabs)'),
  },
  {
    href: '/(tabs)/ai-coach',
    label: 'AI Coach',
    icon: Bot,
    match: (path) => path.includes('ai-coach'),
  },
  {
    href: '/(tabs)/learn',
    label: 'Learn & Implement',
    icon: BookOpen,
    match: (path) => path.includes('learn'),
  },
  {
    href: '/(tabs)/treasure-vault',
    label: 'Treasure Vault',
    icon: Gem,
    match: (path) => path.includes('treasure-vault'),
  },
]
