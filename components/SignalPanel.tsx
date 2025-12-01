import React from 'react';
import { TradeSignal } from '../types';
import { Brain, TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { WHALE_CONFIG } from '../constants';
interface SignalPanelProps { signal: TradeSignal | null; loading: boolean; onRefresh: () => void; }
const SignalPanel: React.FC<SignalPanelProps> = ({ signal, loading, onRefresh }) => {
  if (!signal) return (<div className="h-full flex items-center justify-center bg-whale-800 border border-whale-700 rounded-xl p-6"><Activity className="w-12 h-12 text-whale-600 animate-pulse" /></div>);
  const isLong = signal.direction === 'LONG';
  return (<div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><div className="flex justify-between items-center mb-6"><div className={`flex items-center gap-2 text-3xl font-bold ${isLong ? 'text-emerald-400' : 'text-rose-400'}`}><span>{signal.direction}</span></div><div className="text-3xl font-bold font-mono text-white">{signal.confidence}%</div></div><p className="text-slate-300 italic">{signal.reasoning}</p></div>);
};
export default SignalPanel;
