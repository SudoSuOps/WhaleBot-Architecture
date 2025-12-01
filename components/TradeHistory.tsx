import React from 'react';
import { ClosedTrade } from '../types';
import { ShieldCheck, ExternalLink, Hash, Clock } from 'lucide-react';
interface TradeHistoryProps { history: ClosedTrade[]; }
const TradeHistory: React.FC<TradeHistoryProps> = ({ history }) => {
  if (history.length === 0) return (<div className="bg-whale-800 border border-whale-700 rounded-xl p-8 text-center"><p className="text-slate-500">No closed trades recorded.</p></div>);
  return (<div className="bg-whale-800 border border-whale-700 rounded-xl overflow-hidden shadow-lg mt-6"><table className="w-full text-left text-sm"><tbody className="divide-y divide-whale-700">{history.map((trade) => (<tr key={trade.id}><td className="p-4 font-bold text-white">{trade.asset}</td><td className={`p-4 text-right font-mono font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{trade.pnl.toFixed(2)}</td><td className="p-4"><div className="flex items-center gap-2 group cursor-pointer" title={trade.hash}><Hash size={14} className="text-trenchGold-500" /><span className="font-mono text-[10px] text-slate-500">{trade.hash.substring(0, 8)}...</span></div></td></tr>))}</tbody></table></div>);
};
export default TradeHistory;
