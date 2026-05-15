import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextValue = {
  currentUser: User | null
  isAuthLoading: boolean
  signOutUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
