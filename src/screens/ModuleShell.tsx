import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '../components/layout/Sidebar'
import { StatusBar } from '../components/layout/StatusBar'
import { CommandCenter } from '../modules/CommandCenter'
import { DataFusion } from '../modules/DataFusion'
import { AIBrain } from '../modules/AIBrain'
import { Blockchain } from '../modules/Blockchain'
import { RealTimeRadar } from '../modules/RealTimeRadar'
import { Forensics } from '../modules/Forensics'
import { Copilot } from '../modules/Copilot'
import { Defense } from '../modules/Defense'
import { GlobalBridge } from '../modules/GlobalBridge'
import { Governance } from '../modules/Governance'
import { Academy } from '../modules/Academy'
import type { ModuleKey } from '../routes'

export function ModuleShell({ active, setActive, onHome, onDeck, onOpenCommand }: {
  active: ModuleKey
  setActive: (k: ModuleKey) => void
  onHome: () => void
  onDeck: () => void
  onOpenCommand: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full w-full flex-col overflow-hidden"
    >
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar active={active} setActive={setActive} onHome={onHome} onDeck={onDeck} />
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col"
            >
              <ModuleRouter active={active} onOpenCommand={onOpenCommand} />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyber-500/5 via-transparent to-transparent" />
        </main>
      </div>
      <StatusBar />
    </motion.div>
  )
}

function ModuleRouter({ active, onOpenCommand }: { active: ModuleKey; onOpenCommand: () => void }) {
  switch (active) {
    case 'command':    return <CommandCenter onOpenCommand={onOpenCommand} />
    case 'fusion':     return <DataFusion />
    case 'brain':      return <AIBrain />
    case 'blockchain': return <Blockchain />
    case 'radar':      return <RealTimeRadar />
    case 'forensics':  return <Forensics />
    case 'copilot':    return <Copilot />
    case 'defense':    return <Defense />
    case 'global':     return <GlobalBridge />
    case 'governance': return <Governance />
    case 'academy':    return <Academy />
  }
}
