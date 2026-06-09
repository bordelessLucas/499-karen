import { useState, type ReactNode } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { Menu, X } from 'lucide-react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { SummusNavigation } from './SummusNavigation'

type SummusAppShellProps = {
  children: ReactNode
}

export function SummusAppShell({ children }: SummusAppShellProps) {
  const { width } = useResponsiveLayout()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const showPersistentSidebar = width >= 768

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <View className="min-h-full flex-1 flex-row bg-deepBlue">
      {showPersistentSidebar ? (
        <View className="h-full shrink-0 self-stretch">
          <SummusNavigation />
        </View>
      ) : null}

      <View className="relative min-h-full flex-1 bg-[#F8FAFC]">
        {!showPersistentSidebar ? (
          <View className="absolute left-4 top-12 z-20">
            <Pressable
              onPress={() => setIsMobileMenuOpen(true)}
              className="rounded-xl border border-white/20 bg-deepBlue p-2.5"
            >
              <Menu size={20} color="#F59E0B" />
            </Pressable>
          </View>
        ) : null}

        <View className={['min-h-full flex-1', !showPersistentSidebar ? 'pt-14' : ''].join(' ')}>
          {children}
        </View>
      </View>

      {!showPersistentSidebar ? (
        <Modal
          visible={isMobileMenuOpen}
          animationType="slide"
          transparent
          onRequestClose={closeMobileMenu}
        >
          <View className="flex-1 flex-row bg-black/50">
            <View className="h-full">
              <SummusNavigation onNavigate={closeMobileMenu} />
            </View>
            <Pressable className="flex-1" onPress={closeMobileMenu}>
              <View className="flex-1 items-start pl-2 pt-14">
                <View className="rounded-full bg-white/10 p-2">
                  <X size={18} color="#94A3B8" />
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
      ) : null}
    </View>
  )
}
