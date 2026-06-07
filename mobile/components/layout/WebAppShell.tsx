import type { ReactNode } from 'react'
import { SummusAppShell } from './SummusAppShell'

type WebAppShellProps = {
  children: ReactNode
}

/** @deprecated Use SummusAppShell */
export function WebAppShell({ children }: WebAppShellProps) {
  return <SummusAppShell>{children}</SummusAppShell>
}
