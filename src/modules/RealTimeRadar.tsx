import { Radar, Waves, Zap, Snowflake, Activity, AlertTriangle, ShieldAlert, Siren } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../components/system/Toast'
import { useModal } from '../components/system/Modal'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { RadarScope } from '../components/widgets/RadarScope'
import { LiveTransactionFeed } from '../components/widgets/LiveFeed'
import { LiveAreaChart, BarGauge, HeatmapGrid } from '../components/widgets/Charts'
import { NigeriaMap } from '../components/widgets/NigeriaMap'

const RULE_ENGINE = [
  { id: 'R-101', name: 'High-velocity dispersal',       firing: 812, pct: 72, tone: '#ef4444' },
  { id: 'R-102', name: 'Structured deposits (smurfing)', firing: 612, pct: 54, tone: '#f59e0b' },
  { id: 'R-103', name: 'Rapid layering chain',           firing: 441, pct: 41, tone: '#a855f7' },
  { id: 'R-104', name: 'New beneficiary burst',          firing: 318, pct: 32, tone: '#eab308' },
  { id: 'R-105', name: 'Round-trip within 72h',          firing: 214, pct: 24, tone: '#22d3ee' },
  { id: 'R-106', name: 'PEP-linked outbound',            firing: 96,  pct: 18, tone: '#ef4444' },
  { id: 'R-107', name: 'Cross-border + crypto on-ramp',  firing: 82,  pct: 14, tone: '#a855f7' },
  { id: 'R-108', name: 'Cash-intensive rapid SWIFT',     firing: 41,  pct: 9,  tone: '#f59e0b' }
]

const FROZEN = [
  { id: 'FR-221', acct: 'Zenith 003…21',   holder: 'A. Ogundipe',          amount: '₦1.21B', reason: 'Round-trip confirmed', time: '14:22' },
  { id: 'FR-220', acct: 'Access 992…07',   holder: 'NorthStar Energy',     amount: '₦480M',   reason: 'Shell-tier exit',      time: '13:51' },
  { id: 'FR-219', acct: 'UBA 418…88',      holder: 'Adaeze Nwosu',         amount: '₦68M',    reason: 'Structured deposits',  time: '12:31' },
  { id: 'FR-218', acct: 'Polaris 902…12',  holder: 'ProsperPay NG',        amount: '₦3.3B',   reason: 'Crypto off-ramp',       time: '11:04' },
  { id: 'FR-217', acct: 'GTBank 713…00',   holder: 'Blue Horizon Capital', amount: '₦210M',   reason: 'Ponzi peeling chain',   time: '09:47' },
  { id: 'FR-216', acct: 'Kuda 889…33',     holder: 'Musa Ibrahim',         amount: '₦42M',    reason: 'Lifestyle mismatch',    time: '08:12' }
]

