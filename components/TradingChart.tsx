import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MarketData } from '../types';
import { WHALE_CONFIG } from '../constants';
interface TradingChartProps { data: MarketData[]; currentPrice: number; selectedAsset: string; onAssetChange: (asset: string) => void; dataSource: 'KRAKEN' | 'HYPERLIQUID'; onDataSourceChange: (source: 'KRAKEN' | 'HYPERLIQUID') => void; }
const TradingChart: React.FC<TradingChartProps> = ({ data, currentPrice, selectedAsset, onAssetChange, dataSource, onDataSourceChange }) => {
  return (
    <div className="h-[500px] w-full bg-whale-800 border border-whale-700 rounded-xl p-4 shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex gap-2">
            <div className="flex items-center gap-2"><span className="text-[10px] font-bold">MAJORS</span>{WHALE_CONFIG.assets.majors.map(a => <button key={a} onClick={() => onAssetChange(a)} className={`px-3 py-1 rounded-md text-xs font-bold ${selectedAsset === a ? 'bg-diamond-500 text-whale-900' : 'text-slate-400'}`}>{a}</button>)}</div>
            <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-trenchPurple-500">TRENCH</span>{WHALE_CONFIG.assets.trenches.map(a => <button key={a} onClick={() => onAssetChange(a)} className={`px-3 py-1 rounded-md text-xs font-bold ${selectedAsset === a ? 'bg-trenchPurple-500 text-white' : 'text-slate-400'}`}>{a}</button>)}</div>
        </div>
        <div className="flex items-center gap-4"><span className="text-3xl font-mono text-diamond-500">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span><div className="flex bg-whale-900 rounded-lg p-1 border border-whale-700"><button onClick={() => onDataSourceChange('KRAKEN')} className={`px-3 py-1 rounded text-[10px] font-bold ${dataSource === 'KRAKEN' ? 'bg-trenchGold-500 text-whale-900' : 'text-slate-500'}`}>KRAKEN</button><button onClick={() => onDataSourceChange('HYPERLIQUID')} className={`px-3 py-1 rounded text-[10px] font-bold ${dataSource === 'HYPERLIQUID' ? 'bg-trenchPurple-500 text-white' : 'text-slate-500'}`}>HYPERLIQUID</button></div></div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={dataSource === 'KRAKEN' ? '#ffd700' : '#a855f7'} stopOpacity={0.3}/><stop offset="95%" stopColor={dataSource === 'KRAKEN' ? '#ffd700' : '#a855f7'} stopOpacity={0}/></linearGradient></defs><XAxis dataKey="time" stroke="#8892b0" fontSize={12} tickLine={false} axisLine={false} /><YAxis domain={['auto', 'auto']} stroke="#8892b0" fontSize={12} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ backgroundColor: '#112240', borderColor: '#233554', color: '#ccd6f6' }} /><Area type="monotone" dataKey="price" stroke={dataSource === 'KRAKEN' ? '#ffd700' : '#a855f7'} fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} /><ReferenceLine y={currentPrice} stroke="#ccd6f6" strokeDasharray="3 3" /></AreaChart></ResponsiveContainer>
      </div>
    </div>
  );
};
export default TradingChart;
