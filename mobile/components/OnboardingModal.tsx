import { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Sparkles } from 'lucide-react-native'
import { useGamification } from '@shared/contexts'
import type { UserProfile } from '@shared/types/gamification'

const PROFILE_OPTIONS: UserProfile[] = [
  'Clínica',
  'Med Spa',
  'Agência',
  'E-commerce',
  'Consultor',
]

const ADAPTATION_DELAY_MS = 2200

type OnboardingModalProps = {
  visible: boolean
}

export function OnboardingModal({ visible }: OnboardingModalProps) {
  const { setUserProfile } = useGamification()
  const [isAdapting, setIsAdapting] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!visible) {
      setIsAdapting(false)
      setSelectedProfile(null)
    }
  }, [visible])

  function handleSelectProfile(profile: UserProfile) {
    if (isAdapting) {
      return
    }

    setSelectedProfile(profile)
    setIsAdapting(true)

    setTimeout(() => {
      setUserProfile(profile)
      setIsAdapting(false)
    }, ADAPTATION_DELAY_MS)
  }

  return (
    <Modal visible={visible} animationType="fade" presentationStyle="fullScreen">
      <SafeAreaView className="flex-1 bg-deepBlue">
        <View className="flex-1 justify-center px-6">
          {isAdapting ? (
            <View className="items-center gap-6">
              <View className="h-16 w-16 items-center justify-center rounded-full border border-electricBlue/30 bg-electricBlue/10">
                <ActivityIndicator size="large" color="#3B82F6" />
              </View>
              <View className="items-center gap-2">
                <Text className="text-center text-xl font-semibold text-white">
                  Adaptando a inteligência para o seu perfil...
                </Text>
                <Text className="text-center text-sm text-white/50">
                  {selectedProfile}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View className="mb-10 items-center gap-3">
                <View className="flex-row items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
                  <Sparkles size={14} color="#F59E0B" />
                  <Text className="text-xs font-bold uppercase tracking-wider text-gold">
                    Summus Edge
                  </Text>
                </View>
                <Text className="text-center text-3xl font-bold leading-tight text-white">
                  Qual é o seu perfil de negócio?
                </Text>
                <Text className="max-w-sm text-center text-base leading-6 text-white/55">
                  Personalizamos missões, automações e insights para o seu modelo de crescimento.
                </Text>
              </View>

              <View className="gap-3">
                {PROFILE_OPTIONS.map((profile) => (
                  <Pressable
                    key={profile}
                    onPress={() => handleSelectProfile(profile)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 active:border-electricBlue/40 active:bg-white/10"
                  >
                    <Text className="text-center text-base font-semibold text-white">
                      {profile}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  )
}
