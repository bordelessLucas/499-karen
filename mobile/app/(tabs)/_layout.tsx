import { ActivityIndicator, Platform, View } from 'react-native'
import { Redirect, Tabs } from 'expo-router'
import { Briefcase, Home, Settings, Users, Zap } from 'lucide-react-native'
import { useAuth } from '@shared/contexts'
import { WebAppShell } from '@/components/layout/WebAppShell'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

export default function TabLayout() {
  const { currentUser, isAuthLoading } = useAuth()
  const { isWebDesktop } = useResponsiveLayout()

  if (isAuthLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-100">
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    )
  }

  if (!currentUser) {
    return <Redirect href="/login" />
  }

  const tabs = (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: isWebDesktop ? undefined : { flex: 1 },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: isWebDesktop
          ? { display: 'none', height: 0 }
          : {
              backgroundColor: '#ffffff',
              borderTopColor: '#e2e8f0',
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
            },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="clientes"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="crm"
        options={{
          title: 'CRM',
          tabBarIcon: ({ color, size }) => <Briefcase color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="automations"
        options={{
          title: 'Automações',
          tabBarIcon: ({ color, size }) => <Zap color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Config.',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  )

  if (Platform.OS === 'web' && isWebDesktop) {
    return <WebAppShell>{tabs}</WebAppShell>
  }

  return tabs
}
