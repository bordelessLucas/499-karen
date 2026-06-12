import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LogOut, Send, Settings2, Sparkles } from 'lucide-react-native'
import { useAuth, useGamification } from '@shared/contexts'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const QUICK_COMMANDS = [
  'Preciso de um anúncio para Instagram',
  'Reativar leads inativos',
  'Melhorar a headline do meu site',
  'Criar sequência de follow-up',
]

const COMMAND_ACTION_MAP: Record<string, string> = {
  'reativar leads': 'reactivate-inactive-leads',
  headline: 'rewrite-headline',
  'anúncio': 'rewrite-headline',
  'follow-up': 'follow-up-leads',
  'automação': 'configure-crm',
}

function resolveActionId(input: string): string | null {
  const normalized = input.toLowerCase()

  for (const [keyword, actionId] of Object.entries(COMMAND_ACTION_MAP)) {
    if (normalized.includes(keyword)) {
      return actionId
    }
  }

  return null
}

function buildAssistantReply(input: string, didExecute: boolean): string {
  if (didExecute) {
    return 'Perfeito. A equipe de IA já está executando isso. O progresso aparecerá na sua Home em instantes.'
  }

  return 'Entendi o pedido. Posso começar agora — confirme com mais detalhes ou use um dos atalhos abaixo.'
}

export default function ConversationsScreen() {
  const { isWebDesktop } = useResponsiveLayout()
  const { signOutUser } = useAuth()
  const { executeAction, userProfile } = useGamification()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Comande ações em linguagem natural. Ex: "Preciso de um anúncio para captar leads esta semana."',
    },
  ])

  function appendMessage(role: ChatMessage['role'], text: string) {
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-${role}`, role, text },
    ])
  }

  function handleSend(command?: string) {
    const text = (command ?? input).trim()
    if (!text) {
      return
    }

    appendMessage('user', text)
    setInput('')

    const actionId = resolveActionId(text)
    if (actionId) {
      executeAction(actionId)
    }

    setTimeout(() => {
      appendMessage('assistant', buildAssistantReply(text, actionId !== null))
    }, 600)
  }

  function handleSignOut() {
    Alert.alert('Sair da conta', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => void signOutUser() },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View
          className={[
            'flex-1',
            isWebDesktop ? 'px-8' : 'px-5',
          ].join(' ')}
        >
          <View className="gap-2 pb-4 pt-4">
            <View className="flex-row items-center gap-2">
              <Sparkles size={16} color="#F59E0B" />
              <Text className="text-xs font-bold uppercase tracking-wider text-gold">
                Conversas & Ajustes
              </Text>
            </View>
            <Text className="text-2xl font-bold text-deepBlue">Comande o crescimento</Text>
            <Text className="text-sm leading-5 text-slate-500">
              Descreva o que precisa. A IA executa e devolve o resultado para a Home.
            </Text>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-3 pb-4"
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                className={[
                  'max-w-[90%] rounded-2xl px-4 py-3',
                  message.role === 'user'
                    ? 'self-end bg-electricBlue'
                    : 'self-start border border-slate-200 bg-white',
                ].join(' ')}
              >
                <Text
                  className={[
                    'text-sm leading-5',
                    message.role === 'user' ? 'text-white' : 'text-deepBlue',
                  ].join(' ')}
                >
                  {message.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View className="gap-3 pb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2"
            >
              {QUICK_COMMANDS.map((command) => (
                <Pressable
                  key={command}
                  onPress={() => handleSend(command)}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-2 active:bg-slate-50"
                >
                  <Text className="text-xs font-medium text-slate-600">{command}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder='Ex: "Preciso de um anúncio..."'
                placeholderTextColor="#94A3B8"
                className="flex-1 py-2 text-sm text-deepBlue"
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
              />
              <Pressable
                onPress={() => handleSend()}
                className="rounded-xl bg-electricBlue p-2.5 active:opacity-80"
              >
                <Send size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            <View className="rounded-2xl border border-slate-200 bg-white p-4">
              <View className="mb-3 flex-row items-center gap-2">
                <Settings2 size={16} color="#64748B" />
                <Text className="text-sm font-semibold text-deepBlue">Ajustes rápidos</Text>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                  <Text className="text-sm text-slate-600">Perfil de negócio</Text>
                  <Text className="text-sm font-semibold text-deepBlue">
                    {userProfile ?? 'Não definido'}
                  </Text>
                </View>
                <Pressable
                  onPress={handleSignOut}
                  className="flex-row items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 active:bg-slate-50"
                >
                  <LogOut size={14} color="#64748B" />
                  <Text className="text-sm font-medium text-slate-600">Sair da conta</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
