import { BrainCircuit, Sparkles, Target, ShieldAlert, Eye, Users, Activity, Atom, Flame, UserX } from 'lucide-react'
import { useToast } from '../components/system/Toast'
import { useModal } from '../components/system/Modal'
import { TopBar } from '../components/layout/TopBar'
import { Panel } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { RadarChart, BarGauge, LiveAreaChart, StackedBars } from '../components/widgets/Charts'
import { MODELS } from '../data/mockData'
import { Waveform } from '../components/widgets/Charts'

export function AIBrain() {
  const toast = useToast()
  const modal = useModal()

  function openModel(m: typeof MODELS[number]) {
    modal.open({
      title: <span>Model · {m.id}</span>,
      body: (
        <div className="space-y-3 text-[12.5px] text-slate-300">
          <div>
            <div className="font-display text-[16px] text-cyber-200">{m.name}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">{m.framework} · {m.version} · {m.status}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { k: 'AUC',      v: m.auc ? m.auc.toFixed(3) : '—' },
              { k: 'Precision', v: m.precision ? m.precision.toFixed(3) : '—' },
              { k: 'Recall',    v: m.recall ? m.recall.toFixed(3) : '—' },
              { k: 'Drift',     v: m.drift.toFixed(3), tone: m.drift > 0.02 ? '#f59e0b' : '#10b981' }
            ].map(x => (
              <div key={x.k} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5 text-center">
                <div className="stat-label">{x.k}</div>
                <div className="mt-1 font-display text-[17px] font-bold" style={{ color: (x as any).tone ?? '#67e8f9' }}>{x.v}</div>
              </div>
            ))}
          </div>
          <p>Model is serving production traffic. Fairness and bias audits are scheduled quarterly; latest audit passed on 2026-Q1 with subgroup deviation ≤ 1.2%.</p>
        </div>
      ),
      footer: (
        <>
          <button className="btn-hud" onClick={() => { modal.close(); toast.info('Canary rollout queued', `${m.id} → 10% traffic`) }}>Canary rollout</button>
          <button className="btn-hud" onClick={() => { modal.close(); toast.success('Explanations exported', 'SHAP contributions · PDF ready') }}>Export SHAP</button>
          <button className="btn-hud btn-hud-danger" onClick={() => { modal.close(); toast.warn('Rollback staged', `${m.id} staged to v${(parseFloat(m.version.replace(/[^\d.]/g, '')) - 0.1).toFixed(1)}`) }}>Rollback</button>
        </>
      )
    })
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="AI Intelligence Core — God's Eye Brain"
        subtitle="47 models · behavioral · graph · predictive · deepfake shield"
        chips={[{ label: 'SOVEREIGN MODELS', tone: 'violet' }, { label: 'FEDERATED TRAIN', tone: 'green' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Models serving" value={MODELS.length + '+'} delta="47 / 47 healthy" icon={<BrainCircuit />} tone="violet" />
          <StatCard label="Inferences / hr" value="421M" delta="p50 · 18 ms" icon={<Activity />} sparkline={[40,44,52,58,62,60,66,70,74,78,76,80]} />
          <StatCard label="Predictive hit rate" value="81.4%" delta="precision · pre-incident" icon={<Target />} tone="green" sparkline={[62,65,68,70,72,74,73,76,78,79,80,81]} />
          <StatCard label="Deepfake blocks" value="6,291" delta="this month · +12%" icon={<ShieldAlert />} tone="red" />
        </div>

        {/* Behavioral + Graph + Predictive */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="A · Behavioral Intelligence Engine"
            icon={<Users className="h-3.5 w-3.5" />}
            tag={<span className="chip ml-2">Learns patterns · per entity</span>}
            className="col-span-12 xl:col-span-4"
          >
            <BehavioralProfile />
          </Panel>

          <Panel
            title="B · Network & Syndicate Intelligence"
            icon={<Atom className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-violet ml-2">Graph AI · HGT</span>}
            className="col-span-12 xl:col-span-4"
          >
            <SyndicateProfile />
          </Panel>

          <Panel
            title="C · Predictive Crime Engine"
            icon={<Flame className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-amber ml-2">7-day forecast</span>}
            className="col-span-12 xl:col-span-4"
          >
            <PredictiveForecast />
          </Panel>
        </div>

        {/* Deepfake + Voice clone */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="D · Deepfake & Synthetic Identity Shield"
            icon={<UserX className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">LIVE · 6,291 blocks / month</span>}
            className="col-span-12 xl:col-span-7"
          >
            <DeepfakeShield />
          </Panel>

          <Panel
            title="Voice-clone forensics · M-VOX-02"
            icon={<Sparkles className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
          >
            <VoiceForensics />
          </Panel>
        </div>

        {/* Model registry */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Sovereign model registry"
            icon={<BrainCircuit className="h-3.5 w-3.5" />}
            actions={
              <>
                <button className="btn-hud" onClick={() => toast.info('Canary staged', 'M-FUS-01 v0.4.1 → 18% traffic · monitoring drift')}>Deploy canary</button>
                <button className="btn-hud" onClick={() => toast.warn('Rollback staged', 'Requires two-engineer quorum')}>Rollback</button>
              </>
            }
            className="col-span-12"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>MODEL</th>
                  <th>NAME</th>
                  <th>FRAMEWORK</th>
                  <th>AUC</th>
                  <th>PRECISION</th>
                  <th>RECALL</th>
                  <th>DRIFT</th>
                  <th>VERSION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map(m => (
                  <tr key={m.id} className="cursor-pointer" onClick={() => openModel(m)}>
                    <td className="font-mono text-[10px] text-slate-500">{m.id}</td>
                    <td className="text-slate-100">{m.name}</td>
                    <td className="text-slate-400">{m.framework}</td>
                    <td>{m.auc ? <span className="text-cyber-300">{m.auc.toFixed(3)}</span> : <span className="text-slate-600">—</span>}</td>
                    <td>{m.precision ? <span className="text-cyber-300">{m.precision.toFixed(3)}</span> : <span className="text-slate-600">—</span>}</td>
                    <td>{m.recall ? <span className="text-cyber-300">{m.recall.toFixed(3)}</span> : <span className="text-slate-600">—</span>}</td>
                    <td className={m.drift > 0.02 ? 'text-amber-300' : 'text-emerald-300'}>{m.drift.toFixed(3)}</td>
                    <td className="text-slate-400">{m.version}</td>
                    <td><span className={m.status === 'SERVING' ? 'chip chip-green' : 'chip chip-violet'}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Explainability */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Explainability · SHAP contribution"
            icon={<Eye className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-6"
          >
            <ExplainBars />
          </Panel>
          <Panel
            title="Model capability radar"
            className="col-span-12 md:col-span-6 xl:col-span-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-cyber-300">M-BEH-04 · Behavioral Anomaly</div>
                <RadarChart axes={['Precision', 'Recall', 'Latency', 'Explainability', 'Fairness', 'Robustness']} values={[91, 88, 84, 92, 89, 86]} size={230} />
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-cyber-300">M-GNN-01 · Graph Anomaly</div>
                <RadarChart axes={['Precision', 'Recall', 'Latency', 'Explainability', 'Fairness', 'Robustness']} values={[92, 89, 72, 80, 84, 90]} size={230} />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function BehavioralProfile() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 font-display text-[12px] text-red-300">MI</div>
        <div>
          <div className="font-display text-[13px] text-slate-100">Musa Ibrahim <span className="chip chip-amber ml-1">ELEVATED</span></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">BVN 221408… · profile 214 dims</div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <BarGauge label="Income declared" value={14} max={100} color="#22d3ee" right="₦14M/yr" />
        <BarGauge label="Lifestyle spend (POS+card)" value={58} max={100} color="#ef4444" right="₦58M/yr" />
        <BarGauge label="Property transfers" value={32} max={50} color="#f59e0b" right="32 in 18m" />
        <BarGauge label="Inbound: new beneficiaries" value={71} max={100} color="#eab308" right="71%" />
        <BarGauge label="Night-hour activity" value={47} max={100} color="#a78bfa" right="47%" />
      </div>

      <div className="mt-3 rounded-sm border border-red-500/25 bg-red-500/5 p-2.5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-red-300">
          <Flame className="h-3 w-3" /> Behavioral divergence
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
          Observed lifestyle/income deviation: <span className="text-red-300">+312%</span> over rolling 12m. Compound score <span className="text-red-300">0.87</span> (threshold 0.60). Explainer: lifestyle-spend (+0.41), new-beneficiary inbound (+0.22), property-velocity (+0.18).
        </p>
      </div>
    </div>
  )
}

function SyndicateProfile() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-[13px] text-slate-100">Cluster · <span className="text-red-300">Syndicate-A</span></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">OP/SUNBURST · 147 entities</div>
        </div>
        <span className="chip chip-red">DETECTED · 94%</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          { k: 'Tiers', v: '4' },
          { k: 'Ghost dirs.', v: '12' },
          { k: 'Shells', v: '9' },
          { k: 'Mules', v: '31' },
          { k: 'Wallets', v: '24' },
          { k: 'Rails', v: '6' }
        ].map(x => (
          <div key={x.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2">
            <div className="font-display text-[16px] text-cyber-200">{x.v}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{x.k}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-cyber-300">Hidden-tier hypothesis</div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
          Heterogeneous GNN flags <span className="text-yellow-300">3 peripheral nodes</span> as ghost-director entrants (prob. 0.91). The model predicts they will trigger outbound exits via <span className="text-yellow-300">bc1q…8fqrz</span> → cross-chain within 72h.
        </p>
      </div>

      <div className="mt-3 space-y-2">
        <BarGauge label="Clustering confidence" value={94} color="#ef4444" right="94%" />
        <BarGauge label="Connectivity score (PageRank)" value={78} color="#22d3ee" right="0.78" />
        <BarGauge label="Temporal cohesion (7d)" value={62} color="#a78bfa" right="0.62" />
      </div>
    </div>
  )
}

function PredictiveForecast() {
  return (
    <div>
      <div className="rounded-sm border border-amber-500/25 bg-amber-500/5 p-2.5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-300">
          <Flame className="h-3 w-3" /> Next 7 days · forecast
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {[68, 72, 74, 81, 79, 76, 72].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-16 w-full rounded-sm bg-gradient-to-t from-amber-500/70 to-amber-300/70" style={{ opacity: v / 100 }} />
              <div className="font-mono text-[9px] text-slate-500">D{i + 1}</div>
              <div className="font-mono text-[9px] text-amber-300">{v}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
          Model <span className="text-cyber-200">M-PRD-07</span> projects <span className="text-amber-300">+18%</span> fraud attempts across Lagos/FCT/Kano corridor next week. Primary driver: <span className="text-amber-300">holiday disbursements + BDC FX anomalies</span>.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { k: 'Fraud attempts', v: '+18%', t: 'amber' },
          { k: 'Ponzi outflow', v: '+9%',  t: 'red' },
          { k: 'Mule enrollment', v: '+14%', t: 'amber' },
          { k: 'Crypto on-ramps', v: '+6%',  t: 'cyber' }
        ].map(x => (
          <div key={x.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2">
            <div className="font-mono text-[9.5px] uppercase tracking-widest text-slate-500">{x.k}</div>
            <div className={'mt-0.5 font-display text-[18px] ' + (x.t === 'amber' ? 'text-amber-300' : x.t === 'red' ? 'text-red-300' : 'text-cyber-200')}>{x.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-cyber-300">Pre-incident alert preview</div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
          Likely <span className="text-red-300">Layer-3 round-trip</span> executing Thursday 23:00–02:00 WAT on Zenith 003…21 → Access 992…07 → exit. Recommend preemptive freeze notice.
        </p>
      </div>
    </div>
  )
}

function DeepfakeShield() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { k: 'Video KYC / min', v: '214',  t: 'cyber' },
          { k: 'Synthetic caught', v: '8.4%', t: 'red' },
          { k: 'Voice KYC / min', v: '312',  t: 'cyber' },
          { k: 'Clone detections', v: '4.1%', t: 'red' }
        ].map(x => (
          <div key={x.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
            <div className="stat-label">{x.k}</div>
            <div className={'mt-1 font-display text-[20px] ' + (x.t === 'red' ? 'text-red-300' : 'text-cyber-200')}>{x.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <DeepfakeCard
          source="PalmPay onboarding batch 0912"
          kind="Video liveness"
          verdict="SYNTHETIC"
          confidence={98}
          reasons={[
            'Temporal blink inconsistency — 4/6 frames misaligned',
            'Pupil-dilation response absent under luminance change',
            'Micro-expression entropy below natural range',
            'GAN fingerprint: StyleGAN3-v1.2 cluster'
          ]}
        />
        <DeepfakeCard
          source="Moniepoint onboarding batch 0188"
          kind="Video liveness"
          verdict="AUTHENTIC"
          confidence={94}
          reasons={[
            'Natural blink cadence (3.4 s mean inter-blink)',
            'Motion-field consistent with real subject',
            'Specular reflections align with ambient light',
            'Voice-face phoneme sync valid'
          ]}
          authentic
        />
      </div>

      <div className="mt-3">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-cyber-300">Detections over 24h</div>
        <LiveAreaChart label="Synthetic-identity blocks / min" height={90} color="#ef4444" />
      </div>
    </div>
  )
}

function DeepfakeCard({ source, kind, verdict, confidence, reasons, authentic }: { source: string; kind: string; verdict: string; confidence: number; reasons: string[]; authentic?: boolean }) {
  const color = authentic ? '#10b981' : '#ef4444'
  return (
    <div className="relative rounded-sm border bg-ink-900/40 p-3" style={{ borderColor: color + '40' }}>
      <span className="corner-tl" />
      <span className="corner-br" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-display text-[12px] text-slate-100">{source}</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{kind}</div>
        </div>
        <span className="chip" style={{ borderColor: color, color }}>{verdict}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(confidence / 100) * 113} 113`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display text-[11px] font-bold" style={{ color }}>{confidence}%</div>
        </div>
        <div className="flex-1 font-mono text-[10px] text-slate-400">confidence</div>
      </div>
      <ul className="mt-2 space-y-1 text-[11px] leading-snug text-slate-300">
        {reasons.map(r => (
          <li key={r} className="flex items-start gap-1.5"><span style={{ color }}>▸</span>{r}</li>
        ))}
      </ul>
    </div>
  )
}

function VoiceForensics() {
  return (
    <div className="space-y-3">
      <div className="rounded-sm border border-red-500/30 bg-red-500/5 p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-[12px] text-slate-100">Sample · Kuda KYC · 00:42</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Captured 00:34 WAT</div>
          </div>
          <span className="chip chip-red">SYNTHETIC · 96%</span>
        </div>
        <div className="mt-3">
          <Waveform color="#ef4444" height={50} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-slate-300">
          <div className="rounded-sm border border-white/5 bg-white/5 p-2">Phase artefact · 4–8 kHz</div>
          <div className="rounded-sm border border-white/5 bg-white/5 p-2">Prosody periodicity locked</div>
          <div className="rounded-sm border border-white/5 bg-white/5 p-2">Glottal pulse uniform</div>
          <div className="rounded-sm border border-white/5 bg-white/5 p-2">Match: MRT-TTS v3 cluster</div>
        </div>
      </div>

      <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/5 p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-[12px] text-slate-100">Sample · Stanbic KYC · 00:38</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Captured 00:34 WAT</div>
          </div>
          <span className="chip chip-green">AUTHENTIC · 93%</span>
        </div>
        <div className="mt-3">
          <Waveform color="#10b981" height={50} />
        </div>
      </div>
    </div>
  )
}

function ExplainBars() {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Top feature contributions · Alert A-1021</div>
      <StackedBars data={[
        { label: 'Lifestyle', segments: [{ value: 41, color: '#ef4444' }, { value: 12, color: '#f59e0b' }] },
        { label: 'Beneficiary', segments: [{ value: 22, color: '#ef4444' }, { value: 8, color: '#f59e0b' }] },
        { label: 'Velocity', segments: [{ value: 18, color: '#f59e0b' }, { value: 10, color: '#eab308' }] },
        { label: 'PEP link', segments: [{ value: 14, color: '#a855f7' }] },
        { label: 'Night-hr', segments: [{ value: 9, color: '#22d3ee' }] },
        { label: 'Graph', segments: [{ value: 11, color: '#22c55e' }] },
        { label: 'Crypto', segments: [{ value: 6, color: '#eab308' }] }
      ]} height={200} />
      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" /> Positive contribution</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" /> Moderating factor</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-yellow-400" /> Secondary</span>
      </div>
    </div>
  )
}
