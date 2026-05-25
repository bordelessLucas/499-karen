import '../global.css'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-reanimated'
import { configureStorage } from '@shared/storage'
import { AuthProvider } from '@shared/contexts'
import { createAsyncStorageAdapter } from '@/lib/async-storage'
import { initializeFirebase } from '@/lib/firebase'

export { ErrorBoundary } from 'expo-router'

configureStorage(createAsyncStorageAdapter())
initializeFirebase()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="reports"
              options={{
                headerShown: Platform.OS !== 'web',
                title: 'Relatórios',
                headerStyle: { backgroundColor: '#f8fafc' },
                headerTintColor: '#7c3aed',
              }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
