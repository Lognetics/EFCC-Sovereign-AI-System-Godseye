import { ReactNode } from 'react'

export function Panel({
  title,
  icon,
  tag,
  children,
  actions,
  className = '',
  padded = true,
  scroll = false,
  variant
}: {
  title?: ReactNode
  icon?: ReactNode
  tag?: ReactNode
  children: ReactNode
  actions?: ReactNode
  className?: string
  padded?: boolean
  scroll?: boolean
  variant?: 'default' | 'critical' | 'muted'
}) {
  const accent = variant === 'critical' ? 'before:!bg-[linear-gradient(135deg,rgba(239,68,68,0.45),transparent_30%,transparent_70%,rgba(239,68,68,0.25))]' : ''
  return (
    <section className={'panel relative flex flex-col ' + accent + ' ' + className}>
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />

      {(title || actions || tag) && (
        <header className="panel-header">
          <div className="panel-title">
            {icon && <span className="text-cyber-400">{icon}</span>}
            {title && <span className="text-cyber-200">{title}</span>}
            {tag}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}

      <div className={(padded ? 'p-4 ' : '') + (scroll ? 'overflow-auto ' : '') + 'relative flex-1'}>{children}</div>
    </section>
  )
}

export function InlineStat({
  label,
  value,
  sub,
  tone = 'default'
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
  tone?: 'default' | 'danger' | 'warn' | 'ok' | 'violet'
}) {
  const toneMap = {
    default: 'text-cyber-200',
    danger: 'text-red-300',
    warn: 'text-amber-300',
    ok: 'text-emerald-300',
    violet: 'text-violet-300'
  }
  return (
    <div className="flex flex-col gap-0.5">
      <div className="stat-label">{label}</div>
      <div className={'font-display text-[22px] font-bold leading-none tracking-tight ' + toneMap[tone]} style={{ textShadow: '0 0 18px rgba(34,211,238,0.25)' }}>
        {value}
      </div>
      {sub && <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{sub}</div>}
    </div>
  )
}
