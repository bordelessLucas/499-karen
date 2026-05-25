import type { ReactNode } from 'react'
import { Modal, Pressable, ScrollView, View } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

type ResponsiveDialogProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
  maxWidthClassName?: string
}

export function ResponsiveDialog({
  visible,
  onClose,
  children,
  maxWidthClassName = 'max-w-xl',
}: ResponsiveDialogProps) {
  const { isWebDesktop } = useResponsiveLayout()

  return (
    <Modal
      visible={visible}
      animationType={isWebDesktop ? 'fade' : 'slide'}
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        className={[
          'flex-1 bg-slate-900/40',
          isWebDesktop ? 'items-center justify-center p-6' : 'justify-end',
        ].join(' ')}
        onPress={onClose}
      >
        <Pressable
          className={[
            'bg-white p-6',
            isWebDesktop
              ? `max-h-[90%] w-full ${maxWidthClassName} rounded-3xl`
              : 'max-h-[85%] rounded-t-3xl',
          ].join(' ')}
          onPress={(event) => event.stopPropagation()}
        >
          <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
