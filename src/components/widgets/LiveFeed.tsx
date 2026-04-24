import { useEffect, useState } from 'react'
import { genTransaction, type Transaction, formatNaira, riskColor, riskTextClass } from '../../data/mockData'
import { ArrowRight } from 'lucide-react'

export function LiveTransactionFeed({ rows = 10, hz = 1000, showHeader = true }: { rows?: number; hz?: number; showHeader?: boolean }) {
  const [txs, setTxs] = useState<Transaction[]>(() => Array.from({ length: rows }, () => genTransaction()))
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setTxs(prev => [genTransaction(), ...prev].slice(0, rows))
    }, hz)
    return () => clearInterval(t)
  }, [paused, rows, hz])

  return (
    <div>
      {showHeader && (
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="blink-dot h-1.5 w-1.5 bg-red-400 text-red-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-300">Live Transaction Stream</span>
          </div>
          <button
            onClick={() => setPaused(p => !p)}
            className="btn-hud !py-0.5 !px-2 !text-[9px]"
          >{paused ? 'Resume' : 'Pause'}</button>
        </div>
      )}
      <div className="overflow-hidden rounded-sm border border-cyber-500/10 bg-ink-900/40">
        <table className="data-table">
          <thead>
            <tr>
              <th>TIME</th>
              <th>FROM</th>
              <th>→</th>
              <th>TO</th>
              <th className="text-right">AMOUNT</th>
              <th>RAIL</th>
              <th>RISK</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {txs.map((t, i) => (
              <tr key={t.id + i}>
                <td className="text-slate-500">{new Date(t.ts).toLocaleTimeString('en-GB')}</td>
                <td className="max-w-[120px] truncate text-slate-200">{t.from}</td>
                <td className="text-cyber-400"><ArrowRight className="inline h-3 w-3" /></td>
                <td className="max-w-[120px] truncate text-slate-200">{t.to}</td>
                <td className={'text-right font-semibold ' + riskTextClass(t.risk)}>
                  {t.currency === 'NGN' ? formatNaira(t.amount) : `${(t.amount / 1e6).toFixed(2)}M ${t.currency}`}
                </td>
                <td><span className="chip">{t.rail}</span></td>
                <td><span className="chip" style={{ borderColor: riskColor(t.risk), color: riskColor(t.risk) }}>{t.risk}</span></td>
                <td>
                  <span className={
                    t.status === 'FROZEN'      ? 'chip chip-red' :
                    t.status === 'FLAGGED'     ? 'chip chip-amber' :
                    t.status === 'UNDER_REVIEW' ? 'chip chip-violet' :
                    'chip chip-green'
                  }>{t.status.replace('_', ' ')}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
