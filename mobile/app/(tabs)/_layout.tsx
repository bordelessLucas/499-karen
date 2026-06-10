import { ActivityIndicator, View } from 'react-native'
import { Redirect, Tabs } from 'expo-router'
import { useAuth } from '@shared/contexts'
import { SummusAppShell } from '@/components/layout/SummusAppShell'

export default function TabLayout() {
  const { currentUser, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-deepBlue">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    )
  }

  if (!currentUser) {
    return <Redirect href="/login" />
  }

  return (
    <SummusAppShell>
      <Tabs
        tabBar={() => null}
        screenOptions={{
          headerShown: false,
          sceneStyle: { flex: 1, backgroundColor: '#0F172A' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="ai-coach" options={{ title: 'AI Coach' }} />
        <Tabs.Screen name="learn" options={{ title: 'Learn & Implement' }} />
        <Tabs.Screen name="crm" options={{ title: 'CRM Assistente' }} />
        <Tabs.Screen name="automations" options={{ title: 'Automações' }} />
        <Tabs.Screen name="treasure-vault" options={{ title: 'Treasure Vault' }} />
        <Tabs.Screen name="tasks" options={{ href: null, title: 'Tasks' }} />
        <Tabs.Screen name="marketing" options={{ href: null, title: 'Marketing' }} />
        <Tabs.Screen name="bookings" options={{ href: null, title: 'Bookings' }} />
        <Tabs.Screen name="analytics" options={{ href: null, title: 'Analytics' }} />
        <Tabs.Screen name="resources" options={{ href: null, title: 'Resources' }} />
        <Tabs.Screen name="clientes" options={{ href: null, title: 'Clientes' }} />
        <Tabs.Screen name="settings" options={{ href: null, title: 'Settings' }} />
      </Tabs>
    </SummusAppShell>
  )
}
