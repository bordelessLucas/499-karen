import type { ReactNode } from 'react'
import { View } from 'react-native'

type SummusCardProps = {
  children: ReactNode
  className?: string
}

export function SummusCard({ children, className = '' }: SummusCardProps) {
  return (
    <View
      className={['rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm', className].join(' ')}
      style={{
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {children}
    </View>
  )
}

export function SummusDarkCard({ children, className = '' }: SummusCardProps) {
  return (
    <View
      className={['overflow-hidden rounded-3xl border border-summus-700 bg-summus-900 p-6', className].join(' ')}
    >
      {children}
    </View>
  )
}
