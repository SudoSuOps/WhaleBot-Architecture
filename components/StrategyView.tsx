import React from 'react';
import { WHALE_CONFIG } from '../constants';
import { Shield, Target, Clock, Zap, Layers } from 'lucide-react';

const StrategyView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Header */}
      <div className="md:col-span-2 bg-gradient-to-r from-whale-800 to-whale-900 p-6 rounded-xl border border-whale-700 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">{WHALE_CONFIG.codename}</h2>
            <p className="text-whale-400 font-mono text-sm">v{WHALE_CONFIG.version}</p>
        </div>
        <div className="text-right">
            <div className="inline-block px-3 py-1 bg-diamond-500/10 border border-diamond-500 rounded-full">
                <span className="text-diamond-500 text-xs font-bold uppercase tracking-wider">Active Configuration</span>
            </div>
        </div>
      </div>

      {/* Entry Logic */}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-400" />
            <h3 className="text-lg font-bold text-slate-100">Entry Logic</h3>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-whale-900/50 rounded border border-whale-700/50">
                <span className="text-slate-400 text-sm">Signal Threshold</span>
                <span className="text-diamond-500 font-mono font-bold">{WHALE_CONFIG.entry.signalThreshold}%</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-whale-900/50 rounded border border-whale-700/50">
                    <p className="text-xs text-slate-500 mb-1 uppercase">Long RSI Trigger</p>
                    <p className="text-emerald-400 font-mono font-bold">&lt; {WHALE_CONFIG.entry.long.indicators.rsiOversold}</p>
                </div>
                <div className="p-3 bg-whale-900/50 rounded border border-whale-700/50">
                    <p className="text-xs text-slate-500 mb-1 uppercase">Short RSI Trigger</p>
                    <p className="text-rose-400 font-mono font-bold">&gt; {WHALE_CONFIG.entry.short.indicators.rsiOverbought}</p>
                </div>
            </div>
            <div className="p-3 bg-whale-900/50 rounded border border-whale-700/50">
                <span className="text-slate-400 text-sm">Volume Requirement</span>
                <span className="text-slate-200 font-mono font-bold float-right">{WHALE_CONFIG.entry.long.indicators.volumeSpike}x Avg</span>
            </div>
        </div>
      </div>

      {/* Exit Logic */}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <Target className="text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-100">Exit Strategy (Diamond Fins)</h3>
        </div>
        <div className="space-y-4">
             <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded border border-emerald-900/50">
                <span className="text-emerald-200 text-sm">Take Profit Target</span>
                <span className="text-emerald-400 font-mono font-bold">{WHALE_CONFIG.exit.takeProfit.percentage}%</span>
            </div>
             <div className="flex justify-between items-center p-3 bg-rose-900/20 rounded border border-rose-900/50">
                <span className="text-rose-200 text-sm">Stop Loss Limit</span>
                <span className="text-rose-400 font-mono font-bold">{WHALE_CONFIG.exit.stopLoss.percentage}%</span>
            </div>
            <div className="p-3 bg-whale-900/50 rounded border border-whale-700/50">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 text-sm">Trailing Stop</span>
                    <span className="text-diamond-500 font-mono text-xs">ENABLED</span>
                </div>
                <p className="text-xs text-slate-500">Activates at {WHALE_CONFIG.exit.takeProfit.trailingActivation}%, trails by {WHALE_CONFIG.exit.takeProfit.trailingDistance}%</p>
            </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <Shield className="text-blue-400" />
            <h3 className="text-lg font-bold text-slate-100">Risk Controls</h3>
        </div>
        <div className="space-y-3">
             <div className="flex justify-between items-center border-b border-whale-700 pb-2">
                <span className="text-slate-400 text-sm">Max Position Size</span>
                <span className="text-white font-mono">${WHALE_CONFIG.sizing.maxLongSize.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b border-whale-700 pb-2">
                <span className="text-slate-400 text-sm">Leverage</span>
                <span className="text-white font-mono">{WHALE_CONFIG.sizing.leverage}x</span>
            </div>
            <div className="flex justify-between items-center border-b border-whale-700 pb-2">
                <span className="text-slate-400 text-sm">Max Daily Loss</span>
                <span className="text-rose-400 font-mono">${WHALE_CONFIG.risk.maxDailyLoss.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Consecutive Loss Limit</span>
                <span className="text-white font-mono">{WHALE_CONFIG.risk.maxConsecutiveLosses}</span>
            </div>
        </div>
      </div>

       {/* Time Management */}
       <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <Clock className="text-purple-400" />
            <h3 className="text-lg font-bold text-slate-100">Time Rules</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-whale-900/50 p-4 rounded text-center">
                <p className="text-2xl font-bold text-white mb-1">{WHALE_CONFIG.exit.timeExit.maxHoldHours}h</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Max Hold</p>
            </div>
            <div className="bg-whale-900/50 p-4 rounded text-center">
                <p className="text-2xl font-bold text-white mb-1">{WHALE_CONFIG.exit.timeExit.minHoldMinutes}m</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Min Hold</p>
            </div>
            <div className="col-span-2 bg-whale-900/50 p-4 rounded text-center">
                <p className="text-xl font-bold text-white mb-1">{WHALE_CONFIG.entry.cooldownMinutes}m</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Cooldown Between Trades</p>
            </div>
        </div>
      </div>

      {/* ASSET OVERRIDES - NEW IN V3 */}
      <div className="md:col-span-2 bg-whale-800 border border-whale-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <Layers className="text-orange-400" />
            <h3 className="text-lg font-bold text-slate-100">Asset Specific Overrides</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-whale-900/30 border border-whale-700 p-4 rounded-lg">
                <h4 className="font-bold text-orange-400 mb-2">BTC</h4>
                <p className="text-xs text-slate-400">Max Size: <span className="text-white">${WHALE_CONFIG.assets.BTC.maxSize.toLocaleString()}</span></p>
                <p className="text-xs text-slate-400">TP Target: <span className="text-emerald-400">{WHALE_CONFIG.assets.BTC.takeProfitOverride}%</span></p>
            </div>
            <div className="bg-whale-900/30 border border-whale-700 p-4 rounded-lg">
                <h4 className="font-bold text-blue-400 mb-2">ETH</h4>
                <p className="text-xs text-slate-400">Max Size: <span className="text-white">${WHALE_CONFIG.assets.ETH.maxSize.toLocaleString()}</span></p>
                <p className="text-xs text-slate-400">TP Target: <span className="text-emerald-400">{WHALE_CONFIG.assets.ETH.takeProfitOverride}%</span></p>
            </div>
            <div className="bg-whale-900/30 border border-whale-700 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">SOL</h4>
                <p className="text-xs text-slate-400">Max Size: <span className="text-white">${WHALE_CONFIG.assets.SOL.maxSize.toLocaleString()}</span></p>
                <p className="text-xs text-slate-400">TP Target: <span className="text-emerald-400">{WHALE_CONFIG.assets.SOL.takeProfitOverride}%</span></p>
                 <p className="text-xs text-slate-400">Stop Loss: <span className="text-rose-400">{WHALE_CONFIG.assets.SOL.stopLossOverride}%</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyView;