export type { MockUser } from './auth'
export type { Client, ClientStatus } from './client'
export type {
  CategoryFilter,
  KanbanCard,
  KanbanColumn,
  TaskCategory,
  TaskPriority,
} from './crm'
export type {
  BusinessHealthCategoryKey,
  BusinessHealthScores,
  CompanyTier,
  GamificationEconomy,
  GamificationLevel,
  GamificationProgress,
  GamificationStats,
  MissionImpactCategory,
  RecentActivityItem,
  UserGamificationState,
} from './gamification'
export type {
  ClientWithPipeline,
  KanbanCardWithClient,
  LinkedCrmSnapshot,
} from '../utils/link-crm-clients'