import { useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../config/firebase'

type AuthMode = 'signin' | 'signup'

const authModeContent: Record<
  AuthMode,
  { title: string; subtitle: string; submitLabel: string; toggleLabel: string }
> = {
  signin: {
    title: 'Entrar',
    subtitle: 'Acesse seu ambiente inteligente com segurança e fluidez.',
    submitLabel: 'Entrar na plataforma',
    toggleLabel: 'Ainda não tem conta? Cadastre-se',
  },
  signup: {
    title: 'Cadastrar',
    subtitle: 'Crie sua conta inicial e prepare sua operação para escalar.',
    submitLabel: 'Criar conta',
    toggleLabel: 'Já possui conta? Entrar',
  },
}

function mapFirebaseErrorMessage(errorCode: string) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Informe um e-mail válido.'
    case 'auth/missing-password':
      return 'Informe uma senha.'
    case 'auth/invalid-credential':
      return 'Credenciais inválidas. Revise e-mail e senha.'
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.'
    case 'auth/weak-password':
      return 'A senha deve conter pelo menos 6 caracteres.'
    default:
      return 'Não foi possível concluir a autenticação. Tente novamente.'
  }
}

export function Login() {
  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content = useMemo(() => authModeContent[authMode], [authMode])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      if (authMode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      const firebaseErrorCode =
        typeof error === 'object' && error && 'code' in error
          ? String(error.code)
          : ''

      setErrorMessage(mapFirebaseErrorMessage(firebaseErrorCode))
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleModeToggle() {
    setAuthMode((currentMode) => (currentMode === 'signin' ? 'signup' : 'signin'))
    setErrorMessage('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-white to-violet-100 px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-white/80 shadow-2xl shadow-slate-200/70 backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-slate-950 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-violet-200">
              Projeto 499 - Karen
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">
              Automação premium para operações que querem crescer sem fricção.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-300">
              Estrutura inicial preparada para autenticação, expansão modular e uma
              experiência consistente entre web e futuras jornadas mobile.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              MVP Estrutural
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Base pronta para CRM, automações, relatórios e integrações inteligentes
              com foco em performance e escalabilidade.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
                BORDERLESS
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{content.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{content.subtitle}</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@empresa.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Processando...' : content.submitLabel}
              </button>
            </form>

            <button
              type="button"
              onClick={handleModeToggle}
              className="mt-6 text-sm font-medium text-slate-500 transition hover:text-violet-600"
            >
              {content.toggleLabel}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
