import React, { useEffect, useState } from 'react';
import { Cpu, Zap, Server, Activity, Layers, Thermometer, Database } from 'lucide-react';
import { SystemStatus } from '../types';
import { getSystemTelemetry } from '../services/aiService';

const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState<SystemStatus>({ gpuNodes: [], cpuLoad: 0, memoryUsage: 0, volatilityIndex: 50, playbookStream: [] });
  useEffect(() => { const interval = setInterval(() => { const newStats = getSystemTelemetry(); setStats(prev => ({ ...newStats, playbookStream: [...newStats.playbookStream, ...prev.playbookStream].slice(0, 5) })); }, 1000); return () => clearInterval(interval); }, []);
  const getLoadColor = (load: number) => load < 50 ? 'bg-emerald-500' : load < 80 ? 'bg-trenchGold-500' : 'bg-rose-500';
  return (
    <div className="space-y-6">
      <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10"><div className="flex items-center gap-3"><Zap className="text-trenchGold-500" size={24} /><h2 className="text-xl font-bold text-white tracking-wide">COMPUTE INFRASTRUCTURE <span className="text-slate-500 text-sm font-mono ml-2">6x RTX 5090 CLUSTER</span></h2></div><div className="flex gap-4 text-xs font-mono text-slate-400"><div><Cpu size={14} /> XEON W-3475X: <span className="text-white">{stats.cpuLoad.toFixed(1)}%</span></div><div><Database size={14} /> FURY ECC: <span className="text-white">{stats.memoryUsage.toFixed(1)}GB</span></div></div></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {stats.gpuNodes.map((node) => (
                <div key={node.id} className="bg-whale-900/80 border border-whale-700 rounded-lg p-3 relative group hover:border-trenchGold-500/50">
                    <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-bold text-slate-500 font-mono">GPU-0{node.id}</span><div className="text-[10px] text-emerald-400"><Thermometer size={10} /> {node.temp.toFixed(0)}°C</div></div>
                    <div className="mb-2"><div className="w-full h-1.5 bg-whale-950 rounded-full overflow-hidden"><div className={`h-full ${getLoadColor(node.computeLoad)} transition-all`} style={{width: `${node.computeLoad}%`}}></div></div></div>
                    <div className="mt-2 pt-2 border-t border-whale-800"><p className="text-[9px] text-trenchGold-500/80 font-mono truncate animate-pulse">{'>'} {node.task}</p></div>
                </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-whale-800 border border-whale-700 rounded-xl p-6 flex flex-col"><div className="flex items-center gap-3 mb-4"><Activity className="text-rose-500" size={20} /><h3 className="font-bold text-white">MARKET TENSION</h3></div><div className="flex-1 flex flex-col justify-center items-center py-4"><p className="text-4xl font-black text-white font-mono">{stats.volatilityIndex.toFixed(1)}</p><p className="text-sm font-bold mt-1 text-trenchGold-500">VOLATILITY INDEX</p></div></div>
          <div className="lg:col-span-2 bg-whale-900 border border-trenchPurple-500/30 rounded-xl p-6 relative overflow-hidden"><div className="flex items-center gap-3 mb-4"><Layers className="text-trenchPurple-500" size={20} /><h3 className="font-bold text-white">LIVE PLAYBOOK</h3></div><div className="space-y-3 max-h-48 overflow-y-auto">{stats.playbookStream.map((entry) => (<div key={entry.id} className="flex gap-3 items-start animate-in slide-in-from-right"><span className="text-slate-600 font-mono text-xs pt-1">{new Date(entry.timestamp).toLocaleTimeString()}</span><div className="flex-1 bg-whale-800/50 p-2 rounded border border-whale-700"><p className="text-sm text-slate-300 font-mono">{entry.insight}</p></div></div>))}</div></div>
      </div>
    </div>
  );
};
export default SystemMonitor;
