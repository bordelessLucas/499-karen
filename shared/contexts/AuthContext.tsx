import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './auth-context'
import {
  getStoredSession,
  mockResetPassword,
  mockSignIn,
  mockSignOut,
  mockSignUp,
} from '../services/mock-auth'
import type { MockUser } from '../types/auth'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      try {
        const session = await getStoredSession()
        if (isMounted) {
          setCurrentUser(session)
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false)
        }
      }
    }

    void loadSession()

    return () => {
      isMounted = false
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const user = await mockSignIn(email, password)
    setCurrentUser(user)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const user = await mockSignUp(email, password)
    setCurrentUser(user)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    await mockResetPassword(email)
  }, [])

  const signOutUser = useCallback(async () => {
    await mockSignOut()
    setCurrentUser(null)
  }, [])

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthLoading,
      signIn,
      signUp,
      resetPassword,
      signOutUser,
    }),
    [currentUser, isAuthLoading, signIn, signUp, resetPassword, signOutUser],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
