import type { ReactNode } from 'react'
import type { Alert, Case, Entity, Transaction } from '../../data/mockData'
import { formatNaira, riskColor, riskTextClass } from '../../data/mockData'
import { ArrowRight, Clock, FileText, Fingerprint, Link2, Layers, MapPin, Network } from 'lucide-react'

// --------------------- Alert detail ----------------------------
export function alertDetail(a: Alert, actions: { onEscalate: () => void; onFreeze: () => void; onOpenCase: () => void; onDispatch: () => void }) {
  return {
    title: <span>Alert · {a.id} <span className="ml-2 font-mono text-slate-500">[{a.severity}]</span></span>,
    body: (
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className={'font-display text-[18px] leading-snug ' + riskTextClass(a.severity)}>{a.title}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              {a.module} · {a.entity} · {a.ts}
            </div>
          </div>
          <div className="text-right">
            <div className="stat-label">confidence</div>
            <div className="font-display text-[28px] font-bold text-cyber-200">{a.confidence}<span className="text-slate-500 text-[18px]">%</span></div>
          </div>
        </div>

        <div className="rounded-md border border-white/5 bg-white/[0.02] p-3 text-[12.5px] leading-relaxed text-slate-300">
          {a.summary}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <InfoTile label="Severity" value={a.severity} tone={riskColor(a.severity)} />
          <InfoTile label="Module"   value={a.module} />
          <InfoTile label="Entity"   value={a.entity} />
          <InfoTile label="Observed" value={a.ts} />
        </div>

        <div className="mt-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Recommended actions</div>
          <ul className="space-y-1.5 text-[12px] text-slate-300">
            <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-cyber-400" /> Preserve evidence on all connected accounts</li>
            <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-cyber-400" /> Notify assigned case officer within 1 hour</li>
            <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-cyber-400" /> Cross-reference with active sanctions lists</li>
            <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-cyber-400" /> Request preservation order if cross-border</li>
          </ul>
        </div>
      </div>
    ),
    footer: (
      <>
        <button onClick={actions.onDispatch}  className="btn-hud">Dispatch field team</button>
        <button onClick={actions.onFreeze}    className="btn-hud">Freeze related accounts</button>
        <button onClick={actions.onOpenCase}  className="btn-hud">Link to case</button>
        <button onClick={actions.onEscalate}  className="btn-hud btn-hud-danger">Escalate to DCP</button>
      </>
    ),
    width: 760,
    tone: a.severity === 'CRITICAL' ? 'danger' as const : 'violet' as const
  }
}

// --------------------- Case detail ----------------------------
export function caseDetail(c: Case, actions: { onAssign: () => void; onReport: () => void; onClose: () => void }) {
  return {
    title: <span>{c.code} <span className="ml-2 font-mono text-slate-500 text-[11px]">{c.id}</span></span>,
    body: (
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className={'font-display text-[18px] ' + riskTextClass(c.priority)}>{c.title}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              Lead: {c.lead} · Opened {c.opened}
            </div>
          </div>
          <span className="chip chip-violet">{c.stage}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <InfoTile label="Entities"  value={c.entities.toString()} icon={<Network className="h-3 w-3" />} />
          <InfoTile label="Value"      value={formatNaira(c.value)}  tone={riskColor(c.priority)} />
          <InfoTile label="Progress"   value={c.progress + '%'} />
          <InfoTile label="Last update" value={c.lastUpdate} icon={<Clock className="h-3 w-3" />} />
        </div>

        <div className="mt-5 rounded-md border border-white/5 bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span>Progress</span><span>{c.progress}% to prosecution</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: c.progress + '%' }} />
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Open sub-tasks</div>
          <ul className="space-y-1.5">
            {[
              'File preservation order · FCT High Court',
              'Obtain MLAT response from counterpart',
              'Complete forensic image of seized laptops',
              'Draft court-ready dossier with Copilot',
              'Schedule witness interviews (4 pending)'
            ].map(t => (
              <li key={t} className="flex items-start gap-2 text-[12px] text-slate-300">
                <input type="checkbox" className="mt-1 accent-cyber-400" defaultChecked={Math.random() > 0.5} /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    footer: (
      <>
        <button onClick={actions.onAssign} className="btn-hud">Assign investigator</button>
        <button onClick={actions.onReport} className="btn-hud">Generate court-ready dossier</button>
        <button onClick={actions.onClose}  className="btn-hud btn-hud-danger">Close case</button>
      </>
    ),
    width: 760,
    tone: c.priority === 'CRITICAL' ? 'danger' as const : 'violet' as const
  }
}

// --------------------- Entity detail ----------------------------
export function entityDetail(e: Entity, onAction: (kind: string) => void) {
  return {
    title: <span>Entity · {e.id}</span>,
    body: (
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={'font-display text-[18px] ' + riskTextClass(e.risk)}>{e.name}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              {e.kind} {e.location && <>· <MapPin className="inline h-3 w-3" /> {e.location}</>}
            </div>
          </div>
          <span className="chip" style={{ borderColor: riskColor(e.risk), color: riskColor(e.risk) }}>{e.risk}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <InfoTile label="Net flow" value={formatNaira(e.net)} tone={e.net < 0 ? '#ef4444' : '#10b981'} />
          <InfoTile label="Degree"   value={e.degree.toString()} icon={<Network className="h-3 w-3" />} />
          <InfoTile label="Tags"     value={e.tags.length + ' flags'} icon={<Fingerprint className="h-3 w-3" />} />
        </div>

        <div className="mt-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {e.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      </div>
    ),
    footer: (
      <>
        <button onClick={() => onAction('trace')}    className="btn-hud">Trace flows</button>
        <button onClick={() => onAction('watchlist')} className="btn-hud">Add to watchlist</button>
        <button onClick={() => onAction('freeze')}    className="btn-hud btn-hud-danger">Request freeze</button>
      </>
    ),
    width: 620
  }
}

// --------------------- Transaction detail -----------------------
export function txDetail(t: Transaction, onAction: (kind: string) => void) {
  return {
    title: <span>Transaction · {t.id}</span>,
    body: (
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-display text-[16px] text-slate-100">{t.from} → {t.to}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              {new Date(t.ts).toLocaleString()} · {t.rail}
            </div>
          </div>
          <span className="chip" style={{ borderColor: riskColor(t.risk), color: riskColor(t.risk) }}>{t.risk}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <InfoTile label="Amount"   value={t.currency === 'NGN' ? formatNaira(t.amount) : `${(t.amount / 1e6).toFixed(2)}M ${t.currency}`} tone={riskColor(t.risk)} />
          <InfoTile label="Rail"     value={t.rail} />
          <InfoTile label="Status"   value={t.status.replace('_', ' ')} />
        </div>

        <div className="mt-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Signals</div>
          <div className="flex flex-wrap gap-1.5">
            {t.tags.map(x => <span key={x} className="chip">{x}</span>)}
          </div>
        </div>
      </div>
    ),
    footer: (
      <>
        <button onClick={() => onAction('hold')}    className="btn-hud">Hold for review</button>
        <button onClick={() => onAction('escalate')} className="btn-hud btn-hud-danger">Escalate</button>
      </>
    ),
    width: 620
  }
}

function InfoTile({ label, value, icon, tone }: { label: string; value: string; icon?: ReactNode; tone?: string }) {
  return (
    <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
      <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-slate-500">
        {icon}{label}
      </div>
      <div className="mt-1 font-display text-[15px] font-semibold" style={{ color: tone ?? '#e2e8f0' }}>{value}</div>
    </div>
  )
}
