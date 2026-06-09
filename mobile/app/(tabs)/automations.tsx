import { useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { LucideIcon } from 'lucide-react-native'
import {
  Cpu,
  Filter,
  HeartPulse,
  Radar,
  Rocket,
  Settings,
  ShieldAlert,
  TrendingDown,
  Users,
  Zap,
} from 'lucide-react-native'

type AgentId =
  | 'marketing-therapist'
  | 'content-fatigue-predictor'
  | 'shadow-audience-analyzer'
  | 'strategic-virality-ai'
  | 'personal-brand-os'
  | 'microtrend-detector'
  | 'emotional-funnel-ai'
  | 'invisible-reputation-ai'

type AgentDefinition = {
  id: AgentId
  name: string
  description: string
  icon: LucideIcon
  metric: string
}

const AGENT_CATALOG: AgentDefinition[] = [
  {
    id: 'marketing-therapist',
    name: 'Marketing Therapist',
    description:
      'Analisa o tom emocional da sua comunicação, detecta sabotagem de posicionamento, perda de autoridade e sinais de burnout no seu conteúdo.',
    icon: HeartPulse,
    metric: 'Analisou 238 interações hoje',
  },
  {
    id: 'content-fatigue-predictor',
    name: 'Previsor de Fadiga de Conteúdo',
    description:
      'Prevê saturação visual e queda de retenção antes que aconteçam. Avisa quando sua audiência já reconheceu um padrão repetitivo.',
    icon: TrendingDown,
    metric: 'Monitorando 12 peças de conteúdo',
  },
  {
    id: 'shadow-audience-analyzer',
    name: 'Shadow Audience Analyzer',
    description:
      'Mapeia quem observa sem curtir, quem compra sem comentar e a intenção silenciosa da sua audiência invisível.',
    icon: Users,
    metric: 'Detectou 6 intenções silenciosas',
  },
  {
    id: 'strategic-virality-ai',
    name: 'IA de Viralidade Estratégica',
    description:
      'Equilibra alcance, autoridade e conversão. Gera conteúdo viral que atrai o público certo sem destruir sua percepção premium.',
    icon: Rocket,
    metric: 'Otimizou 3 posts para alcance',
  },
  {
    id: 'personal-brand-os',
    name: 'Sistema Operacional de Marca Pessoal',
    description:
      'O CEO invisível da sua marca. Planeja conteúdo, agenda estrategicamente, responde comentários e monitora concorrentes 24/7.',
    icon: Cpu,
    metric: '12 tarefas executadas hoje',
  },
  {
    id: 'microtrend-detector',
    name: 'Detector de Microtendências',
    description:
      'Detecta comportamentos visuais emergentes e gírias em nichos específicos antes de viralizarem no mercado (Sinal de tendência local).',
    icon: Radar,
    metric: '3 microtendências identificadas',
  },
  {
    id: 'emotional-funnel-ai',
    name: 'Emotional Funnel AI',
    description:
      'Adapta copy, cores e CTAs em tempo real, baseando-se na insegurança, excitação ou desejo de pertencimento do lead.',
    icon: Filter,
    metric: 'Adaptou 8 funis em tempo real',
  },
  {
    id: 'invisible-reputation-ai',
    name: 'IA de Reputação Invisível',
    description:
      'Mapeia o desgaste silencioso da marca. Detecta percepções coletivas como arrogância, excesso de venda ou perda de autenticidade.',
    icon: ShieldAlert,
    metric: 'Varredura de reputação em andamento',
  },
]

type ActiveAgentCardProps = {
  agent: AgentDefinition
  onPause: () => void
  onConfigure: () => void
}

function ActiveAgentCard({ agent, onPause, onConfigure }: ActiveAgentCardProps) {
  const Icon = agent.icon

  return (
    <View className="mr-4 w-72 rounded-3xl border border-summus-700 bg-summus-900 p-5">
      <View className="flex-row items-start justify-between gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-electric-600/20">
          <Icon size={22} color="#38BDF8" />
        </View>
        <View className="rounded-full bg-emerald-500/15 px-2.5 py-1">
          <Text className="text-xs font-semibold text-emerald-400">🟢 Online</Text>
        </View>
      </View>

      <Text className="mt-4 text-lg font-bold text-white">{agent.name}</Text>
      <Text className="mt-2 text-sm leading-5 text-gray-400">{agent.metric}</Text>

      <View className="mt-5 flex-row gap-2">
        <Pressable
          onPress={onPause}
          className="flex-1 rounded-2xl border border-summus-600 py-2.5 active:opacity-70"
        >
          <Text className="text-center text-sm font-semibold text-slate-300">Pausar</Text>
        </Pressable>
        <Pressable
          onPress={onConfigure}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl border border-summus-600 py-2.5 active:opacity-70"
        >
          <Settings size={14} color="#94A3B8" />
          <Text className="text-sm font-semibold text-slate-300">Configurar</Text>
        </Pressable>
      </View>
    </View>
  )
}

type AvailableAgentCardProps = {
  agent: AgentDefinition
  onActivate: () => void
}

function AvailableAgentCard({ agent, onActivate }: AvailableAgentCardProps) {
  const Icon = agent.icon

  return (
    <View className="rounded-3xl border border-summus-700 bg-summus-900 p-5">
      <View className="flex-row items-start gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-electric-600/15">
          <Icon size={26} color="#0EA5E9" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-white">{agent.name}</Text>
          <Text className="mt-1.5 text-sm leading-5 text-gray-400">{agent.description}</Text>
        </View>
      </View>

      <Pressable
        onPress={onActivate}
        className="mt-5 rounded-2xl bg-blue-600 py-3.5 active:bg-blue-500"
      >
        <Text className="text-center text-sm font-bold text-white">Ativar Agente</Text>
      </Pressable>
    </View>
  )
}

export default function AutomationsScreen() {
  const [activeAgentIds, setActiveAgentIds] = useState<AgentId[]>(['marketing-therapist'])

  const activeAgents = AGENT_CATALOG.filter((agent) => activeAgentIds.includes(agent.id))
  const availableAgents = AGENT_CATALOG.filter((agent) => !activeAgentIds.includes(agent.id))

  function activateAgent(agent: AgentDefinition) {
    setActiveAgentIds((current) => [...current, agent.id])
    Alert.alert(
      'Agente Ativado!',
      `${agent.name} ativado! Ele já está analisando seus dados em background.`,
    )
  }

  function pauseAgent(agent: AgentDefinition) {
    setActiveAgentIds((current) => current.filter((id) => id !== agent.id))
    Alert.alert('Agente Pausado', `O ${agent.name} foi movido de volta para a loja.`)
  }

  function configureAgent(agent: AgentDefinition) {
    Alert.alert('Configurações', `Personalize o ${agent.name} em breve.`)
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-5 pb-10 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <View className="self-start rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5">
            <Text className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Level 5 Unlocked: Automations
            </Text>
          </View>

          <Text className="text-3xl font-bold text-white">AI Workforce</Text>
          <Text className="text-base leading-6 text-gray-400">
            Contrate agentes inteligentes para escalar sua operação 24/7.
          </Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-white">Sua Equipe Ativa</Text>
            <View className="rounded-full bg-summus-800 px-2.5 py-1">
              <Text className="text-xs font-medium text-slate-400">
                {activeAgents.length} agente{activeAgents.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          {activeAgents.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="pr-5"
              nestedScrollEnabled
            >
              {activeAgents.map((agent) => (
                <ActiveAgentCard
                  key={agent.id}
                  agent={agent}
                  onPause={() => pauseAgent(agent)}
                  onConfigure={() => configureAgent(agent)}
                />
              ))}
            </ScrollView>
          ) : (
            <View className="rounded-3xl border border-dashed border-summus-700 bg-summus-900/50 p-6">
              <Text className="text-center text-sm text-gray-400">
                Nenhum agente ativo. Ative um agente na loja abaixo para começar.
              </Text>
            </View>
          )}
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-white">Loja de Agentes</Text>
            <View className="flex-row items-center gap-1 rounded-full bg-electric-600/15 px-2.5 py-1">
              <Zap size={12} color="#38BDF8" />
              <Text className="text-xs font-medium text-electric-400">Ativar com 1 Clique</Text>
            </View>
          </View>

          <View className="gap-4">
            {availableAgents.map((agent) => (
              <AvailableAgentCard
                key={agent.id}
                agent={agent}
                onActivate={() => activateAgent(agent)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
