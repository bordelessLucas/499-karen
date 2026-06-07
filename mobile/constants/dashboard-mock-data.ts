export const dashboardMockData = {
  user: {
    firstName: 'Sarah',
    displayName: 'Sarah Johnson',
    planLabel: 'Elite Plan',
  },
  aiCoach: {
    opportunitiesCount: 3,
    potentialRevenue: 8750,
    quickActions: [
      {
        id: '1',
        title: 'Follow up with 3 hot leads',
        subtitle: 'Potential: +$2,400',
        icon: 'users' as const,
      },
      {
        id: '2',
        title: 'Your website conversion dropped 12%',
        subtitle: 'Fix now to recover ~$1,800/mo',
        icon: 'trend' as const,
      },
      {
        id: '3',
        title: 'Send proposal to Acme Corp',
        subtitle: 'Potential: +$5,200',
        icon: 'file' as const,
      },
    ],
  },
  businessHealth: {
    score: 92,
    maxScore: 100,
    categories: [
      { label: 'Marketing', value: 88, color: '#10B981' },
      { label: 'Sales', value: 76, color: '#F59E0B' },
      { label: 'Follow-up', value: 94, color: '#10B981' },
      { label: 'Website', value: 68, color: '#F59E0B' },
      { label: 'Automation', value: 85, color: '#10B981' },
    ],
  },
  growthMission: {
    title: "Today's Growth Mission",
    mission: 'Close 3 new leads',
    potentialImpact: 4200,
  },
  learnFlow: {
    currentStep: 2,
    lessonProgress: 60,
    steps: [
      { id: '1', label: 'Learn', icon: 'play' as const },
      { id: '2', label: 'Implement', icon: 'wand' as const, badge: 'AI Ready' },
      { id: '3', label: 'Track Results', icon: 'chart' as const },
    ],
  },
  bookings: {
    appointmentsToday: 8,
    estimatedRevenue: 6240,
    items: [
      { id: '1', time: '9:00 AM', name: 'Marcus Chen', service: 'Strategy Call', status: 'Confirmed' },
      { id: '2', time: '11:30 AM', name: 'Lisa Park', service: 'Discovery Session', status: 'Confirmed' },
      { id: '3', time: '2:00 PM', name: 'David Ortiz', service: 'Proposal Review', status: 'Confirmed' },
    ],
  },
  revenue: {
    amount: 12450,
    changePercent: 18,
    periodLabel: 'vs last week',
  },
  eliteUnlock: {
    title: 'New Strategic Asset Available',
    description: 'Open now to claim your reward and unlock exclusive growth tools.',
  },
} as const
