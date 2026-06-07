import type { LucideIcon } from 'lucide-react-native'
import {
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  CheckSquare,
  FolderOpen,
  Gem,
  LayoutGrid,
  Megaphone,
  Zap,
} from 'lucide-react-native'

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
    href: '/(tabs)/tasks',
    label: 'Tasks',
    icon: CheckSquare,
    match: (path) => path.includes('tasks'),
  },
  {
    href: '/(tabs)/crm',
    label: 'CRM',
    icon: Briefcase,
    match: (path) => path.includes('crm'),
  },
  {
    href: '/(tabs)/marketing',
    label: 'Marketing',
    icon: Megaphone,
    match: (path) => path.includes('marketing'),
  },
  {
    href: '/(tabs)/bookings',
    label: 'Bookings',
    icon: Calendar,
    match: (path) => path.includes('bookings'),
  },
  {
    href: '/(tabs)/automations',
    label: 'Automations',
    icon: Zap,
    match: (path) => path.includes('automations'),
  },
  {
    href: '/(tabs)/analytics',
    label: 'Analytics',
    icon: BarChart3,
    match: (path) => path.includes('analytics'),
  },
  {
    href: '/(tabs)/resources',
    label: 'Resources',
    icon: FolderOpen,
    match: (path) => path.includes('resources'),
  },
  {
    href: '/(tabs)/treasure-vault',
    label: 'Treasure Vault',
    icon: Gem,
    match: (path) => path.includes('treasure-vault'),
  },
]
