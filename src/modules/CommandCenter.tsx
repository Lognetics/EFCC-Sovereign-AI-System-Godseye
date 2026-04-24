import {
  Activity, AlertTriangle, TrendingUp, ShieldCheck, Layers,
  Fingerprint, Cpu, Network, Clock, Gauge, Crosshair,
  Eye, Radio, Satellite, Target
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { NetworkGraph } from '../components/widgets/NetworkGraph'
import { NigeriaMap } from '../components/widgets/NigeriaMap'
import { LiveAreaChart, DonutChart, RadarChart, BarGauge } from '../components/widgets/Charts'
import { RadarScope } from '../components/widgets/RadarScope'
import { LiveTransactionFeed } from '../components/widgets/LiveFeed'
import {
  LIVE_METRICS, ALERTS, CASES, CRIMETYPE_DISTRIBUTION,
  formatNaira, riskColor, riskTextClass
} from '../data/mockData'

export function CommandCenter() {
  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Command & Control Center"
        subtitle="EFCC War Room · GE-NFIIS Unified Operations · Live"
        chips={[{ label: 'DEFCON 3', tone: 'amber' }, { label: 'LIVE', tone: 'red' }, { label: 'TS/SCI', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        {/* Top KPI strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard
            label="Ingest rate"
            value={(LIVE_METRICS.ingestRate / 1_000_000).toFixed(2) + 'M/hr'}
            delta="↑ 3.2% vs 24h avg"
            icon={<Activity />}
            sparkline={[40, 58, 44, 62, 50, 72, 68, 76, 60, 84, 78, 82]}
          />
          <StatCard
            label="Entities tracked"
            value={(LIVE_METRICS.entitiesTracked / 1_000_000).toFixed(1) + 'M'}
            delta="4.92M new / 24h"
            icon={<Network />}
            tone="violet"
            sparkline={[60, 62, 64, 68, 70, 71, 72, 74, 75, 78, 80, 82]}
          />
          <StatCard
            label="Active cases"
            value={LIVE_METRICS.activeCases.toLocaleString()}
            delta="12 opened today"
            icon={<Layers />}
            sparkline={[48, 52, 55, 49, 57, 63, 60, 62, 66, 68, 72, 70]}
          />
          <StatCard
            label="National risk index"
            value={LIVE_METRICS.nationalRisk + '/100'}
            delta="↑ 4 pts this week · ELEVATED"
            icon={<AlertTriangle />}
            tone="amber"
            sparkline={[52, 55, 58, 56, 62, 65, 68, 66, 71, 72, 73, 73]}
          />
          <StatCard
            label="Assets recovered (FY)"
            value={formatNaira(LIVE_METRICS.assetsRecovered)}
            delta={'Frozen 24h · ' + formatNaira(LIVE_METRICS.frozenLast24h)}
            icon={<TrendingUp />}
            tone="green"
            sparkline={[10, 28, 34, 45, 52, 61, 68, 72, 76, 80, 82, 81]}
          />
          <StatCard
            label="Predictive hit rate"
            value={(LIVE_METRICS.predictiveHitRate * 100).toFixed(1) + '%'}
            delta="precision · pre-incident alerts"
            icon={<Target />}
            tone="cyber"
            sparkline={[70, 74, 72, 78, 80, 79, 82, 81, 83, 82, 81, 81]}
          />
        </div>

        {/* Row 2: Map / Radar / Alerts */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          {/* National Heat Map */}
          <Panel
            title="National financial crime heatmap"
            icon={<Crosshair className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-amber ml-2">36 States · FCT</span>}
            actions={
              <>
                <button className="btn-hud">Drill down</button>
                <button className="btn-hud">Export</button>
              </>
            }
            className="col-span-12 xl:col-span-6"
          >
            <NigeriaMap height={440} />
          </Panel>

          {/* Threat Radar */}
          <Panel
            title="Threat radar — real-time blips"
            icon={<Satellite className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">LIVE SWEEP</span>}
            className="col-span-12 md:col-span-7 xl:col-span-3"
          >
            <div className="flex items-center justify-center">
              <RadarScope size={360} />
            </div>
          </Panel>

          {/* Priority alerts */}
          <Panel
            title="Priority alerts"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">{LIVE_METRICS.alertsOpen.toLocaleString()} OPEN</span>}
            actions={<button className="btn-hud">Triage queue</button>}
            className="col-span-12 md:col-span-5 xl:col-span-3"
            scroll
            padded={false}
          >
            <div className="divide-y divide-white/5">
              {ALERTS.slice(0, 8).map(a => (
                <div key={a.id} className="group px-3 py-2.5 transition hover:bg-cyber-500/5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-slate-500">{a.id}</span>
                        <span className="chip" style={{ borderColor: riskColor(a.severity), color: riskColor(a.severity) }}>{a.severity}</span>
                      </div>
                      <div className={'mt-0.5 truncate text-[12px] ' + riskTextClass(a.severity)}>{a.title}</div>
                      <div className="mt-1 font-mono text-[9.5px] uppercase tracking-widest text-slate-500">
                        {a.entity} · {a.module} · {a.ts}
                      </div>
                    </div>
                    <div className="shrink-0 font-mono text-[10px] text-cyber-300">{a.confidence}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Row 3: Flow + Syndicate graph */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Real-time financial flow"
            icon={<Activity className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <LiveAreaChart label="NIP transactions / sec" height={140} color="#22d3ee" />
              <LiveAreaChart label="Flagged events / min" height={140} color="#ef4444" />
              <LiveAreaChart label="Crypto on-ramps / min" height={140} color="#a855f7" />
              <LiveAreaChart label="Cross-border SWIFT / min" height={140} color="#f59e0b" />
            </div>
          </Panel>

          <Panel
            title="Active syndicate — OP / SUNBURST"
            icon={<Network className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">15 entities · 20 links</span>}
            actions={
              <>
                <button className="btn-hud">Expand</button>
                <button className="btn-hud">Seize</button>
                <button className="btn-hud btn-hud-danger">Escalate</button>
              </>
            }
            className="col-span-12 xl:col-span-7"
          >
            <NetworkGraph height={420} />
          </Panel>
        </div>

        {/* Row 4: Cases · Crime Mix · Posture */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Top active cases"
            icon={<Layers className="h-3.5 w-3.5" />}
            tag={<span className="chip ml-2">{CASES.length} of {LIVE_METRICS.activeCases.toLocaleString()}</span>}
            className="col-span-12 xl:col-span-6"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>CASE</th>
                  <th>LEAD</th>
                  <th>STAGE</th>
                  <th>ENTITIES</th>
                  <th className="text-right">VALUE</th>
                  <th className="text-right">PROGRESS</th>
                  <th>UPDATED</th>
                </tr>
              </thead>
              <tbody>
                {CASES.slice(0, 7).map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="font-display text-[12px] text-cyber-100">{c.code}</div>
                      <div className="text-[10px] text-slate-500">{c.title}</div>
                    </td>
                    <td>{c.lead}</td>
                    <td><span className="chip chip-violet">{c.stage}</span></td>
                    <td className="text-cyber-300">{c.entities}</td>
                    <td className={'text-right ' + riskTextClass(c.priority)}>{formatNaira(c.value)}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-cyber-500/10">
                          <div className="h-full bg-cyber-400" style={{ width: c.progress + '%' }} />
                        </div>
                        <span className="font-mono text-[10px] text-cyber-300">{c.progress}%</span>
                      </div>
                    </td>
                    <td className="text-slate-500">{c.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel
            title="Crime-type mix · last 30 days"
            icon={<Gauge className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-3"
          >
            <DonutChart data={CRIMETYPE_DISTRIBUTION} size={200} />
          </Panel>

          <Panel
            title="Operational posture"
            icon={<ShieldCheck className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-3"
          >
            <RadarChart
              axes={['Ingest', 'Detect', 'Trace', 'Recover', 'Prosecute', 'Prevent']}
              values={[92, 88, 84, 71, 68, 81]}
            />
            <div className="mt-3 space-y-2">
              <BarGauge label="Zero-trust posture" value={97} color="#10b981" right="97%" />
              <BarGauge label="Model health" value={93} color="#22d3ee" right="93%" />
              <BarGauge label="Oversight compliance" value={100} color="#a78bfa" right="100%" />
              <BarGauge label="Sovereign residency" value={100} color="#10b981" right="100%" />
            </div>
          </Panel>
        </div>

        {/* Row 5: Live stream + Ops posture */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Live transaction monitor"
            icon={<Radio className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">LIVE · NIP · SWIFT · CBDC · CRYPTO</span>}
            actions={<button className="btn-hud">Open radar</button>}
            className="col-span-12 xl:col-span-8"
          >
            <LiveTransactionFeed rows={9} hz={1200} showHeader={false} />
          </Panel>

          <Panel
            title="Ops snapshot"
            icon={<Eye className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <InlineStat label="Models serving" value={LIVE_METRICS.modelsServing} sub="47 / 47 healthy" tone="violet" />
              <InlineStat label="Uptime" value={LIVE_METRICS.uptime + '%'} sub="30-day" tone="ok" />
              <InlineStat label="Sanctions screened" value={(LIVE_METRICS.sanctionsScreened / 1e6).toFixed(1) + 'M'} sub="today" />
              <InlineStat label="Deepfake blocks" value={LIVE_METRICS.deepfakeBlocks.toLocaleString()} sub="this month" tone="danger" />
            </div>

            <div className="mt-4 rounded-sm border border-cyber-500/15 bg-ink-900/50 p-3">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyber-300">
                <Cpu className="h-3 w-3" /> Sovereign compute
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { k: 'Abuja Prime', v: 'H100 · 240 PF', s: 'online' },
                  { k: 'Kano Edge',   v: 'L40 · 44 PF',  s: 'online' },
                  { k: 'Lagos DR',    v: 'H100 · 190 PF', s: 'standby' }
                ].map(n => (
                  <div key={n.k} className="rounded-sm border border-cyber-500/15 bg-cyber-500/5 p-2">
                    <div className="font-display text-[11px] text-cyber-200">{n.k}</div>
                    <div className="mt-1 font-mono text-[9.5px] text-slate-400">{n.v}</div>
                    <div className={'mt-1 font-mono text-[9px] uppercase tracking-widest ' + (n.s === 'online' ? 'text-emerald-300' : 'text-amber-300')}>{n.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10.5px] text-slate-400">
              <Clock className="h-3 w-3 text-cyber-400" />
              <span>Mean time to flag: <span className="text-cyber-200">1.41s</span></span>
              <span className="text-slate-700">·</span>
              <span>Decision to freeze: <span className="text-cyber-200">3.8s</span></span>
            </div>

            <div className="mt-3 rounded-sm border border-emerald-500/20 bg-emerald-500/5 p-2.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
              <span className="blink-dot mr-2 h-1.5 w-1.5 bg-emerald-400 text-emerald-400" />
              All 18 feeds nominal · no downstream degradation
            </div>
          </Panel>
        </div>

        {/* Row 6: Identity / Behavior spotlight */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Identity verification spotlight"
            icon={<Fingerprint className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'NIN matches', v: '3.2M', t: 'today', ok: true },
                { label: 'BVN checks', v: '1.8M', t: 'today', ok: true },
                { label: 'KYC rejects', v: '112K', t: 'today', ok: false },
                { label: 'Deepfake blocks', v: '6,291', t: 'this month', ok: false },
                { label: 'Voice-clone flags', v: '942', t: 'this month', ok: false },
                { label: 'Cross-ref. match', v: '99.7%', t: 'accuracy', ok: true }
              ].map(m => (
                <div key={m.label} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
                  <div className="stat-label">{m.label}</div>
                  <div className={'mt-1 font-display text-[18px] font-bold ' + (m.ok ? 'text-cyber-200' : 'text-red-300')} style={{ textShadow: '0 0 10px rgba(34,211,238,0.2)' }}>{m.v}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-widest text-slate-500">{m.t}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Anomaly spotlight — last hour"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <div className="space-y-2">
              {[
                { label: 'Structured deposits', c: 324, pct: 78, tone: '#ef4444' },
                { label: 'Round-tripping', c: 112, pct: 62, tone: '#f59e0b' },
                { label: 'Layering sequences', c: 85, pct: 54, tone: '#a855f7' },
                { label: 'Smurfing patterns', c: 61, pct: 41, tone: '#eab308' },
                { label: 'Lifestyle mismatch', c: 47, pct: 32, tone: '#22d3ee' },
                { label: 'Night-hour surges', c: 39, pct: 26, tone: '#3b82f6' }
              ].map(a => (
                <div key={a.label}>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    <span>{a.label}</span>
                    <span><span className="text-slate-200">{a.c}</span> <span className="text-slate-600">/ 60m</span></span>
                  </div>
                  <div className="progress-track mt-1">
                    <div className="progress-fill" style={{ width: a.pct + '%', background: `linear-gradient(90deg, ${a.tone}88, ${a.tone})` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Classified briefing — auto-generated 09:02 WAT"
            icon={<Eye className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-violet ml-2">AI · Signed by M-NLP-12</span>}
            className="col-span-12 xl:col-span-4"
          >
            <div className="font-mono text-[11px] leading-relaxed text-slate-300">
              <p><span className="text-cyber-300">[CONFIDENTIAL · TS/SCI]</span> — The system observes a <span className="text-red-300">34% surge</span> in high-velocity transactions converging on OP/SUNBURST (subsidy diversion ring, 9 ministries). Graph clustering indicates 3 new ghost-director entities entering the peripheral tier in the last 72h.</p>
              <p className="mt-2">Cross-chain exits through <span className="text-yellow-300">bc1q…8fqrz → 0x9aF3…E2c1</span> have resumed after a 9-day dormancy. Probability of mixer cycle completion next 24h: <span className="text-red-300">0.87</span>.</p>
              <p className="mt-2">Predictive engine recommends: pre-emptive request for a <span className="text-cyber-200">court-authorized freeze</span> on 11 Nigerian bank accounts implicated in the suspected peripheral tier, and an international preservation notice via INTERPOL I-24/7.</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="btn-hud">Open full brief</button>
              <button className="btn-hud btn-hud-danger">Escalate to DCP</button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
