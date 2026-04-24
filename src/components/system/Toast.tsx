import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

type ToastKind = 'info' | 'success' | 'warn' | 'danger'
interface Toast { id: string; kind: ToastKind; title: string; body?: string; ttl: number }

interface Api {
  push: (t: Omit<Toast, 'id' | 'ttl'> & { ttl?: number }) => void
  info:    (title: string, body?: string) => void
  success: (title: string, body?: string) => void
  warn:    (title: string, body?: string) => void
  danger:  (title: string, body?: string) => void
}
const Ctx = createContext<Api | null>(null)

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast outside ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Toast[]>([])
  const timers = useRef<Record<string, number>>({})

  const remove = useCallback((id: string) => {
    setQueue(q => q.filter(t => t.id !== id))
    const h = timers.current[id]
    if (h) clearTimeout(h)
    delete timers.current[id]
  }, [])

  const push: Api['push'] = useCallback((t) => {
    const id = Math.random().toString(36).slice(2, 10)
    const ttl = t.ttl ?? 4200
    setQueue(q => [...q, { id, ttl, kind: t.kind, title: t.title, body: t.body }])
    timers.current[id] = window.setTimeout(() => remove(id), ttl)
  }, [remove])

  useEffect(() => () => Object.values(timers.current).forEach(h => clearTimeout(h)), [])

  const api: Api = {
    push,
    info:    (title, body) => push({ kind: 'info',    title, body }),
    success: (title, body) => push({ kind: 'success', title, body }),
    warn:    (title, body) => push({ kind: 'warn',    title, body }),
    danger:  (title, body) => push({ kind: 'danger',  title, body })
  }

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-2">
        <AnimatePresence initial={false}>
          {queue.map(t => (
            <ToastRow key={t.id} t={t} onClose={() => remove(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}

function ToastRow({ t, onClose }: { t: Toast; onClose: () => void }) {
  const tone =
    t.kind === 'danger'  ? { border: 'border-red-500/50',     bg: 'bg-red-500/10',     text: 'text-red-200',    icon: <AlertTriangle className="h-4 w-4 text-red-300" /> } :
    t.kind === 'warn'    ? { border: 'border-amber-500/50',   bg: 'bg-amber-500/10',   text: 'text-amber-200',  icon: <AlertTriangle className="h-4 w-4 text-amber-300" /> } :
    t.kind === 'success' ? { border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-200',icon: <CheckCircle2 className="h-4 w-4 text-emerald-300" /> } :
                            { border: 'border-cyber-500/50',   bg: 'bg-cyber-500/10',   text: 'text-cyber-100',  icon: <Info className="h-4 w-4 text-cyber-300" /> }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={'pointer-events-auto relative w-[320px] overflow-hidden rounded-md border ' + tone.border + ' ' + tone.bg + ' backdrop-blur-md'}
    >
      <div className="flex items-start gap-3 p-3">
        <div className="mt-0.5">{tone.icon}</div>
        <div className="flex-1">
          <div className={'font-display text-[12.5px] font-semibold ' + tone.text}>{t.title}</div>
          {t.body && <div className="mt-0.5 text-[11px] leading-snug text-slate-300">{t.body}</div>}
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-200">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: t.ttl / 1000, ease: 'linear' }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyber-500 to-cyber-300"
      />
    </motion.div>
  )
}
