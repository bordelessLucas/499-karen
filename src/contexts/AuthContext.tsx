import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { AuthContext, type AuthContextValue } from './auth-context'
import { auth } from '../config/firebase'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setIsAuthLoading(false)
    })

    return unsubscribe
  }, [])

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthLoading,
      signOutUser: () => signOut(auth),
    }),
    [currentUser, isAuthLoading],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
