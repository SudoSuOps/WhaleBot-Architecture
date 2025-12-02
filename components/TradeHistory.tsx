
import React from 'react';
import { ClosedTrade } from '../types';
import { ShieldCheck, ExternalLink, Hash, Clock } from 'lucide-react';

interface TradeHistoryProps {
  history: ClosedTrade[];
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ history }) => {
  if (history.length === 0) {
      return (
          <div className="bg-whale-800 border border-whale-700 rounded-xl p-8 text-center">
              <p className="text-slate-500">No closed trades recorded in the verifiable ledger yet.</p>
          </div>
      );
  }

  return (
    <div className="bg-whale-800 border border-whale-700 rounded-xl overflow-hidden shadow-lg mt-6">
      <div className="p-4 border-b border-whale-700 bg-gradient-to-r from-whale-900 to-whale-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={20} />
            <h3 className="font-bold text-white tracking-wide">TRANSPARENCY LEDGER</h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">IMMUTABLE RECORD</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-whale-900 text-slate-400">
            <tr>
              <th className="p-4 text-xs uppercase tracking-wider">Time</th>
              <th className="p-4 text-xs uppercase tracking-wider">Asset</th>
              <th className="p-4 text-xs uppercase tracking-wider">Side</th>
              <th className="p-4 text-xs uppercase tracking-wider text-right">Entry</th>
              <th className="p-4 text-xs uppercase tracking-wider text-right">Exit</th>
              <th className="p-4 text-xs uppercase tracking-wider text-right">PnL</th>
              <th className="p-4 text-xs uppercase tracking-wider text-center">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-whale-700">
            {history.map((trade) => (
              <tr key={trade.id} className="hover:bg-whale-700/30 transition-colors">
                <td className="p-4 text-slate-400 font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <Clock size={12} />
                        {new Date(trade.closeTimestamp).toLocaleTimeString()}
                    </div>
                </td>
                <td className="p-4 font-bold text-white">{trade.asset}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trade.type}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-slate-300">${trade.entryPrice.toLocaleString()}</td>
                <td className="p-4 text-right font-mono text-slate-300">${trade.exitPrice.toLocaleString()}</td>
                <td className={`p-4 text-right font-mono font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString()} ({trade.pnlPercent.toFixed(2)}%)
                </td>
                <td className="p-4">
                    <div className="flex items-center justify-center gap-2 group cursor-pointer" title={trade.hash}>
                        <Hash size={14} className="text-trenchGold-500" />
                        <span className="font-mono text-[10px] text-slate-500 group-hover:text-trenchGold-400 transition-colors">
                            {trade.hash.substring(0, 8)}...{trade.hash.substring(trade.hash.length - 8)}
                        </span>
                        <ExternalLink size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
