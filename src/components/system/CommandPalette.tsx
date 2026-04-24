import { AnimatePresence, motion } from 'framer-motion'
import { Search, ChevronRight, Zap } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MODULES, type ModuleKey } from '../../routes'
import { ALERTS, CASES, ENTITIES } from '../../data/mockData'

interface Item { id: string; group: string; title: string; sub?: string; tone?: string; action: () => void }

export function CommandPalette({ open, onClose, onNavigate }: {
  open: boolean
  onClose: () => void
  onNavigate: (view: 'landing' | 'deck' | ModuleKey) => void
}) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 60) }
  }, [open])

  const all: Item[] = useMemo(() => {
    const items: Item[] = []
    items.push({ id: 'n-landing', group: 'NAVIGATE', title: 'Landing page', sub: 'Return to cinematic home', action: () => onNavigate('landing') })
    items.push({ id: 'n-deck',    group: 'NAVIGATE', title: 'Command Deck (3D)', sub: 'Spatial module launcher', action: () => onNavigate('deck') })
    for (const m of MODULES) items.push({ id: 'n-' + m.key, group: 'NAVIGATE', title: m.title, sub: m.blurb, tone: m.accent, action: () => onNavigate(m.key) })

    for (const a of ALERTS) items.push({ id: 'a-' + a.id, group: 'ALERTS',   title: a.title, sub: a.entity + ' · ' + a.module + ' · ' + a.severity, tone: a.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b', action: () => onNavigate('command') })
    for (const c of CASES)  items.push({ id: 'c-' + c.id, group: 'CASES',    title: c.code + ' · ' + c.title, sub: c.lead + ' · ' + c.stage,                                              action: () => onNavigate('command') })
    for (const e of ENTITIES.slice(0, 10)) items.push({ id: 'e-' + e.id, group: 'ENTITIES', title: e.name, sub: e.kind + ' · ' + (e.location ?? '—') + ' · ' + e.risk, action: () => onNavigate('fusion') })
    return items
  }, [onNavigate])

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim()
    if (!needle) return all.slice(0, 40)
    return all.filter(i =>
      i.title.toLowerCase().includes(needle) ||
      (i.sub ?? '').toLowerCase().includes(needle) ||
      i.group.toLowerCase().includes(needle)
    ).slice(0, 50)
  }, [q, all])

  useEffect(() => { setSel(s => Math.min(s, Math.max(0, filtered.length - 1))) }, [filtered.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(0, s - 1)) }
      if (e.key === 'Enter')     { const item = filtered[sel]; if (item) { item.action(); onClose() } }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, sel, onClose])

  const groups = useMemo(() => {
    const m = new Map<string, Item[]>()
    for (const i of filtered) { const g = m.get(i.group) ?? []; g.push(i); m.set(i.group, g) }
    return Array.from(m.entries())
  }, [filtered])

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[115] flex items-start justify-center bg-black/70 backdrop-blur-[6px] pt-[14vh]"
          onClick={onClose}>
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -24, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={e => e.stopPropagation()}
            className="relative w-[640px] max-w-[94vw] overflow-hidden rounded-lg border border-cyber-500/50 bg-ink-900/95 shadow-[0_40px_80px_-20px_#000]"
          >
            <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />

            <div className="flex items-center gap-3 border-b border-cyber-500/20 px-4 py-3">
              <Search className="h-4 w-4 text-cyber-300" />
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search entities, wallets, BVN, cases, modules, alerts…"
                className="flex-1 bg-transparent font-mono text-[13px] text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
              <span className="flex items-center gap-1 rounded-sm border border-cyber-500/20 bg-cyber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-cyber-300">esc</span>
            </div>

            <div className="max-h-[52vh] overflow-auto py-1">
              {groups.length === 0 && (
                <div className="px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-slate-500">No matches — try another term</div>
              )}
              {groups.map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 pt-3 pb-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-slate-600">{group}</div>
                  {items.map(item => {
                    const idx = filtered.indexOf(item)
                    const active = idx === sel
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setSel(idx)}
                        onClick={() => { item.action(); onClose() }}
                        className={'group flex w-full items-center gap-3 px-4 py-2 text-left transition ' + (active ? 'bg-cyber-500/10' : 'hover:bg-white/5')}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ background: item.tone ?? '#22d3ee', boxShadow: active ? `0 0 8px ${item.tone ?? '#22d3ee'}` : undefined }} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] text-slate-100">{item.title}</span>
                          {item.sub && <span className="block truncate font-mono text-[10px] text-slate-500">{item.sub}</span>}
                        </span>
                        <ChevronRight className={'h-3.5 w-3.5 transition ' + (active ? 'text-cyber-300' : 'text-slate-600 group-hover:text-cyber-300')} />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-cyber-500/20 bg-ink-900/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2"><Zap className="h-3 w-3 text-cyber-400" /> {filtered.length} results</span>
              <span>↑↓ navigate · ↵ select · esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
