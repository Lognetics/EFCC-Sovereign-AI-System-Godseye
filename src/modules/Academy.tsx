import { GraduationCap, Users, Award, Rocket, Building2, Medal, Briefcase } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { TRAINING_PROGRAMS } from '../data/mockData'
import { BarGauge, DonutChart } from '../components/widgets/Charts'

const PARTNERSHIPS = [
  { k: 'Chainalysis Academy', d: 'Blockchain tracing certification · co-badged' },
  { k: 'Cellebrite Academy',   d: 'Mobile & cloud forensics certification' },
  { k: 'Magnet Forensics',     d: 'Advanced evidence analysis · instructor cadre' },
  { k: 'INTERPOL Global Academy', d: 'Cross-border investigation exchange' },
  { k: 'Nigerian Bar Association', d: 'Prosecution dossier CLE programs' },
  { k: 'National Judicial Institute', d: 'Bench training on digital evidence' },
  { k: 'Covenant University', d: 'Sovereign AI research pipeline' },
  { k: 'University of Lagos · Data Science', d: 'Graduate internships · faculty loan' },
  { k: 'Federal Government IPPIS', d: 'Personnel sourcing · career track' }
]

const ROLES = [
  { role: 'Blockchain analyst',      seats: 94,  filled: 74, tier: 'Tier-2' },
  { role: 'AI / ML engineer',        seats: 86,  filled: 52, tier: 'Tier-3' },
  { role: 'Digital forensic examiner', seats: 112, filled: 96, tier: 'Tier-2' },
  { role: 'Graph analyst',           seats: 40,  filled: 24, tier: 'Tier-3' },
  { role: 'Investigator (Financial crime)', seats: 420, filled: 402, tier: 'Tier-1' },
  { role: 'Cybersecurity engineer',   seats: 72,  filled: 61, tier: 'Tier-3' },
  { role: 'Legal officer (Evidence Act)', seats: 58,  filled: 58, tier: 'Tier-1' },
  { role: 'Data engineer',           seats: 48,  filled: 31, tier: 'Tier-2' }
]

export function Academy() {
  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Human Capital & EFCC AI Academy"
        subtitle="Building the expertise behind sovereign financial intelligence"
        chips={[{ label: '7 PROGRAMS', tone: 'violet' }, { label: 'CONTINUOUS EDUCATION', tone: 'green' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Officers enrolled"   value="1,490"  delta="across 7 programs" icon={<Users />} />
          <StatCard label="Graduates"            value="1,190"  delta="fiscal year"       icon={<Award />} tone="green" />
          <StatCard label="Certifications"       value="3,218"  delta="issued · cumulative" icon={<Medal />} tone="violet" />
          <StatCard label="Active instructors"   value="86"     delta="internal + external" icon={<Briefcase />} />
          <StatCard label="Training hours / officer" value="214" delta="annualized average" icon={<Rocket />} />
          <StatCard label="Partner institutions" value="18"    delta="global + domestic"    icon={<Building2 />} tone="cyber" />
        </div>

        {/* Programs */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Flagship programs" icon={<GraduationCap className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-8" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>PROGRAM</th>
                  <th>LEVEL</th>
                  <th>WEEKS</th>
                  <th>ENROLLED</th>
                  <th>GRADUATED</th>
                  <th>ACCREDITATION</th>
                </tr>
              </thead>
              <tbody>
                {TRAINING_PROGRAMS.map(p => (
                  <tr key={p.code}>
                    <td className="font-mono text-slate-500">{p.code}</td>
                    <td className="text-slate-200">{p.name}</td>
                    <td>
                      <span className={
                        p.level === 'Tier-1' ? 'chip chip-green' :
                        p.level === 'Tier-2' ? 'chip' :
                        p.level === 'Tier-3' ? 'chip chip-amber' :
                        'chip chip-red'
                      }>{p.level}</span>
                    </td>
                    <td>{p.weeks}</td>
                    <td className="text-cyber-300">{p.enrolled}</td>
                    <td className="text-emerald-300">{p.graduated}</td>
                    <td className="text-slate-400">{p.accred}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Capability mix" icon={<Award className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-4">
            <DonutChart size={220} data={[
              { label: 'Financial investigation',    value: 34, color: '#22d3ee' },
              { label: 'Blockchain intelligence',     value: 14, color: '#eab308' },
              { label: 'Digital forensics',           value: 18, color: '#a78bfa' },
              { label: 'AI / ML engineering',         value: 10, color: '#10b981' },
              { label: 'Cybersecurity',               value: 12, color: '#ef4444' },
              { label: 'Legal · prosecution',         value: 12, color: '#f59e0b' }
            ]} />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <InlineStat label="Internal mobility" value="27%" sub="officers upskilled / yr" tone="ok" />
              <InlineStat label="Retention · Tier-3" value="94%" sub="12-month" tone="violet" />
            </div>
          </Panel>
        </div>

        {/* Role capacity */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Role capacity — current vs target" icon={<Users className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-7">
            <div className="space-y-2">
              {ROLES.map(r => (
                <div key={r.role}>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-slate-400">{r.role} · <span className="text-slate-500">{r.tier}</span></span>
                    <span className="text-cyber-300">{r.filled} / {r.seats}</span>
                  </div>
                  <div className="progress-track mt-1">
                    <div className="progress-fill" style={{ width: (r.filled / r.seats) * 100 + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Partner institutions" icon={<Building2 className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-5">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {PARTNERSHIPS.map(p => (
                <div key={p.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
                  <div className="font-display text-[12px] text-cyber-200">{p.k}</div>
                  <div className="mt-1 text-[10.5px] text-slate-400">{p.d}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Career track */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Career track · Elite Financial Intelligence Officer" icon={<Rocket className="h-3.5 w-3.5" />} className="col-span-12">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {[
                { k: 'Year 1 · Foundations', t: 'Tier-1', items: ['EAI-101 · Foundations', 'ELG-150 · Legal & Ethics', '90-day operational rotation', 'BVN/NIN & banking system immersion'] },
                { k: 'Year 2 · Specialization', t: 'Tier-2', items: ['EBC-201 · Blockchain', 'EDF-202 · Forensics', 'EFCC Radar shadowing', 'Mentor pairing with ACP+'] },
                { k: 'Year 3 · Mastery',       t: 'Tier-3', items: ['EGN-301 · Graph', 'ECS-303 · Cybersecurity', 'Co-author sovereign model paper', 'International exchange · INTERPOL'] },
                { k: 'Year 4 · Leadership',    t: 'Tier-4', items: ['EPR-401 · Prosecution dossier', 'Run 3 cases end-to-end', 'Represent EFCC at FATF plenary', 'Mentor new analysts'] }
              ].map(c => (
                <div key={c.k} className="relative rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[12.5px] text-cyber-200">{c.k}</div>
                    <span className="chip chip-violet">{c.t}</span>
                  </div>
                  <ul className="mt-2 list-disc space-y-0.5 pl-4 text-[11px] text-slate-300">
                    {c.items.map(x => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
