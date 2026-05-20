import type { MockUser } from '../types/auth'

type StoredUser = MockUser & {
  password: string
}

const USERS_STORAGE_KEY = 'borderless_mock_users'
const SESSION_STORAGE_KEY = 'borderless_mock_session'

const DEMO_USER: StoredUser = {
  id: 'demo-user',
  email: 'demo@borderless.com',
  password: '123456',
}

export class MockAuthError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }
}

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_STORAGE_KEY)
  if (!raw) {
    const initialUsers = [DEMO_USER]
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers))
    return initialUsers
  }

  try {
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return [DEMO_USER]
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function toPublicUser(user: StoredUser): MockUser {
  return { id: user.id, email: user.email }
}

function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new MockAuthError('auth/invalid-email', 'Informe um e-mail válido.')
  }
}

function validatePassword(password: string) {
  if (!password) {
    throw new MockAuthError('auth/missing-password', 'Informe uma senha.')
  }

  if (password.length < 6) {
    throw new MockAuthError(
      'auth/weak-password',
      'A senha deve conter pelo menos 6 caracteres.',
    )
  }
}

function simulateDelay() {
  return new Promise((resolve) => setTimeout(resolve, 400))
}

export function getStoredSession(): MockUser | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as MockUser
  } catch {
    return null
  }
}

export async function mockSignIn(email: string, password: string): Promise<MockUser> {
  await simulateDelay()
  validateEmail(email)
  validatePassword(password)

  const users = readUsers()
  const user = users.find(
    (storedUser) => storedUser.email.toLowerCase() === email.toLowerCase(),
  )

  if (!user || user.password !== password) {
    throw new MockAuthError(
      'auth/invalid-credential',
      'Credenciais inválidas. Revise e-mail e senha.',
    )
  }

  const session = toPublicUser(user)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  return session
}

export async function mockSignUp(email: string, password: string): Promise<MockUser> {
  await simulateDelay()
  validateEmail(email)
  validatePassword(password)

  const users = readUsers()
  const emailExists = users.some(
    (storedUser) => storedUser.email.toLowerCase() === email.toLowerCase(),
  )

  if (emailExists) {
    throw new MockAuthError(
      'auth/email-already-in-use',
      'Este e-mail já está cadastrado.',
    )
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: email.trim(),
    password,
  }

  writeUsers([...users, newUser])

  const session = toPublicUser(newUser)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  return session
}

export async function mockResetPassword(email: string): Promise<void> {
  await simulateDelay()
  validateEmail(email)

  const users = readUsers()
  const userExists = users.some(
    (storedUser) => storedUser.email.toLowerCase() === email.toLowerCase(),
  )

  if (!userExists) {
    throw new MockAuthError(
      'auth/user-not-found',
      'Não encontramos uma conta com este e-mail.',
    )
  }
}

export function mockSignOut(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}
