import { Scale, Gavel, Lock, Eye, FileCheck2, UserCheck2, BookOpenCheck, AlertOctagon, Scroll } from 'lucide-react'
import { useToast } from '../components/system/Toast'
import { useModal } from '../components/system/Modal'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { GOVERNANCE_CONTROLS } from '../data/mockData'
import { BarGauge, RadarChart } from '../components/widgets/Charts'

const WARRANTS = [
  { id: 'W-2026-004', subj: 'Telecom CDR — 18 lines', court: 'FCT High Court', granted: '2026-04-20', expires: '2026-05-20', scope: 'OP/SUNBURST', status: 'ACTIVE' },
  { id: 'W-2026-005', subj: 'Bank records — 14 accts',  court: 'Federal High Court · Lagos', granted: '2026-04-22', expires: '2026-10-22', scope: 'OP/LIGHTHOUSE', status: 'ACTIVE' },
  { id: 'W-2026-006', subj: 'Device seizure',           court: 'Federal High Court · Abuja', granted: '2026-04-22', expires: '2026-04-29', scope: 'OP/LIGHTHOUSE', status: 'ACTIVE' },
  { id: 'W-2026-003', subj: 'Cloud acquisition',         court: 'FCT High Court', granted: '2026-04-03', expires: '2026-05-03', scope: 'OP/GHOSTVEIN', status: 'ACTIVE' }
]

const RIGHTS = [
  { q: 'Has this subject been notified of enforcement actions per statutory timelines?', a: 'Yes · within 10 days', ok: true },
  { q: 'Have all disclosures complied with the FOI Act 2011?',                           a: 'Yes · 96% SLA',        ok: true },
  { q: 'Are AI model decisions explainable per oversight requirements?',                 a: 'Yes · SHAP on all critical actions', ok: true },
  { q: 'Are redress channels accessible to affected citizens?',                           a: 'Yes · Ombuds portal · 24×7', ok: true },
  { q: 'Are any analytics running on PII without policy binding?',                       a: 'No · policy gate enforced', ok: true },
  { q: 'Are automated freezes reviewable within 72h by a human officer?',                a: 'Yes · Two-analyst quorum',  ok: true }
]

