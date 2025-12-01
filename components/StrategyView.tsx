import React from 'react';
import { WHALE_CONFIG } from '../constants';
import { Shield, Target, Clock, Zap, Layers } from 'lucide-react';
const StrategyView: React.FC = () => { return (<div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="md:col-span-2 bg-gradient-to-r from-whale-800 to-whale-900 p-6 rounded-xl border border-whale-700"><h2 className="text-2xl font-bold text-white">{WHALE_CONFIG.codename}</h2></div></div>); };
export default StrategyView;
