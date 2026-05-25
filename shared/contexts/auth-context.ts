import { createContext } from 'react'
import type { MockUser } from '../types/auth'

export type AuthContextValue = {
  currentUser: MockUser | null
  isAuthLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signOutUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
