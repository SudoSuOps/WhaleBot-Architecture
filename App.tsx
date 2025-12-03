import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SystemMonitor from './components/SystemMonitor';
import TradingChart from './components/TradingChart';
import SignalPanel from './components/SignalPanel';
import PositionsTable from './components/PositionsTable';
import StrategyView from './components/StrategyView';
import ProtocolView from './components/ProtocolView';
import HowItWorksView from './components/HowItWorksView';
import NetworkView from './components/NetworkView';
import WhaleBotView from './components/WhaleBotView';
import TradeExecution from './components/TradeExecution';
import TradeHistory from './components/TradeHistory';
import SettingsView from './components/SettingsView';
import TrenchCard from './components/TrenchCard';
import Checkout from './components/Checkout';
import MacroFeed from './components/MacroFeed';
import WarRoom from './components/WarRoom';
import MarketingLab from './components/MarketingLab';
import { MarketData, Position, TradeSignal, ClosedTrade, SystemStatus, Timeframe, UserProfile } from './types';
import { generateAnalysis, getSystemTelemetry } from './services/aiService';
import { connectToKrakenFutures } from './services/krakenService';
import { connectToHyperliquid } from './services/hyperliquidService';
import { sendDiscordAlert } from './services/notificationService';
import { WHALE_CONFIG } from './constants';

