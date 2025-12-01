import React, { useState, useEffect } from 'react';
import { BotConfig, BotStatus, Position, ClosedTrade } from '../types';
import { getBotStatus } from '../services/aiService';
import { Brain, Sliders, Zap, Activity, ShieldAlert, Terminal, Power, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
interface WhaleBotViewProps { botPositions: Position[]; botHistory: ClosedTrade[]; botVault: { balance: number; initial: number }; }
const WhaleBotView: React.FC<WhaleBotViewProps> = ({ botPositions, botHistory, botVault }) => {
  const [config, setConfig] = useState<BotConfig>({ active: true, riskProfile: 'BALANCED', assets: ['BTC', 'ETH'], modules: { volatilityCrush: true, fundingArb: false, trendFollowing: true, orderbookImbalance: true }, maxDrawdown: 5, autoHedge: true });
  const [status, setStatus] = useState<BotStatus>({ regime: 'CHOP_SIDEWAYS', bias: 'FLAT', lastThinking: [], activeOrders: 0, uptime: 0 });
  useEffect(() => { const interval = setInterval(() => { const newStatus = getBotStatus(); setStatus(prev => ({ ...newStatus, lastThinking: [...newStatus.lastThinking, ...prev.lastThinking].slice(0, 50) })); }, 2000); return () => clearInterval(interval); }, []);
  return (
    <div className="space-y-6">
        <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 flex justify-between items-center"><div className="flex items-center gap-3"><Brain className="text-diamond-500" size={32} /><h1 className="text-2xl font-black text-white tracking-wide">WHALEBOT INTELLIGENCE</h1></div><button onClick={() => setConfig(c => ({...c, active: !c.active}))} className={`px-4 py-2 rounded-lg font-bold border ${config.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>{config.active ? 'SYSTEM ARMED' : 'DISARMED'}</button></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6"><div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-white font-bold mb-4">MARKET REGIME</h3><div className="text-center py-6 bg-whale-900 rounded-lg"><p className="text-2xl font-black text-emerald-400">{status.regime}</p></div></div><div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-white font-bold mb-4">DIRECTIONAL BIAS</h3><div className="flex gap-2"><div className={`flex-1 h-12 rounded flex items-center justify-center font-bold ${status.bias === 'LONG' ? 'bg-emerald-600' : 'bg-whale-900'}`}>LONG</div><div className={`flex-1 h-12 rounded flex items-center justify-center font-bold ${status.bias === 'SHORT' ? 'bg-rose-600' : 'bg-whale-900'}`}>SHORT</div></div></div></div>
            <div className="lg:col-span-1 space-y-6"><div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-white font-bold mb-4">VAULT STATE</h3><div className="flex justify-between items-end mb-4"><div><p className="text-xs text-slate-500">Balance</p><p className="text-2xl font-mono font-bold text-white">${botVault.balance.toLocaleString()}</p></div></div><div className="pt-4 border-t border-whale-700"><p className="text-xs text-slate-500 mb-2">Active Bot Positions</p><div className="space-y-2 max-h-32 overflow-y-auto">{botPositions.map(pos => (<div key={pos.id} className="flex justify-between bg-whale-900 p-2 rounded"><span className="text-xs font-bold text-white">{pos.asset}</span><span className={`text-xs ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pos.pnl.toFixed(2)}</span></div>))}</div></div></div></div>
            <div className="lg:col-span-1 bg-black rounded-xl border border-whale-700 p-4 font-mono text-xs flex flex-col h-[600px]"><div className="flex-1 overflow-y-auto space-y-1">{status.lastThinking.map((log, i) => (<div key={i} className="break-all"><span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> <span className="text-trenchGold-400">{'>'}</span> <span className="text-slate-300">{log}</span></div>))}</div></div>
        </div>
    </div>
  );
};
export default WhaleBotView;
