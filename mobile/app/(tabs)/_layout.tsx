import { ActivityIndicator, View } from 'react-native'
import { Redirect, Tabs } from 'expo-router'
import { useAuth } from '@shared/contexts'
import { SummusAppShell } from '@/components/layout/SummusAppShell'

export default function TabLayout() {
  const { currentUser, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-summus-950">
        <ActivityIndicator size="large" color="#00D4FF" />
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
          sceneStyle: { flex: 1, backgroundColor: '#F3F6FA' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="ai-coach" options={{ title: 'AI Coach' }} />
        <Tabs.Screen name="learn" options={{ title: 'Learn & Implement' }} />
        <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
        <Tabs.Screen name="crm" options={{ title: 'CRM' }} />
        <Tabs.Screen name="marketing" options={{ title: 'Marketing' }} />
        <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
        <Tabs.Screen name="automations" options={{ title: 'Automations' }} />
        <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
        <Tabs.Screen name="resources" options={{ title: 'Resources' }} />
        <Tabs.Screen name="treasure-vault" options={{ title: 'Treasure Vault' }} />
        <Tabs.Screen name="clientes" options={{ href: null, title: 'Clientes' }} />
        <Tabs.Screen name="settings" options={{ href: null, title: 'Settings' }} />
      </Tabs>
    </SummusAppShell>
  )
}