const App: React.FC = () => {
  const loadState = <T,>(key: string, def: T): T => { 
      try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : def; } catch (e) { return def; }
  };
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataSource, setDataSource] = useState<'KRAKEN' | 'HYPERLIQUID'>('KRAKEN');
  const [timeframe, setTimeframe] = useState<Timeframe>('15m');
  const [webhookUrl, setWebhookUrl] = useState(() => loadState('whale_webhook', ''));
  const [prices, setPrices] = useState<Record<string, number>>({ BTC: 96000, ETH: 2600, SOL: 180, XRP: 1.10, TAO: 450, ASTR: 0.15, DOGE: 0.38, BNB: 650 });
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
  const [chartDataMap, setChartDataMap] = useState<Record<string, MarketData[]>>({ BTC: [], ETH: [], SOL: [], XRP: [], TAO: [], ASTR: [], DOGE: [], BNB: [] });
  const [systemStats, setSystemStats] = useState<SystemStatus>({ gpuNodes: [], cpuLoad: 0, memoryUsage: 0, volatilityIndex: 50, playbookStream: [], quantMetrics: { totalScore: 0.5, bias: 'NEUTRAL', signals: [] }, whaleFeed: [], mining: { hashrate: 0, temp: 0, blockHeight: 0, bestShareDifficulty: 0, power: 0, status: 'CONNECTING', probability: 0 } });
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => loadState('whale_identity', null));
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => { const interval = setInterval(() => { const newStats = getSystemTelemetry(); setSystemStats(prev => ({ ...newStats, playbookStream: [...newStats.playbookStream, ...prev.playbookStream].slice(0, 10), whaleFeed: [...newStats.whaleFeed] })); }, 1000); return () => clearInterval(interval); }, []);
  const [positions, setPositions] = useState<Position[]>(() => loadState('whale_positions', []));
  const [tradeHistory, setTradeHistory] = useState<ClosedTrade[]>(() => loadState('whale_history', []));
  const [vaultEquity, setVaultEquity] = useState(() => loadState('whale_vault', 1000000));
  const initialEquity = 1000000;

  useEffect(() => { localStorage.setItem('whale_positions', JSON.stringify(positions)); }, [positions]);
  useEffect(() => { localStorage.setItem('whale_history', JSON.stringify(tradeHistory)); }, [tradeHistory]);
  useEffect(() => { localStorage.setItem('whale_vault', JSON.stringify(vaultEquity)); }, [vaultEquity]);
  useEffect(() => { if (userProfile) localStorage.setItem('whale_identity', JSON.stringify(userProfile)); }, [userProfile]);

  useEffect(() => { const generateHistory = (basePrice: number) => { const data: MarketData[] = []; let price = basePrice; const now = Date.now(); for (let i = 200; i >= 0; i--) { price = price + (Math.random() * (basePrice * 0.005) - (basePrice * 0.0025)); data.push({ time: new Date(now - i * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), price: price, volume: Math.random() * 100 }); } return data; }; setChartDataMap({ BTC: generateHistory(96000), ETH: generateHistory(2600), SOL: generateHistory(180), XRP: generateHistory(1.10), TAO: generateHistory(450), ASTR: generateHistory(0.15), DOGE: generateHistory(0.38), BNB: generateHistory(650) }); }, []);
  useEffect(() => { let cleanup: () => void; const handlePriceUpdate = (asset: string, price: number, volume: number) => { setPrices(prev => ({ ...prev, [asset]: price })); setChartDataMap(prevMap => { const currentAssetData = prevMap[asset] || []; if (currentAssetData.length === 0) return prevMap; const lastCandle = currentAssetData[currentAssetData.length - 1]; const nowTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); let newData; if (lastCandle.time === nowTime) { newData = [...currentAssetData.slice(0, -1), { ...lastCandle, price: price, volume: lastCandle.volume + volume }]; } else { newData = [...currentAssetData.slice(-299), { time: nowTime, price: price, volume: volume }]; } return { ...prevMap, [asset]: newData }; }); }; cleanup = dataSource === 'KRAKEN' ? connectToKrakenFutures(handlePriceUpdate) : connectToHyperliquid(handlePriceUpdate); return () => { if (cleanup) cleanup(); }; }, [dataSource]);
  useEffect(() => { setPositions(currentPositions => currentPositions.map(pos => { const currentAssetPrice = prices[pos.asset]; if (!currentAssetPrice) return pos; const priceDiff = currentAssetPrice - pos.entryPrice; const pnl = pos.type === 'LONG' ? (priceDiff / pos.entryPrice) * pos.size : (priceDiff / pos.entryPrice) * pos.size * -1; const pnlPercent = pos.type === 'LONG' ? (priceDiff / pos.entryPrice) * pos.leverage * 100 : (priceDiff / pos.entryPrice) * pos.leverage * 100 * -1; return { ...pos, currentPrice: currentAssetPrice, pnl, pnlPercent }; })); }, [prices]);

  const handlePlaceOrder = (type: 'LONG' | 'SHORT', size: number, leverage: number, asset: string) => { const currentPrice = prices[asset]; if (!currentPrice) return; const newPosition: Position = { id: Date.now().toString(), asset, type, entryPrice: currentPrice, currentPrice, size, leverage, pnl: 0, pnlPercent: 0, timestamp: Date.now(), status: 'OPEN', origin: 'USER' }; setPositions(prev => [newPosition, ...prev]); sendDiscordAlert(webhookUrl, 'OPEN', newPosition); };
  const handleClosePosition = async (id: string) => { const posToClose = positions.find(p => p.id === id); if (!posToClose) return; setPositions(prev => prev.filter(p => p.id !== id)); const closeTimestamp = Date.now(); const dataString = `${posToClose.id}-${posToClose.asset}-${posToClose.entryPrice}-${posToClose.currentPrice}-${closeTimestamp}`; const encoder = new TextEncoder(); const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataString)); const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); const closedTrade: ClosedTrade = { id: posToClose.id, asset: posToClose.asset, type: posToClose.type, entryPrice: posToClose.entryPrice, exitPrice: posToClose.currentPrice, size: posToClose.size, leverage: posToClose.leverage, pnl: posToClose.pnl, pnlPercent: posToClose.pnlPercent, openTimestamp: posToClose.timestamp, closeTimestamp, hash: hashHex, origin: 'USER' }; setTradeHistory(prev => [closedTrade, ...prev]); setVaultEquity(prev => prev + posToClose.pnl); sendDiscordAlert(webhookUrl, 'CLOSE', closedTrade); };
  
  const [botPositions, setBotPositions] = useState<Position[]>([]); const [botHistory, setBotHistory] = useState<ClosedTrade[]>([]); const [botVault, setBotVault] = useState({ balance: 1000000, initial: 1000000 });

  const handleTabChange = (tab: string) => {
      if ((tab === 'whalebot' || tab === 'warroom') && (!userProfile || userProfile.tier === 'FREE')) { setShowCheckout(true); return; }
      setActiveTab(tab);
  };

  // Calculate Real Equity
  const currentEquity = vaultEquity + positions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange} vaultEquity={currentEquity} initialEquity={initialEquity}>
      <MacroFeed />
      {showCheckout && <Checkout onComplete={(p) => { setUserProfile(p); setShowCheckout(false); setActiveTab('whalebot'); }} />}
      {activeTab === 'dashboard' && (
        <>
            <SystemMonitor stats={systemStats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <TradingChart data={chartDataMap[selectedAsset] || []} currentPrice={prices[selectedAsset] || 0} selectedAsset={selectedAsset} onAssetChange={setSelectedAsset} dataSource={dataSource} onDataSourceChange={setDataSource} timeframe={timeframe} onTimeframeChange={setTimeframe} />
                    <PositionsTable positions={positions} onClosePosition={handleClosePosition} />
                    <TradeHistory history={tradeHistory} />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <SignalPanel prices={prices} selectedAsset={selectedAsset} systemStatus={systemStats} />
                    <TradeExecution currentPrice={prices[selectedAsset] || 0} selectedAsset={selectedAsset} onPlaceOrder={handlePlaceOrder} />
                    <TrenchCard vaultEquity={currentEquity} winRate={87} ensName={userProfile ? userProfile.handle : 'trench.perpjeet.eth'} />
                </div>
            </div>
        </>
      )}
      {activeTab === 'whalebot' && <WhaleBotView botPositions={botPositions} botHistory={botHistory} botVault={botVault} />}
      {activeTab === 'warroom' && <WarRoom />}
      {activeTab === 'marketing' && <MarketingLab vaultEquity={currentEquity} userProfile={userProfile} />}
      {activeTab === 'network' && <NetworkView />} {activeTab === 'protocol' && <ProtocolView />} {activeTab === 'how-it-works' && <HowItWorksView />} {activeTab === 'strategy' && <StrategyView />}
      {activeTab === 'system' && (<div className="p-8 bg-whale-800 rounded-xl border border-whale-700"><h2 className="text-2xl font-bold text-white mb-4">Rig Telemetry</h2><SystemMonitor stats={systemStats} /></div>)}
      {activeTab === 'settings' && <SettingsView />}
    </Layout>
  );
};
export default App;

