import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { useAuth } from './contexts/useAuth'
import { Automations } from './pages/Automations'
import { Clientes } from './pages/Clientes'
import { Crm } from './pages/Crm'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden p-6 md:p-10">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="crm" element={<Crm />} />
          <Route path="automacoes" element={<Automations />} />
          <Route path="relatorios" element={<Reports />} />
          <Route path="configuracoes" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  const { currentUser, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-sm">
          Verificando sua sessão...
        </div>
      </main>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/*"
        element={currentUser ? <DashboardLayout /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App
