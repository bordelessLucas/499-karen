import type { ReactNode } from 'react'

type PageHeaderProps = {
  badge?: string
  title: string
  description: string
  action?: ReactNode
}

export function PageHeader({ badge, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {badge ? (
          <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
            {badge}
          </span>
        ) : null}
        <h1 className={`font-semibold text-slate-900 ${badge ? 'mt-4' : ''} text-3xl`}>
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
