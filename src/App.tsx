import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { useAuth } from './contexts/useAuth'
import { Clientes } from './pages/Clientes'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

type PlaceholderPageProps = {
  title: string
  description: string
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
        MVP estrutural
      </span>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>
    </section>
  )
}

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route
            path="crm"
            element={
              <PlaceholderPage
                title="CRM & Funil"
                description="Espaço reservado para pipeline comercial, acompanhamento de oportunidades e inteligência operacional."
              />
            }
          />
          <Route
            path="automacoes"
            element={
              <PlaceholderPage
                title="Automações"
                description="Base preparada para integrar fluxos com IA, gatilhos e orquestrações escaláveis."
              />
            }
          />
          <Route
            path="relatorios"
            element={
              <PlaceholderPage
                title="Relatórios"
                description="Área para métricas estratégicas, análises de performance e crescimento orientado por dados."
              />
            }
          />
          <Route
            path="configuracoes"
            element={
              <PlaceholderPage
                title="Configurações"
                description="Seção destinada às preferências do produto, integrações e administração do ambiente."
              />
            }
          />
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
