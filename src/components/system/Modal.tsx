import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

interface ModalProps {
  title: ReactNode
  body: ReactNode
  footer?: ReactNode
  width?: number
  tone?: 'default' | 'danger' | 'violet' | 'amber'
}

interface Api { open: (m: ModalProps) => void; close: () => void }
const Ctx = createContext<Api | null>(null)

export function useModal() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useModal outside ModalProvider')
  return ctx
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [m, setM] = useState<ModalProps | null>(null)
  const open  = useCallback((x: ModalProps) => setM(x), [])
  const close = useCallback(() => setM(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const toneBorder = m?.tone === 'danger'
    ? 'border-red-500/50'
    : m?.tone === 'violet'
      ? 'border-violet-500/50'
      : m?.tone === 'amber'
        ? 'border-amber-500/50'
        : 'border-cyber-500/40'

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {m && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-[6px]"
            onClick={close}
          >
            <motion.div
              key="dialog"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className={'relative max-h-[88vh] w-[92vw] overflow-hidden rounded-lg border ' + toneBorder + ' bg-ink-800/95 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl'}
              style={{ maxWidth: (m.width ?? 720) + 'px' }}
            >
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />

              <header className="flex items-center justify-between border-b border-cyber-500/20 px-4 py-3">
                <div className="min-w-0 flex-1 font-display text-[13px] uppercase tracking-widest text-cyber-200">{m.title}</div>
                <button onClick={close} className="rounded-sm p-1 text-slate-400 hover:bg-white/5 hover:text-cyber-200">
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="max-h-[70vh] overflow-auto p-5">{m.body}</div>

              {m.footer && <footer className="flex items-center justify-end gap-2 border-t border-cyber-500/20 bg-ink-900/60 px-4 py-2.5">{m.footer}</footer>}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-400/60 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
