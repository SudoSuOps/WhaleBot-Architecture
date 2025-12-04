import React, { useEffect, useState } from 'react';
import { Activity, Zap, BarChart2, TrendingUp, TrendingDown, AlertCircle, Waves, Wind, Lock, Crosshair } from 'lucide-react';
import { QuantMetrics, MarketRegime } from '../types';
import { getQuantNarrative } from '../services/quantService';

interface QuantEngineProps {
    metrics: QuantMetrics;
    regime: MarketRegime;
}

const QuantEngine: React.FC<QuantEngineProps> = ({ metrics, regime }) => {
    const [narrative, setNarrative] = useState('');
    const scorePct = Math.round(metrics.totalScore * 100);
    
    useEffect(() => {
        setNarrative(getQuantNarrative(metrics, regime));
    }, [metrics, regime]);

    const getScoreColor = (s: number) => {
        if (s > 70) return 'text-emerald-400';
        if (s < 30) return 'text-rose-400';
        return 'text-slate-400';
    };

    const getBarColor = (s: number) => {
        if (s > 0.7) return 'bg-emerald-500 shadow-[0_0_10px_#10b981]';
        if (s < 0.3) return 'bg-rose-500 shadow-[0_0_10px_#f43f5e]';
        return 'bg-slate-600';
    };

    const getRegimeBadge = (r: MarketRegime) => {
        switch(r) {
            case 'TRENDING_UP': return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><TrendingUp size={10}/> UPTREND</span>;
            case 'TRENDING_DOWN': return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/50 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><TrendingDown size={10}/> DOWNTREND</span>;
            case 'VOLATILITY_SQUEEZE': return <span className="bg-trenchGold-500/20 text-trenchGold-400 border border-trenchGold-500/50 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><Zap size={10}/> SQUEEZE</span>;
            default: return <span className="bg-slate-700/50 text-slate-400 border border-slate-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><Wind size={10}/> CHOP</span>;
        }
    };

    return (
        <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 relative overflow-hidden shadow-lg h-full flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={150} /></div>
            
            {/* HEADER */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Crosshair className="text-diamond-500" size={20} />
                        <h3 className="font-bold text-white tracking-wide">QUANT ENGINE v2</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Probability & Microstructure</p>
                </div>
                {getRegimeBadge(regime)}
            </div>

            {/* GAUGE & SCORE */}
            <div className="flex flex-col items-center justify-center py-4 relative z-10">
                <div className="relative w-48 h-24 overflow-hidden mb-2">
                     {/* Gauge Background */}
                    <div className="absolute top-0 left-0 w-full h-full bg-whale-900 rounded-t-full border-t-[12px] border-l-[12px] border-r-[12px] border-whale-700"></div>
                    {/* Gauge Fill */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full border-t-[12px] border-l-[12px] border-r-[12px] border-transparent transition-all duration-700 ease-out" 
                         style={{
                             borderColor: metrics.totalScore > 0.7 ? '#34d399' : metrics.totalScore < 0.3 ? '#fb7185' : '#94a3b8',
                             transform: `rotate(${(metrics.totalScore * 180) - 180}deg)`,
                             transformOrigin: 'bottom center'
                         }}></div>
                </div>
                <div className="text-center -mt-6">
                    <p className={`text-5xl font-black font-mono tracking-tighter ${getScoreColor(scorePct)}`}>
                        {scorePct}<span className="text-2xl">%</span>
                    </p>
                    <p className={`text-xs font-bold mt-1 uppercase tracking-[0.2em] ${getScoreColor(scorePct)}`}>
                        {metrics.bias.replace('_', ' ')}
                    </p>
                </div>
            </div>

            {/* NARRATIVE LAYER */}
            <div className="bg-whale-900/50 border border-whale-700 rounded-lg p-3 mb-6 relative z-10">
                <div className="flex gap-2">
                    <div className="mt-1"><Zap size={12} className="text-trenchGold-500 animate-pulse" /></div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                        <span className="text-trenchGold-500 font-bold">{'>'}</span> {narrative}
                    </p>
                </div>
            </div>

            {/* SIGNAL STRIP */}
            <div className="space-y-2 relative z-10 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-whale-700">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-2 font-bold">Micro-Signal Confluence</p>
                {metrics.signals.map(sig => (
                    <div key={sig.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                            <div className={`w-1 h-1 rounded-full ${sig.score > 0.7 ? 'bg-emerald-500' : sig.score < 0.3 ? 'bg-rose-500' : 'bg-slate-500'}`}></div>
                            <span className="text-[10px] text-slate-400 font-mono group-hover:text-white transition-colors">{sig.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-whale-900 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${getBarColor(sig.score)}`} style={{width: `${sig.score * 100}%`}}></div>
                            </div>
                            <span className={`text-[9px] font-mono w-6 text-right ${getScoreColor(sig.score * 100)}`}>{(sig.score * 100).toFixed(0)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* LOCK INDICATOR */}
            {(metrics.totalScore > 0.8 || metrics.totalScore < 0.2) && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-whale-950/80 rounded border border-diamond-500/30 text-[9px] text-diamond-400 animate-pulse">
                    <Lock size={10} /> CONVICTION LOCK
                </div>
            )}
        </div>
    );
};

export default QuantEngine;
