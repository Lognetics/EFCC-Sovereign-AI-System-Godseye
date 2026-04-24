import { ShieldCheck, KeyRound, Lock, UserCog, Activity, AlertTriangle, Bug, Network } from 'lucide-react'
import { useToast } from '../components/system/Toast'
import { useModal } from '../components/system/Modal'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { SECURITY_EVENTS } from '../data/mockData'
import { BarGauge, LiveAreaChart } from '../components/widgets/Charts'

const ZT_CONTROLS = [
  { k: 'Identity → every request is authenticated',  v: 99.98, c: '#10b981' },
  { k: 'Device attested (TPM + secure boot)',        v: 99.4,  c: '#10b981' },
  { k: 'mTLS on all service hops',                   v: 100,   c: '#10b981' },
  { k: 'Principle of least privilege enforced',       v: 96.8,  c: '#22d3ee' },
  { k: 'Network micro-segmentation',                  v: 98.1,  c: '#22d3ee' },
  { k: 'End-to-end event encryption at rest',         v: 100,   c: '#a78bfa' },
  { k: 'Post-quantum KEX (Kyber + X25519)',           v: 100,   c: '#a78bfa' },
  { k: 'Just-in-time admin elevation',               v: 94.3,  c: '#22d3ee' }
]

const INSIDER_CASES = [
  { id: 'IT-0217', user: 'ANALYST-0217', risk: 97, alert: '214 off-scope BVN reads at 02:11–02:34 WAT', action: 'QUARANTINED' },
  { id: 'IT-0214', user: 'ANALYST-0091', risk: 74, alert: 'Bulk export of 34k NIN records to external USB', action: 'INVESTIGATE' },
  { id: 'IT-0212', user: 'OPS-PLATFORM', risk: 61, alert: 'SSH agent forwarding from unmanaged jump host', action: 'INVESTIGATE' },
  { id: 'IT-0208', user: 'INTERN-0044',  risk: 42, alert: 'Repeated screenshot of live alert feed',       action: 'COACH' },
  { id: 'IT-0204', user: 'DEV-0187',     risk: 35, alert: 'ML notebook exported to personal Drive (attempted)', action: 'BLOCKED' }
]

