import type { LucideIcon } from 'lucide-react-native'
import { BrainCircuit, LayoutGrid, MessageSquare } from 'lucide-react-native'

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
    href: '/(tabs)/workforce',
    label: 'Equipe IA',
    icon: BrainCircuit,
    match: (path) => path.includes('workforce'),
  },
  {
    href: '/(tabs)/conversations',
    label: 'Conversas',
    icon: MessageSquare,
    match: (path) => path.includes('conversations'),
  },
]
