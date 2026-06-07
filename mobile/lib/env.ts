import Constants from 'expo-constants'

export type FirebasePublicConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const FIREBASE_ENV_KEYS = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID',
] as const

function readFromProcessEnv(): FirebasePublicConfig {
  return {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
  }
}

function readFromExpoExtra(): FirebasePublicConfig | null {
  const firebase = Constants.expoConfig?.extra?.firebase as FirebasePublicConfig | undefined

  if (!firebase?.apiKey || !firebase.projectId) {
    return null
  }

  return firebase
}

function getMissingKeys(config: FirebasePublicConfig): string[] {
  const entries: Array<[string, string]> = [
    ['EXPO_PUBLIC_FIREBASE_API_KEY', config.apiKey],
    ['EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', config.authDomain],
    ['EXPO_PUBLIC_FIREBASE_PROJECT_ID', config.projectId],
    ['EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET', config.storageBucket],
    ['EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', config.messagingSenderId],
    ['EXPO_PUBLIC_FIREBASE_APP_ID', config.appId],
  ]

  return entries.filter(([, value]) => !value.trim()).map(([key]) => key)
}

export function getFirebasePublicConfig(): FirebasePublicConfig {
  const fromExtra = readFromExpoExtra()
  const config = fromExtra ?? readFromProcessEnv()
  const missingKeys = getMissingKeys(config)

  if (missingKeys.length > 0) {
    throw new Error(
      `Configuração Firebase incompleta (${missingKeys.join(', ')}). ` +
        'Para builds EAS, defina as variáveis no painel Expo ou rode: eas env:push --environment preview',
    )
  }

  return config
}

export function getFirebaseConfigError(): string | null {
  try {
    getFirebasePublicConfig()
    return null
  } catch (error) {
    return error instanceof Error ? error.message : 'Configuração Firebase inválida.'
  }
}

export const firebaseEnv = {
  projectId:
    Constants.expoConfig?.extra?.firebase?.projectId ??
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ??
    'karen-eaaf4',
} as const

export const firebaseEnvKeyNames = FIREBASE_ENV_KEYS
