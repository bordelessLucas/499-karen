import type { ComponentType } from 'react'
import { Platform } from 'react-native'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import { CrmKanbanMobile } from './CrmKanbanMobile'
import type { KanbanCardWithClient, KanbanColumn } from '@shared/types'

export type CrmKanbanBoardProps = {
  columns: KanbanColumn[]
  cards: KanbanCardWithClient[]
  onCardPress: (card: KanbanCardWithClient) => void
  onMoveCard: (cardId: string, targetColumnId: string, targetIndex?: number) => void
  activeDragCardId: string | null
  onDragStart: (cardId: string) => void
  onDragEnd: () => void
  overColumnId?: string | null
  onDragOver?: (columnId: string | null) => void
}

type DesktopBoardModule = {
  CrmKanbanDesktop: ComponentType<CrmKanbanBoardProps>
}

const desktopBoard =
  Platform.OS === 'web'
    ? (require('./CrmKanbanDesktop.web') as DesktopBoardModule)
    : null

export function CrmKanbanBoard(props: CrmKanbanBoardProps) {
  const { isWebDesktop } = useResponsiveLayout()

  if (Platform.OS === 'web' && isWebDesktop && desktopBoard) {
    return <desktopBoard.CrmKanbanDesktop {...props} />
  }

  return (
    <CrmKanbanMobile
      columns={props.columns}
      cards={props.cards}
      onCardPress={props.onCardPress}
      onMoveCard={props.onMoveCard}
    />
  )
}
