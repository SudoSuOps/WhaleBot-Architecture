import React from 'react';
import { WHALE_CONFIG } from '../constants';
import { Shield, Target, Clock, Zap, Layers } from 'lucide-react';

const StrategyView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="md:col-span-2 bg-gradient-to-r from-whale-800 to-whale-900 p-6 rounded-xl border border-whale-700 flex justify-between items-center"><div><h2 className="text-2xl font-bold text-white mb-2">{WHALE_CONFIG.codename}</h2><p className="text-whale-400 font-mono text-sm">v{WHALE_CONFIG.version}</p></div><div className="text-right"><div className="inline-block px-3 py-1 bg-diamond-500/10 border border-diamond-500 rounded-full"><span className="text-diamond-500 text-xs font-bold uppercase tracking-wider">Active Configuration</span></div></div></div></div>
  );
};
export default StrategyView;
