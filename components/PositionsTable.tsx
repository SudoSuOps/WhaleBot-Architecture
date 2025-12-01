import React, { useState } from 'react';
import { Position } from '../types';
import { TrendingUp, TrendingDown, XCircle, Anchor } from 'lucide-react';
interface PositionsTableProps { positions: Position[]; onClosePosition: (id: string) => void; }
const PositionsTable: React.FC<PositionsTableProps> = ({ positions, onClosePosition }) => {
  const [confirmCloseId, setConfirmCloseId] = useState<string | null>(null);
  if (positions.length === 0) return (<div className="bg-whale-800 border border-whale-700 rounded-xl p-12 text-center"><Anchor className="text-whale-700 w-12 h-12 mx-auto mb-4" /><p className="text-slate-500">No active positions.</p></div>);
  return (
    <>
        <div className="bg-whale-800 border border-trenchPurple-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]"><table className="w-full text-left text-sm"><thead className="bg-whale-900 text-slate-400"><tr><th className="p-4">Asset</th><th className="p-4">Side</th><th className="p-4">Size</th><th className="p-4">Entry / Mark</th><th className="p-4 text-right">PnL</th><th className="p-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-whale-700">{positions.map((pos) => (<tr key={pos.id} className="hover:bg-whale-700/30"><td className="p-4 font-bold text-white">{pos.asset}</td><td className="p-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${pos.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{pos.type === 'LONG' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{pos.type}</span></td><td className="p-4 font-mono text-slate-300">${pos.size}<div className="text-[10px] text-slate-500">{pos.leverage}x</div></td><td className="p-4 font-mono"><div className="text-slate-400">${pos.entryPrice}</div><div className="text-white font-bold">${pos.currentPrice}</div></td><td className={`p-4 font-mono font-bold text-right ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}><div>{pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}</div><div className="text-xs">({pos.pnlPercent.toFixed(2)}%)</div></td><td className="p-4 text-right"><button onClick={() => setConfirmCloseId(pos.id)} className="p-2 hover:bg-rose-500/20 rounded-lg text-slate-500 hover:text-rose-400"><XCircle size={18} /></button></td></tr>))}</tbody></table></div>
        {confirmCloseId && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"><div className="bg-whale-900 border border-whale-700 p-6 rounded-xl"><h3 className="text-xl font-bold text-white mb-4">Close Position?</h3><div className="flex gap-3"><button onClick={() => setConfirmCloseId(null)} className="px-4 py-2 rounded text-slate-300 hover:bg-whale-800">Cancel</button><button onClick={() => { onClosePosition(confirmCloseId); setConfirmCloseId(null); }} className="px-4 py-2 rounded bg-rose-600 text-white font-bold">CONFIRM</button></div></div></div>)}
    </>
  );
};
export default PositionsTable;
