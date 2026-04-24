import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Landing } from './screens/Landing'
import { CommandDeck } from './screens/CommandDeck'
import { ModuleShell } from './screens/ModuleShell'
import { ToastProvider } from './components/system/Toast'
import { ModalProvider } from './components/system/Modal'
import { CommandPalette } from './components/system/CommandPalette'
import { useRouter, type View } from './hooks/useRouter'
import type { ModuleKey } from './routes'

export type { ModuleKey } from './routes'

const MODULE_KEYS: ModuleKey[] = ['command', 'fusion', 'brain', 'blockchain', 'radar', 'forensics', 'copilot', 'defense', 'global', 'governance', 'academy']
const isModule = (v: View): v is ModuleKey => (MODULE_KEYS as string[]).includes(v as string)

export default function App() {
  const { view, go } = useRouter()
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Global hotkey: ⌘K / Ctrl-K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(p => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ToastProvider>
      <ModalProvider>
        <div className="flex h-full w-full flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {view === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                <Landing
                  onEnter={() => go('deck')}
                  onNavigateModule={(m) => go(m)}
                  onOpenCommand={() => setPaletteOpen(true)}
                />
              </motion.div>
            )}
            {view === 'deck' && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <CommandDeck onSelect={(k) => go(k)} onHome={() => go('landing')} />
              </motion.div>
            )}
            {isModule(view) && (
              <motion.div
                key={'mod-' + view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full w-full"
              >
                <ModuleShell
                  active={view}
                  setActive={(k) => go(k)}
                  onHome={() => go('landing')}
                  onDeck={() => go('deck')}
                  onOpenCommand={() => setPaletteOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onNavigate={(v) => go(v)}
        />
      </ModalProvider>
    </ToastProvider>
  )
}