# 6. Restore PositionsTable.tsx
cat << 'EOF' > components/PositionsTable.tsx
import React, { useState, useEffect } from 'react';
import { Position } from '../types';
import { TrendingUp, TrendingDown, XCircle, Anchor, Crosshair, AlertTriangle, AlertOctagon, Clock, Target, Shield } from 'lucide-react';
import { WHALE_CONFIG } from '../constants';
import { WhaleLogoIcon } from './BrandAssets';

interface PositionsTableProps { positions: Position[]; onClosePosition: (id: string) => void; }

const PositionsTable: React.FC<PositionsTableProps> = ({ positions, onClosePosition }) => {
  const [confirmCloseId, setConfirmCloseId] = useState<string | null>(null);
  const [hoveredPos, setHoveredPos] = useState<Position | null>(null);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => { let interval: any; if (hoveredPos) { interval = setInterval(() => setTick(t => t + 1), 1000); } return () => clearInterval(interval); }, [hoveredPos]);

  if (positions.length === 0) {
      return (
        <div className="bg-whale-800 border border-whale-700 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4 shadow-lg shadow-black/20">
            <div className="p-6 bg-whale-900 rounded-full border border-whale-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-pulse"><WhaleLogoIcon className="w-16 h-16" /></div>
            <div><p className="text-slate-500 font-light text-lg">No active positions.</p><p className="text-xs text-trenchGold-500 font-mono mt-1">&gt; SCANNING 6x GPU CLUSTER FOR DIAMOND FINS SIGNALS...</p></div>
        </div>
      )
  }

  const getTargets = (pos: Position) => {
    let tpPct = WHALE_CONFIG.exit.takeProfit.percentage; let slPct = WHALE_CONFIG.exit.stopLoss.percentage;
    const assetsConfig = WHALE_CONFIG.assets as any; if (assetsConfig[pos.asset]) { if (assetsConfig[pos.asset].takeProfitOverride) { tpPct = assetsConfig[pos.asset].takeProfitOverride; } if (assetsConfig[pos.asset].stopLossOverride) { slPct = assetsConfig[pos.asset].stopLossOverride; } }
    let tpPrice, slPrice; if (pos.type === 'LONG') { tpPrice = pos.entryPrice * (1 + tpPct / 100); slPrice = pos.entryPrice * (1 - slPct / 100); } else { tpPrice = pos.entryPrice * (1 - tpPct / 100); slPrice = pos.entryPrice * (1 + slPct / 100); }
    return { tpPrice, slPrice, tpPct, slPct };
  };

  const getProximityStatus = (current: number, target: number) => { const distPercent = Math.abs((current - target) / current) * 100; return { isClose: distPercent < 0.5, dist: distPercent }; };
  const handleMouseMove = (e: React.MouseEvent) => { setMousePos({ x: e.clientX + 20, y: e.clientY + 20 }); };
  const formatDuration = (ms: number) => { const seconds = Math.floor(ms / 1000); const minutes = Math.floor(seconds / 60); const hours = Math.floor(minutes / 60); if (hours > 0) return `${hours}h ${minutes % 60}m`; return `${minutes}m ${seconds % 60}s`; };

  return (
    <>
        <div className="bg-whale-800 border border-trenchPurple-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] relative">
        <div className="p-4 border-b border-whale-700 flex justify-between items-center bg-gradient-to-r from-whale-900 to-whale-800"><div className="flex items-center gap-2"><Anchor className="text-trenchGold-500" size={20} /><h3 className="font-bold text-white tracking-wide">ACTIVE POSITIONS <span className="text-trenchPurple-400 text-xs ml-2 font-normal font-mono">WHALEPERP.ETH</span></h3></div><span className="text-xs text-trenchGold-500 font-mono bg-trenchGold-500/10 px-2 py-1 rounded border border-trenchGold-500/20 font-bold">{positions.length} OPEN</span></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-whale-900 text-slate-400"><tr><th className="p-4 font-medium text-xs uppercase tracking-wider">Asset</th><th className="p-4 font-medium text-xs uppercase tracking-wider">Side</th><th className="p-4 font-medium text-xs uppercase tracking-wider">Size</th><th className="p-4 font-medium text-xs uppercase tracking-wider">Entry / Mark</th><th className="p-4 font-medium text-xs uppercase tracking-wider"><div className="flex items-center gap-1"><Crosshair size={14}/> TP Target</div></th><th className="p-4 font-medium text-xs uppercase tracking-wider"><div className="flex items-center gap-1"><AlertTriangle size={14}/> Stop Loss</div></th><th className="p-4 font-medium text-xs uppercase tracking-wider text-right">PnL</th><th className="p-4 font-medium text-xs uppercase tracking-wider text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-whale-700">
                {positions.map((pos) => {
                    const { tpPrice, slPrice, tpPct, slPct } = getTargets(pos); const tpStatus = getProximityStatus(pos.currentPrice, tpPrice); const slStatus = getProximityStatus(pos.currentPrice, slPrice);
                    return (<tr key={pos.id} className="hover:bg-whale-700/30 transition-colors cursor-crosshair group" onMouseEnter={(e) => { setHoveredPos(pos); handleMouseMove(e); }} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredPos(null)}><td className="p-4 font-bold text-white border-l-2 border-transparent hover:border-l-trenchGold-500 transition-all"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-diamond-500 animate-pulse shadow-[0_0_8px_#00f0ff]"></div>{pos.asset}</div></td><td className="p-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${pos.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>{pos.type === 'LONG' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{pos.type}</span></td><td className="p-4 font-mono text-slate-300">${pos.size.toLocaleString()}<div className="text-[10px] text-slate-500">{pos.leverage}x</div></td><td className="p-4 font-mono"><div className="text-slate-400">${pos.entryPrice.toLocaleString()}</div><div className="text-white font-bold">${pos.currentPrice.toLocaleString()}</div></td><td className="p-4 font-mono"><div className={`${tpStatus.isClose ? 'text-emerald-400 animate-pulse font-bold' : 'text-emerald-500/70'}`}>${tpPrice.toLocaleString(undefined, {maximumFractionDigits: 1})}</div><div className="text-[10px] text-slate-500 flex items-center gap-1"><span>{tpPct}%</span>{tpStatus.isClose && <span className="text-emerald-400 font-bold">NEAR</span>}</div></td><td className="p-4 font-mono"><div className={`${slStatus.isClose ? 'text-rose-400 animate-pulse font-bold' : 'text-rose-500/70'}`}>${slPrice.toLocaleString(undefined, {maximumFractionDigits: 1})}</div><div className="text-[10px] text-slate-500 flex items-center gap-1"><span>{slPct}%</span>{slStatus.isClose && <span className="text-rose-400 font-bold">RISK</span>}</div></td><td className={`p-4 font-mono font-bold text-right ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}><div className="text-base">{pos.pnl >= 0 ? '+' : ''}{pos.pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div><div className="text-xs opacity-80">({pos.pnlPercent.toFixed(2)}%)</div></td><td className="p-4 text-right"><button onClick={(e) => { e.stopPropagation(); setConfirmCloseId(pos.id); }} className="p-2 hover:bg-rose-500/20 rounded-lg text-slate-500 hover:text-rose-400 transition-colors group border border-transparent hover:border-rose-500/30" title="Close Position"><XCircle size={18} /></button></td></tr>);
                })}
            </tbody></table></div></div>
        {hoveredPos && mousePos && (<div className="fixed z-50 w-72 p-0 bg-whale-900 border border-trenchGold-500/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl pointer-events-none flex flex-col animate-in fade-in zoom-in-95 duration-100 overflow-hidden" style={{ top: mousePos.y, left: mousePos.x }}><div className="px-4 py-3 bg-gradient-to-r from-whale-800 to-whale-900 border-b border-whale-700 flex justify-between items-center"><span className="font-bold text-white tracking-wide">{hoveredPos.asset} Position</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${hoveredPos.type === 'LONG' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>{hoveredPos.type}</span></div><div className="p-4 space-y-3"><div className="flex items-center gap-2 text-slate-400 text-xs pb-2 border-b border-whale-800"><Clock size={12} className="text-trenchGold-500" /><span>Duration: <span className="text-white font-mono font-bold">{formatDuration(Date.now() - hoveredPos.timestamp)}</span></span></div>{(() => { const { tpPrice, slPrice, tpPct, slPct } = getTargets(hoveredPos); return (<div className="grid grid-cols-2 gap-2 mt-1"><div className="bg-emerald-900/10 p-2 rounded border border-emerald-500/20"><p className="text-[10px] text-emerald-500 uppercase mb-1 flex items-center gap-1 font-bold"><Target size={10}/> Take Profit</p><p className="font-mono text-emerald-400 font-bold text-sm">${tpPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}</p><p className="text-[10px] text-slate-500 font-mono mt-0.5">{tpPct}% Target</p></div><div className="bg-rose-900/10 p-2 rounded border border-rose-500/20"><p className="text-[10px] text-rose-500 uppercase mb-1 flex items-center gap-1 font-bold"><Shield size={10}/> Stop Loss</p><p className="font-mono text-rose-400 font-bold text-sm">${slPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}</p><p className="text-[10px] text-slate-500 font-mono mt-0.5">{slPct}% Limit</p></div></div>); })()}</div></div>)}
        {confirmCloseId && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"><div className="bg-whale-900 border border-whale-700 p-6 rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.2)] max-w-md w-full mx-auto animate-in fade-in zoom-in duration-200 relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div><div className="flex items-center gap-3 text-rose-400 mb-4"><AlertOctagon size={28} /><h3 className="text-xl font-bold text-white">Close Position?</h3></div><p className="text-slate-400 mb-6 leading-relaxed">Are you sure you want to market close this position immediately? <br/><span className="text-xs text-rose-500/80 font-mono mt-2 block">&gt; ACTION CANNOT BE UNDONE. REALIZING PNL.</span></p><div className="flex justify-end gap-3"><button onClick={() => setConfirmCloseId(null)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-whale-800 transition-colors font-medium border border-transparent">Cancel</button><button onClick={() => { onClosePosition(confirmCloseId); setConfirmCloseId(null); }} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all font-bold shadow-[0_0_20px_rgba(244,63,94,0.4)]">CONFIRM EXECUTION</button></div></div></div>)}
    </>
  );
};
export default PositionsTable;