export function Governance() {
  const toast = useToast()
  const modal = useModal()

  function openWarrant(w: typeof WARRANTS[number]) {
    modal.open({
      title: <span>Warrant · {w.id}</span>,
      body: (
        <div className="space-y-3 text-[12.5px] text-slate-300">
          <div className="rounded-md border border-cyber-500/20 bg-cyber-500/5 p-3">
            <div className="font-display text-[16px] text-cyber-200">{w.subj}</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-slate-500">{w.court}</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Granted</div><div className="mt-1 font-display text-[14px] text-cyber-200">{w.granted}</div></div>
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Expires</div><div className="mt-1 font-display text-[14px] text-amber-300">{w.expires}</div></div>
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Scope</div><div className="mt-1 font-display text-[14px] text-cyber-200">{w.scope}</div></div>
          </div>
          <p>Warrant enforces the data-access policy gate. Any query outside the granted scope is denied automatically and logged to the WORM audit ledger.</p>
        </div>
      ),
      footer: (
        <>
          <button className="btn-hud" onClick={() => { modal.close(); toast.info('Extension requested', 'Renewal filing prepared for court') }}>Request extension</button>
          <button className="btn-hud" onClick={() => { modal.close(); toast.success('Warrant exported', 'PDF sealed for counsel') }}>Export</button>
        </>
      )
    })
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Legal, Ethical & Sovereign Governance"
        subtitle="Court oversight · privacy-preserving AI · independent audit · citizen redress"
        chips={[{ label: 'OVERSIGHT BOARD', tone: 'violet' }, { label: 'FOI COMPLIANT', tone: 'green' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Active warrants"   value={WARRANTS.length.toString()} delta="court-authorized" icon={<Gavel />} />
          <StatCard label="Policy gates"       value="214"   delta="enforced by runtime" icon={<Lock />} tone="violet" />
          <StatCard label="Analyst quorums"    value="2-of-N" delta="for PEP escalation"  icon={<UserCheck2 />} tone="amber" />
          <StatCard label="Oversight audits"    value="4 / yr" delta="external + internal" icon={<Eye />} tone="green" />
          <StatCard label="Citizen redress"    value="1,208"  delta="resolved · ombuds"    icon={<BookOpenCheck />} tone="cyber" sparkline={[40,52,58,64,66,70,74,80,84,86,88,90]} />
          <StatCard label="Rights violations"   value="0"    delta="verified complaints" icon={<AlertOctagon />} tone="green" />
        </div>

        {/* Controls */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Governance controls" icon={<Scale className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-7" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CONTROL</th>
                  <th>OWNER</th>
                  <th>STATUS</th>
                  <th>CADENCE</th>
                </tr>
              </thead>
              <tbody>
                {GOVERNANCE_CONTROLS.map(g => (
                  <tr key={g.id}>
                    <td className="font-mono text-slate-500">{g.id}</td>
                    <td className="text-slate-200">{g.control}</td>
                    <td className="text-slate-400">{g.owner}</td>
                    <td>
                      <span className={
                        g.status === 'ENFORCED' ? 'chip chip-green' :
                        g.status === 'SCHEDULED' ? 'chip chip-violet' :
                        'chip chip-amber'
                      }>{g.status}</span>
                    </td>
                    <td className="text-slate-400">{g.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Ethical posture snapshot" icon={<Eye className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-5">
            <RadarChart
              axes={['Legality', 'Privacy', 'Fairness', 'Transparency', 'Accountability', 'Redress']}
              values={[98, 94, 91, 93, 96, 89]}
            />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <InlineStat label="Fairness audit" value="Q2 · Passed" sub="bias ≤ 1.2% across segments" tone="ok" />
              <InlineStat label="DP ε (dashboards)" value="ε = 1.4" sub="differential privacy" tone="violet" />
              <InlineStat label="k-anonymity" value="k = 25" sub="aggregate exports" tone="violet" />
            </div>
          </Panel>
        </div>

        {/* Warrants + rights check */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Active warrants & judicial authorizations" icon={<Gavel className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-7" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>W-ID</th>
                  <th>SUBJECT</th>
                  <th>COURT</th>
                  <th>GRANTED</th>
                  <th>EXPIRES</th>
                  <th>SCOPE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {WARRANTS.map(w => (
                  <tr key={w.id} className="cursor-pointer" onClick={() => openWarrant(w)}>
                    <td className="font-mono text-slate-500">{w.id}</td>
                    <td className="text-slate-200">{w.subj}</td>
                    <td>{w.court}</td>
                    <td className="text-slate-500">{w.granted}</td>
                    <td className="text-amber-300">{w.expires}</td>
                    <td className="text-cyber-300">{w.scope}</td>
                    <td><span className="chip chip-green">{w.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Rights & oversight check (live)" icon={<UserCheck2 className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-5">
            <ul className="space-y-2">
              {RIGHTS.map(r => (
                <li key={r.q} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11.5px] text-slate-300">{r.q}</div>
                    <span className="chip chip-green shrink-0">{r.a}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Privacy tech + oversight board */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Privacy-preserving tech stack" icon={<Lock className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                { k: 'Homomorphic enclaves (CKKS)',  d: 'Compute on encrypted balances without decryption.', c: '#a78bfa' },
                { k: 'Secure multi-party compute',   d: 'Join across agencies without revealing raw records.', c: '#22d3ee' },
                { k: 'Differential privacy (ε-DP)',    d: 'All aggregate dashboards served with ε ≤ 1.5.', c: '#10b981' },
                { k: 'Tokenization · pseudonymity', d: 'PII stored only as cryptographic handles in analytics.', c: '#22d3ee' },
                { k: 'Policy-bound analytics',       d: 'Queries run only with an attached purpose + warrant.', c: '#f59e0b' },
                { k: 'Zero-knowledge proofs',         d: 'Prove compliance without revealing underlying data.', c: '#a78bfa' }
              ].map(x => (
                <div key={x.k} className="rounded-sm border p-2.5" style={{ borderColor: x.c + '40', background: 'rgba(3,6,12,0.5)' }}>
                  <div className="font-display text-[12px]" style={{ color: x.c }}>{x.k}</div>
                  <div className="mt-1 text-[10.5px] text-slate-400">{x.d}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Independent oversight board" icon={<Scroll className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6">
            <div className="space-y-2">
              {[
                { k: 'Judicial member', v: 'Hon. Justice U. Afolabi (Court of Appeal, ret.)' },
                { k: 'Privacy commissioner', v: 'Advocate O. Ibikunle (SAN)' },
                { k: 'AI ethics chair',      v: 'Prof. K. Eze · University of Lagos' },
                { k: 'Civil society', v: 'Coalition Against Corrupt Leaders representative' },
                { k: 'National Assembly liaison', v: 'Select Committee on Financial Crimes' },
                { k: 'External auditor',           v: 'Big-4 rotation · bi-annual certification' }
              ].map(m => (
                <div key={m.k} className="flex items-center justify-between rounded-sm border border-cyber-500/10 bg-ink-900/40 p-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{m.k}</span>
                  <span className="text-[11.5px] text-slate-200">{m.v}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <InlineStat label="Meetings / yr" value="12" sub="quarterly public report" tone="violet" />
              <InlineStat label="Unresolved finding" value="0" sub="closed within SLA" tone="ok" />
            </div>
          </Panel>
        </div>

        {/* Disclosure */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Citizen redress & freedom-of-information" icon={<BookOpenCheck className="h-3.5 w-3.5" />} className="col-span-12">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">Redress channel</div>
                <div className="space-y-2">
                  <BarGauge label="Complaints intake (90d)" value={1412} max={2000} color="#22d3ee" right="1,412" />
                  <BarGauge label="Resolved within SLA"     value={1208} max={1412} color="#10b981" right="1,208 (86%)" />
                  <BarGauge label="Rejected (frivolous / fraud)" value={118} max={1412} color="#f59e0b" right="118" />
                  <BarGauge label="Escalated to Ombuds"      value={86}  max={1412} color="#a78bfa" right="86" />
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">FOI request pipeline</div>
                <div className="space-y-2">
                  <BarGauge label="Requests (FY)"     value={7320} max={8000} color="#22d3ee" right="7,320" />
                  <BarGauge label="Within statutory 7 days" value={7088} max={7320} color="#10b981" right="96.8%" />
                  <BarGauge label="Partial disclosure" value={411}  max={7320} color="#f59e0b" right="411" />
                  <BarGauge label="Refused (exempt)"   value={112}  max={7320} color="#ef4444" right="112" />
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">Key policies</div>
                <ul className="list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-slate-300">
                  <li>EFCC Act 2004 · ss. 38, 46 (powers + oversight)</li>
                  <li>Money Laundering (Prevention &amp; Prohibition) Act 2022</li>
                  <li>Cybercrimes (Prohibition &amp; Prevention) Act 2015</li>
                  <li>Nigeria Data Protection Act 2023</li>
                  <li>Freedom of Information Act 2011</li>
                  <li>Evidence Act 2011 · §84 (electronic evidence)</li>
                  <li>Mutual Assistance in Criminal Matters Act 2019</li>
                </ul>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