export function RealTimeRadar() {
  const toast = useToast()
  const modal = useModal()
  const [rules, setRules] = useState(() => RULE_ENGINE.map(r => ({ ...r, enabled: true })))

  function toggleRule(id: string) {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
    const r = rules.find(x => x.id === id)
    toast.info(r?.enabled ? 'Rule disabled' : 'Rule enabled', `${id} · ${r?.name}`)
  }

  function onFrozenClick(f: any) {
    modal.open({
      title: <span>Frozen · {f.acct}</span>,
      body: (
        <div className="space-y-3 text-[12.5px] text-slate-300">
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3">
            <div className="font-display text-[15px] text-red-300">{f.holder}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              {f.reason} · at {f.time}
            </div>
            <div className="mt-2 font-display text-[20px] font-bold text-red-300">{f.amount}</div>
          </div>
          <p>Preservation order automatically drafted and queued for court filing. Two-analyst quorum enforced — a human officer must approve before any downstream action.</p>
        </div>
      ),
      footer: (
        <>
          <button className="btn-hud" onClick={() => { modal.close(); toast.success('Unfreeze staged', 'Analyst quorum notified') }}>Stage unfreeze</button>
          <button className="btn-hud btn-hud-danger" onClick={() => { modal.close(); toast.danger('Transferred to OP/SUNBURST', 'Case folder updated') }}>Move to case</button>
        </>
      )
    })
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Real-Time Financial Monitoring Radar"
        subtitle="2.89M transactions/hr · NIP · SWIFT · CBDC · Crypto · Card · Bureau"
        chips={[{ label: 'REAL-TIME', tone: 'red' }, { label: 'RULES + ML', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="TX inspected / hr" value="2.89M" delta="p50 latency 1.4s" icon={<Activity />} />
          <StatCard label="Flagged / hr" value="14,218" delta="0.49% flag rate" icon={<AlertTriangle />} tone="amber" sparkline={[30,34,36,40,42,46,49,52,54,58,61,63]} />
          <StatCard label="Auto-frozen today" value="412" delta="₦41.2B total" icon={<Snowflake />} tone="red" />
          <StatCard label="Cases auto-opened" value="96" delta="triage queue" icon={<Siren />} tone="amber" />
          <StatCard label="Rules firing" value="138 / 420" delta="active policy set" icon={<Zap />} tone="violet" />
          <StatCard label="False positive" value="3.1%" delta="↓ 0.4 pts WoW" icon={<ShieldAlert />} tone="green" />
        </div>

        {/* Core radar + feed */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Threat radar"
            icon={<Radar className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <div className="flex items-center justify-center">
              <RadarScope size={360} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <InlineStat label="Mean time to flag" value="1.41s" sub="p50" tone="ok" />
              <InlineStat label="Mean time to freeze" value="3.8s" sub="p50" tone="violet" />
            </div>
          </Panel>

          <Panel
            title="Live transaction stream"
            icon={<Waves className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">LIVE</span>}
            className="col-span-12 xl:col-span-8"
          >
            <LiveTransactionFeed rows={13} hz={900} showHeader={false} />
          </Panel>
        </div>

        {/* Rules + Frozen + Flow chart */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Rule-engine heatboard"
            icon={<Zap className="h-3.5 w-3.5" />}
            tag={<span className="chip ml-2">{rules.filter(r => r.enabled).length}/{rules.length} active</span>}
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <div className="space-y-2">
              {rules.map(r => (
                <button key={r.id} onClick={() => toggleRule(r.id)} className="block w-full text-left group">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                    <span className={'transition ' + (r.enabled ? 'text-slate-300' : 'text-slate-600 line-through')}>{r.id} · {r.name}</span>
                    <span style={{ color: r.enabled ? r.tone : '#475569' }}>{r.enabled ? r.firing : '—'}</span>
                  </div>
                  <div className="progress-track mt-1">
                    <div className="progress-fill transition-all" style={{ width: r.enabled ? r.pct + '%' : '0%', background: `linear-gradient(90deg, ${r.tone}99, ${r.tone})` }} />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 font-mono text-[9.5px] uppercase tracking-widest text-slate-500">Click to toggle</div>
          </Panel>

          <Panel
            title="Auto-frozen accounts — last 24h"
            icon={<Snowflake className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-5"
            padded={false}
          >
            <table className="data-table">
              <thead><tr><th>TIME</th><th>ACCOUNT</th><th>HOLDER</th><th>AMOUNT</th><th>REASON</th></tr></thead>
              <tbody>
                {FROZEN.map(f => (
                  <tr key={f.id} className="cursor-pointer" onClick={() => onFrozenClick(f)}>
                    <td className="text-slate-500">{f.time}</td>
                    <td className="text-slate-200">{f.acct}</td>
                    <td>{f.holder}</td>
                    <td className="text-red-300">{f.amount}</td>
                    <td className="text-slate-400">{f.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel
            title="Rail-level flow"
            icon={<Activity className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-12 xl:col-span-3"
          >
            <div className="space-y-3">
              <LiveAreaChart label="NIP · tx/sec"     height={80} color="#22d3ee" />
              <LiveAreaChart label="SWIFT · tx/min"   height={80} color="#f59e0b" />
              <LiveAreaChart label="CBDC · tx/sec"    height={80} color="#10b981" />
              <LiveAreaChart label="Crypto · tx/min"  height={80} color="#a855f7" />
            </div>
          </Panel>
        </div>

        {/* Heatmap + patterns */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Geographic concentration — live"
            icon={<Radar className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-7"
          >
            <NigeriaMap height={420} />
          </Panel>

          <Panel
            title="Pattern board"
            icon={<Waves className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3">
              <PatternCard
                title="Layering"
                desc="A → B → C → A within 72h, amount within ±1.5%. 214 cases today."
                pct={54}
                tone="#a855f7"
              />
              <PatternCard
                title="Smurfing"
                desc="14+ sub-threshold deposits across ≥9 branches in 3h window."
                pct={62}
                tone="#f59e0b"
              />
              <PatternCard
                title="Rapid dispersal"
                desc="1 → N fan-out with N≥20 in <30m. Typical mule activation."
                pct={71}
                tone="#ef4444"
              />
              <PatternCard
                title="Round-tripping"
                desc="Outbound → foreign entity → inbound under alias within 14d."
                pct={38}
                tone="#22d3ee"
              />
            </div>

            <div className="mt-3">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">Flagging by hour (7d × 24h)</div>
              <HeatmapGrid />
            </div>
          </Panel>
        </div>

        {/* Score table */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Risk-scoring dashboard" className="col-span-12" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>TIER</th>
                  <th>DEFINITION</th>
                  <th>TX / 24H</th>
                  <th>AMOUNT / 24H</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><span className="chip chip-red">CRITICAL</span></td><td>Confirmed criminal pattern, PEP/sanctioned or blockchain-traced</td><td>612</td><td className="text-red-300">₦118.2B</td><td>Auto-freeze + Case open</td></tr>
                <tr><td><span className="chip chip-amber">HIGH</span></td><td>High-confidence model or rule firing, cross-signal</td><td>3,214</td><td className="text-amber-300">₦61.8B</td><td>Hold + Analyst review</td></tr>
                <tr><td><span className="chip chip-amber">ELEVATED</span></td><td>Single strong signal or behavioral divergence</td><td>8,914</td><td className="text-yellow-300">₦14.2B</td><td>Enhanced monitoring</td></tr>
                <tr><td><span className="chip">MODERATE</span></td><td>Mild anomaly or novel counterparty</td><td>41,212</td><td className="text-cyber-300">₦44.1B</td><td>Observe</td></tr>
                <tr><td><span className="chip chip-green">LOW</span></td><td>Baseline activity</td><td>2.83M</td><td className="text-emerald-300">₦8.41T</td><td>Pass</td></tr>
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function PatternCard({ title, desc, pct, tone }: { title: string; desc: string; pct: number; tone: string }) {
  return (
    <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
      <div className="flex items-center justify-between">
        <div className="font-display text-[12.5px] text-cyber-200">{title}</div>
        <div className="font-mono text-[11px]" style={{ color: tone }}>{pct}%</div>
      </div>
      <p className="mt-1 text-[10.5px] leading-snug text-slate-400">{desc}</p>
      <div className="progress-track mt-2"><div className="progress-fill" style={{ width: pct + '%', background: `linear-gradient(90deg, ${tone}99, ${tone})` }} /></div>
    </div>
  )
}
