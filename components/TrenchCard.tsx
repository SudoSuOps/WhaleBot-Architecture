import React from 'react';
import { Share2, Cpu } from 'lucide-react';
import { WhaleLogoIcon } from './BrandAssets';
interface TrenchCardProps { vaultEquity: number; winRate: number; ensName: string; }
const TrenchCard: React.FC<TrenchCardProps> = ({ vaultEquity, winRate, ensName }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-whale-900 to-black border border-trenchGold-500/50 shadow-[0_0_40px_rgba(255,215,0,0.1)] group hover:shadow-[0_0_60px_rgba(255,215,0,0.2)] transition-all duration-500">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-trenchGold-500/5 to-trenchPurple-500/10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-trenchGold-500/10 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3"><div className="p-2 bg-whale-800 rounded-lg border border-whale-700 shadow-inner"><WhaleLogoIcon className="w-8 h-8" /></div><div><h3 className="text-sm font-black text-trenchGold-500 tracking-[0.2em] uppercase">Trench Pass</h3><p className="text-[9px] text-slate-500 font-mono">ALPHA ACCESS // TIER 1</p></div></div>
            <div className="text-right"><div className="inline-block px-3 py-1.5 rounded-lg bg-whale-950/80 border border-whale-700 backdrop-blur-md shadow-lg"><span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{ensName}</span></div><div className="flex items-center justify-end gap-1 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[9px] text-emerald-500/80 font-bold uppercase">Verified</span></div></div>
        </div>
        <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-whale-800/40 rounded-lg p-3 border border-whale-700/50 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm"><div className="absolute top-0 right-0 p-2 opacity-10 text-white"><Cpu size={40} /></div><span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Compute Node</span><div className="font-mono text-white font-bold text-xs flex items-center gap-2 mt-2"><span className="w-1.5 h-1.5 bg-trenchGold-500 rounded-full shadow-[0_0_5px_#ffd700]"></span>6x 5090 CLUSTER</div></div>
             <div className="flex-1 bg-whale-800/40 rounded-lg p-3 border border-whale-700/50 flex flex-col justify-between backdrop-blur-sm"><span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Win Rate</span><div className="font-mono text-trenchGold-400 font-black text-xl mt-1">{winRate}%</div></div>
        </div>
        <div className="mb-6 relative"><p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Total Vault Equity</p><p className="text-3xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">${vaultEquity.toLocaleString()}</p><div className="absolute -bottom-4 right-0 opacity-10"><WhaleLogoIcon className="w-24 h-24" /></div></div>
        <div className="flex items-center justify-between border-t border-whale-800 pt-4 mt-2"><div className="text-[10px] text-slate-500 font-mono">REF: <span className="text-white font-bold select-all cursor-copy">WHALE-9031</span></div><button className="flex items-center gap-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors text-white"><Share2 size={12} /> SHARE ALPHA</button></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-trenchGold-500 via-trenchPurple-500 to-diamond-500"></div>
    </div>
  );
};
export default TrenchCard;
