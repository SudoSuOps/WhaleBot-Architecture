
import React, { useEffect, useState } from 'react';
import { Cpu, Zap, HardDrive, Database, Activity, Terminal, Layers, Thermometer, Wind, Server, ShieldCheck, Wallet, ArrowRight, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { SystemStatus, GpuNode, WhaleTransaction, QuantMetrics } from '../types';

interface SystemMonitorProps {
    stats: SystemStatus;
}

const SystemMonitor: React.FC<SystemMonitorProps> = ({ stats }) => {
  const [whaleLog, setWhaleLog] = useState<WhaleTransaction[]>([]);

  // Update scrolling whale feed from props
  useEffect(() => {
      if (stats.whaleFeed && stats.whaleFeed.length > 0) {
          setWhaleLog(prev => {
              // Deduplicate based on ID just in case
              const newIds = new Set(stats.whaleFeed.map(t => t.id));
              const filteredPrev = prev.filter(t => !newIds.has(t.id));
              return [...stats.whaleFeed, ...filteredPrev].slice(0, 10);
          });
      }
  }, [stats.whaleFeed]);

  const getLoadColor = (load: number) => {
      if (load < 50) return 'bg-emerald-500';
      if (load < 80) return 'bg-trenchGold-500';
      return 'bg-rose-500';
  };

  const getProbColor = (score: number) => {
      if (score > 0.7) return 'text-emerald-400';
      if (score < 0.3) return 'text-rose-400';
      return 'text-slate-400';
  };

  const getProbLabel = (score: number) => {
      if (score > 0.7) return 'STRONG LONG';
      if (score > 0.55) return 'LONG LEAN';
      if (score < 0.3) return 'STRONG SHORT';
      if (score < 0.45) return 'SHORT LEAN';
      return 'NEUTRAL WAIT';
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: INFRASTRUCTURE RACK (6x GPU) */}
      <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Server size={200} />
        </div>
        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
                <Zap className="text-trenchGold-500" size={24} />
                <h2 className="text-xl font-bold text-white tracking-wide">COMPUTE INFRASTRUCTURE <span className="text-slate-500 text-sm font-mono ml-2">6x RTX 5090 CLUSTER</span></h2>
            </div>
            <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1">
                    <Cpu size={14} /> XEON W-3475X: <span className="text-white">{stats.cpuLoad.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400/80">
                    <Database size={14} /> FURY ECC: <span className="text-white">{stats.memoryUsage.toFixed(1)}GB</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {stats.gpuNodes.map((node) => (
                <div key={node.id} className="bg-whale-900/80 border border-whale-700 rounded-lg p-3 relative group hover:border-trenchGold-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-slate-500 font-mono">GPU-0{node.id}</span>
                        <div className="text-[10px] text-emerald-400"><Thermometer size={10} /> {node.temp.toFixed(0)}°C</div>
                    </div>
                    
                    {/* Load Bar */}
                    <div className="mb-2">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                            <span>LOAD</span>
                            <span className="text-white">{node.computeLoad.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-whale-950 rounded-full overflow-hidden">
                            <div className={`h-full ${getLoadColor(node.computeLoad)} transition-all duration-500`} style={{width: `${node.computeLoad}%`}}></div>
                        </div>
                    </div>

                    {/* Task */}
                    <div className="mt-2 pt-2 border-t border-whale-800">
                         <p className="text-[9px] text-trenchGold-500/80 font-mono truncate animate-pulse">{'>'} {node.task}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SECTION 2: QUANT ENGINE (PROBABILITY) */}
          <div className="lg:col-span-1 bg-whale-800 border border-whale-700 rounded-xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 p-4"><Target size={120} /></div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                  <Activity className="text-diamond-500" size={20} />
                  <h3 className="font-bold text-white">QUANT ENGINE <span className="text-xs text-slate-500 font-mono ml-1">PROBABILITY</span></h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center py-4 relative z-10">
                   {/* Probability Gauge */}
                   <div className="relative w-48 h-24 overflow-hidden mb-4">
                       <div className="absolute top-0 left-0 w-full h-full bg-whale-900 rounded-t-full border-t-8 border-l-8 border-r-8 border-whale-700"></div>
                       <div className="absolute top-0 left-0 w-full h-full rounded-t-full border-t-8 border-l-8 border-r-8 border-transparent" style={{
                           borderColor: stats.quantMetrics.totalScore > 0.7 ? '#34d399' : stats.quantMetrics.totalScore < 0.3 ? '#fb7185' : '#94a3b8',
                           transform: `rotate(${(stats.quantMetrics.totalScore * 180) - 180}deg)`,
                           transformOrigin: 'bottom center',
                           transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                       }}></div>
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                   </div>
                   
                   <div className="text-center">
                       <p className={`text-4xl font-black font-mono ${getProbColor(stats.quantMetrics.totalScore)}`}>
                           {(stats.quantMetrics.totalScore * 100).toFixed(1)}%
                       </p>
                       <p className={`text-sm font-bold mt-1 tracking-widest ${getProbColor(stats.quantMetrics.totalScore)}`}>
                           {getProbLabel(stats.quantMetrics.totalScore)}
                       </p>
                   </div>

                   {/* Top Contributors */}
                   <div className="w-full mt-6 space-y-2">
                       <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Signal Breakdown</p>
                       {stats.quantMetrics.signals.slice(0, 3).map(sig => (
                           <div key={sig.id} className="flex justify-between items-center text-xs">
                               <span className="text-slate-400">{sig.name}</span>
                               <div className="flex items-center gap-2">
                                   <div className="w-16 h-1.5 bg-whale-900 rounded-full overflow-hidden">
                                       <div className="h-full bg-diamond-500" style={{width: `${sig.score * 100}%`}}></div>
                                   </div>
                                   <span className="font-mono text-slate-300 w-8 text-right">{(sig.score * 100).toFixed(0)}</span>
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          </div>

          {/* SECTION 3: WHALE WALLET TRACKER */}
          <div className="lg:col-span-2 bg-whale-900 border border-trenchPurple-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-trenchPurple-500"></div>
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="text-trenchPurple-500" size={20} />
                    <h3 className="font-bold text-white">WHALE WALLET FEED <span className="text-slate-500 text-xs ml-2 font-normal">SMART MONEY TRACKER</span></h3>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      LIVE
                  </div>
              </div>

              <div className="overflow-hidden">
                  <div className="grid grid-cols-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                      <div className="col-span-1">Time</div>
                      <div className="col-span-2">Entity</div>
                      <div className="col-span-1">Asset</div>
                      <div className="col-span-1">Side</div>
                      <div className="col-span-1 text-right">Value</div>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-whale-700">
                      {whaleLog.map((tx) => (
                          <div key={tx.id} className="grid grid-cols-6 text-xs bg-whale-800/50 p-2 rounded border border-whale-700 items-center hover:border-trenchPurple-500/50 transition-colors animate-in slide-in-from-right duration-300">
                              <div className="col-span-1 font-mono text-slate-500">{new Date(tx.timestamp).toLocaleTimeString()}</div>
                              <div className="col-span-2 font-bold text-white flex items-center gap-2">
                                  {tx.entity}
                                  {tx.impact === 'HIGH' && <span className="text-[9px] bg-rose-500/20 text-rose-400 px-1 rounded">HIGH</span>}
                              </div>
                              <div className="col-span-1 font-bold text-slate-300">{tx.asset}</div>
                              <div className="col-span-1">
                                  <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${tx.side === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                      {tx.side}
                                  </span>
                              </div>
                              <div className="col-span-1 text-right font-mono text-slate-200">
                                  ${(tx.amount / 1000).toFixed(0)}k
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};

export default SystemMonitor;
