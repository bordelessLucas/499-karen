import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Briefcase,
  Home,
  LogOut,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/useAuth'

type SidebarItem = {
  label: string
  to: string
  icon: LucideIcon
}

const primaryItems: SidebarItem[] = [
  { label: 'Dashboard', to: '/', icon: Home },
  { label: 'Área de Clientes', to: '/clientes', icon: Users },
  { label: 'CRM & Funil', to: '/crm', icon: Briefcase },
  { label: 'Automações', to: '/automacoes', icon: Zap },
  { label: 'Relatórios', to: '/relatorios', icon: BarChart3 },
]

function SidebarLink({ item }: { item: SidebarItem }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
          isActive
            ? 'bg-white/10 text-white shadow-lg shadow-black/10'
            : 'text-slate-300 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </NavLink>
  )
}

export function Sidebar() {
  const { currentUser, signOutUser } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await signOutUser()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <aside className="flex min-h-screen w-full max-w-72 flex-col bg-gray-900 px-5 py-6 text-slate-50">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300">
          Plataforma 499
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[0.2em]">BORDERLESS</h2>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {primaryItems.map((item) => (
          <SidebarLink key={item.to} item={item} />
        ))}
      </nav>

      <div className="border-t border-white/10 pt-5">
        <div className="mb-4 rounded-2xl bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Sessão</p>
          <p className="mt-2 truncate text-sm font-medium text-white">
            {currentUser?.email ?? 'Usuário autenticado'}
          </p>
        </div>

        <SidebarLink
          item={{ label: 'Configurações', to: '/configuracoes', icon: Settings }}
        />

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogOut className="h-5 w-5" />
          <span>{isSigningOut ? 'Saindo...' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  )
}