export function Defense() {
  const toast = useToast()
  const modal = useModal()

  function openInsider(c: typeof INSIDER_CASES[number]) {
    modal.open({
      title: <span>Insider case · {c.id}</span>,
      body: (
        <div className="space-y-3 text-[12.5px] text-slate-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-[16px] text-slate-100">{c.user}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{c.alert}</div>
            </div>
            <div className="text-right">
              <div className="stat-label">risk</div>
              <div className={'font-display text-[22px] font-bold ' + (c.risk > 90 ? 'text-red-300' : c.risk > 70 ? 'text-amber-300' : 'text-cyber-200')}>{c.risk}/100</div>
            </div>
          </div>
          <p>Detection fired on the <span className="text-cyber-200">behavioral-anomaly (user)</span> model. Session replay and query audit are preserved in the WORM ledger. Response is gated by a two-engineer quorum.</p>
        </div>
      ),
      footer: (
        <>
          <button className="btn-hud" onClick={() => { modal.close(); toast.info('Interview scheduled', 'HR + Legal notified · secure room booked') }}>Schedule interview</button>
          <button className="btn-hud" onClick={() => { modal.close(); toast.warn('Session revoked', `${c.user} active sessions terminated`) }}>Revoke sessions</button>
          <button className="btn-hud btn-hud-danger" onClick={() => { modal.close(); toast.danger('Escalated to ONSA', 'External review engaged') }}>Escalate to ONSA</button>
        </>
      ),
      tone: c.risk > 90 ? 'danger' : 'violet'
    })
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Sovereign Cybersecurity & Defense Core"
        subtitle="Zero-trust · AI-powered intrusion detection · insider threat · immutable audit"
        chips={[{ label: 'DEFCON 3', tone: 'amber' }, { label: 'AUDIT WORM', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Zero-trust posture" value="97%" delta="target ≥ 95%" icon={<ShieldCheck />} tone="green" />
          <StatCard label="Intrusion attempts (24h)" value="48,112" delta="all blocked / contained" icon={<Bug />} tone="red" />
          <StatCard label="Insider alerts"  value="14" delta="2 critical · 12 pending" icon={<UserCog />} tone="amber" />
          <StatCard label="Mean time to contain" value="9m 42s" delta="target < 15m" icon={<Activity />} tone="cyber" />
          <StatCard label="Endpoints attested" value="7,442" delta="TPM + MDM" icon={<KeyRound />} tone="violet" />
          <StatCard label="Audit WORM ledger" value="#2,218,041" delta="no rewind possible" icon={<Lock />} tone="green" />
        </div>

        {/* ZT posture + live threat stream */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Zero-trust posture" icon={<ShieldCheck className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-5">
            <div className="space-y-2">
              {ZT_CONTROLS.map(c => (
                <BarGauge key={c.k} label={c.k} value={c.v} color={c.c} right={c.v.toFixed(1) + '%'} />
              ))}
            </div>
          </Panel>

          <Panel title="Threat stream (last 6 h)" icon={<Activity className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-4">
            <div className="space-y-3">
              <LiveAreaChart label="Perimeter events / min" color="#ef4444" height={100} />
              <LiveAreaChart label="Endpoint detections / min" color="#f59e0b" height={100} />
              <LiveAreaChart label="Data-layer reads / min" color="#22d3ee" height={100} />
            </div>
          </Panel>

          <Panel title="Defense topology" icon={<Network className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-3">
            <Topology />
          </Panel>
        </div>

        {/* Security events + insider threats */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Security event log" icon={<AlertTriangle className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6" padded={false}>
            <table className="data-table">
              <thead>
                <tr><th>TIME</th><th>SOURCE</th><th>TYPE</th><th>LAYER</th><th>ACTION</th></tr>
              </thead>
              <tbody>
                {SECURITY_EVENTS.map(e => (
                  <tr key={e.id}>
                    <td className="text-slate-500">{e.ts}</td>
                    <td className="font-mono text-slate-200">{e.source}</td>
                    <td>{e.type}</td>
                    <td><span className="chip">{e.layer}</span></td>
                    <td>
                      <span className={
                        e.action === 'blocked' || e.action === 'quarantined' ? 'chip chip-red' :
                        e.action === 'contained' ? 'chip chip-amber' :
                        'chip chip-violet'
                      }>{e.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Insider-threat queue" icon={<UserCog className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6" padded={false}>
            <table className="data-table">
              <thead>
                <tr><th>CASE</th><th>USER</th><th>RISK</th><th>DETAIL</th><th>ACTION</th></tr>
              </thead>
              <tbody>
                {INSIDER_CASES.map(c => (
                  <tr key={c.id} className="cursor-pointer" onClick={() => openInsider(c)}>
                    <td className="font-mono text-slate-500">{c.id}</td>
                    <td className="text-slate-200">{c.user}</td>
                    <td>
                      <div className={
                        c.risk > 90 ? 'text-red-300' :
                        c.risk > 70 ? 'text-amber-300' :
                        c.risk > 50 ? 'text-yellow-300' : 'text-cyber-300'
                      }>{c.risk}/100</div>
                    </td>
                    <td className="text-slate-400">{c.alert}</td>
                    <td>
                      <span className={
                        c.action === 'QUARANTINED' ? 'chip chip-red' :
                        c.action === 'BLOCKED' ? 'chip chip-amber' :
                        'chip chip-violet'
                      }>{c.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Audit + key management */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Immutable audit ledger" icon={<Lock className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-8">
            <div className="rounded-sm border border-cyber-500/15 bg-ink-900/60 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
              <pre className="whitespace-pre-wrap">
#2218041 · 2026-04-24 14:21:08 WAT · user=dcp.okonkwo · action=VIEW_ENTITY · subj=E-001 · scope=OP/SUNBURST · warrant=W-2026-004 · receipt=0x4f…ab12
#2218040 · 2026-04-24 14:20:52 WAT · user=acp.lawal    · action=EXPORT_EVIDENCE · subj=EV-8830 · scope=OP/GHOSTVEIN · warrant=W-2026-003 · receipt=0x37…c411
#2218039 · 2026-04-24 14:19:41 WAT · user=SYSTEM · action=FREEZE_ACCOUNT · subj=Zenith 003…21 · source=Radar R-105 · receipt=0xa2…8f90
#2218038 · 2026-04-24 14:18:14 WAT · user=SYSTEM · action=MODEL_DEPLOY (canary) · subj=M-FUS-01 v0.4.1 · receipt=0x91…6b44
#2218037 · 2026-04-24 14:17:02 WAT · user=dcp.okonkwo · action=QUERY · q="show OP/LIGHTHOUSE wallet clusters" · purpose=INVESTIGATION · receipt=0xb3…1f8e
#2218036 · 2026-04-24 14:15:30 WAT · user=analyst-0217 · action=DENIED (policy:off-scope) · subj=BVN · receipt=0xcc…7fa0
              </pre>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <InlineStat label="Avg write rate" value="3.1K /s" sub="sustained" tone="ok" />
              <InlineStat label="Retention" value="10 yrs" sub="statutory minimum" tone="violet" />
              <InlineStat label="Rollback possible?" value="NO" sub="append-only WORM" tone="danger" />
            </div>
          </Panel>

          <Panel title="Key management · HSM cluster" icon={<KeyRound className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-4">
            <div className="space-y-3">
              <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                <div className="font-display text-[12px] text-cyber-200">HSM-Abuja-Prime</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">FIPS 140-3 Level 4 · 4 nodes</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <div>Active keys: <span className="text-cyber-200">14,221</span></div>
                  <div>KEM rotation: <span className="text-cyber-200">90d</span></div>
                  <div>Kyber-1024: <span className="text-emerald-300">ENABLED</span></div>
                  <div>Dilithium3: <span className="text-emerald-300">ENABLED</span></div>
                </div>
              </div>
              <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                <div className="font-display text-[12px] text-cyber-200">HSM-Kano-DR</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">Standby · cross-zone replication</div>
              </div>

              <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/5 p-2.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                <span className="blink-dot mr-2 h-1.5 w-1.5 bg-emerald-400 text-emerald-400" />
                Post-quantum enabled · no legacy-only cipher on critical paths
              </div>
            </div>
          </Panel>
        </div>

        {/* Runbooks / exercises */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Runbooks · last exercises" icon={<Activity className="h-3.5 w-3.5" />} className="col-span-12">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { k: 'Insider-data-exfil simulation', t: 'Monthly', ok: true, m: 'MTTC 11m · improved 22% YoY' },
                { k: 'Ransomware tabletop',            t: 'Quarterly', ok: true, m: '0 data loss · recovery drills at DR' },
                { k: 'Red-team adversarial AI',        t: 'Monthly',   ok: true, m: '3 model bypasses discovered → patched' },
                { k: 'Supply-chain hash audit',         t: 'Weekly',   ok: true, m: '0 unsigned binaries detected' },
                { k: 'Physical seizure of evidence',     t: 'On-demand', ok: true, m: 'Chain integrity · 100%' },
                { k: 'Civil rights disclosure drill',    t: 'Quarterly', ok: true, m: 'All statutory timelines met' }
              ].map(x => (
                <div key={x.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[12.5px] text-cyber-200">{x.k}</div>
                    <span className="chip chip-green">{x.t}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">{x.m}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Topology() {
  return (
    <svg viewBox="0 0 240 260" className="h-auto w-full">
      <defs>
        <radialGradient id="topo-bg">
          <stop offset="0%" stopColor="rgba(34,211,238,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="240" height="260" fill="url(#topo-bg)" />

      {/* Perimeter */}
      <rect x="8" y="8" width="224" height="244" fill="none" stroke="rgba(239,68,68,0.5)" strokeDasharray="4 4" />
      <text x="12" y="20" fill="#ef4444" style={{ fontSize: 9 }}>Perimeter (WAF + DDoS)</text>

      {/* DMZ */}
      <rect x="22" y="30" width="196" height="60" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.4)" strokeDasharray="3 3" />
      <text x="26" y="42" fill="#f59e0b" style={{ fontSize: 9 }}>DMZ · API gateway · Identity</text>

      {/* App */}
      <rect x="22" y="98" width="196" height="60" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.5)" strokeDasharray="3 3" />
      <text x="26" y="110" fill="#22d3ee" style={{ fontSize: 9 }}>App services (micro-segmented)</text>

      {/* Data */}
      <rect x="22" y="166" width="196" height="60" fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.5)" strokeDasharray="3 3" />
      <text x="26" y="178" fill="#a78bfa" style={{ fontSize: 9 }}>Data vault · HSM · WORM audit</text>

      {/* flows */}
      <g stroke="#22d3ee" strokeOpacity="0.4" fill="none">
        <line x1="120" y1="70" x2="120" y2="98" />
        <line x1="120" y1="138" x2="120" y2="166" />
      </g>

      {/* Nodes */}
      {[
        { x: 50, y: 60, l: 'WAF' }, { x: 120, y: 60, l: 'IAM' }, { x: 190, y: 60, l: 'MDM' },
        { x: 50, y: 128, l: 'API' }, { x: 120, y: 128, l: 'ML' }, { x: 190, y: 128, l: 'Copilot' },
        { x: 50, y: 196, l: 'Vault' }, { x: 120, y: 196, l: 'HSM' }, { x: 190, y: 196, l: 'WORM' }
      ].map(n => (
        <g key={n.l + n.x}>
          <circle cx={n.x} cy={n.y} r="6" fill="#03060c" stroke="#22d3ee" />
          <text x={n.x} y={n.y + 18} textAnchor="middle" fill="#cbd5e1" style={{ fontSize: 9 }}>{n.l}</text>
        </g>
      ))}

      {/* Bottom glow */}
      <rect x="8" y="232" width="224" height="20" fill="rgba(16,185,129,0.1)" />
      <text x="120" y="245" textAnchor="middle" fill="#10b981" style={{ fontSize: 9 }}>Sovereign · Abuja Prime + Kano DR</text>
    </svg>
  )
}
