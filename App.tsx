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
import { MarketData, Position, TradeSignal, ClosedTrade, SystemStatus, Timeframe, UserProfile } from './types';
import { generateAnalysis, getSystemTelemetry } from './services/aiService';
import { connectToKrakenFutures } from './services/krakenService';
import { connectToHyperliquid } from './services/hyperliquidService';
import { sendDiscordAlert } from './services/notificationService';
import { WHALE_CONFIG } from './constants';

const App: React.FC = () => {
  const loadState = <T,>(key: string, def: T): T => { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : def; };
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

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange} vaultEquity={vaultEquity + positions.reduce((acc, p) => acc + p.pnl, 0)} initialEquity={initialEquity}>
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
                    <TrenchCard vaultEquity={vaultEquity + positions.reduce((acc, p) => acc + p.pnl, 0)} winRate={87} ensName={userProfile ? userProfile.handle : 'trench.perpjeet.eth'} />
                </div>
            </div>
        </>
      )}
      {activeTab === 'whalebot' && <WhaleBotView botPositions={botPositions} botHistory={botHistory} botVault={botVault} />}
      {activeTab === 'warroom' && <WarRoom />}
      {activeTab === 'network' && <NetworkView />} {activeTab === 'protocol' && <ProtocolView />} {activeTab === 'how-it-works' && <HowItWorksView />} {activeTab === 'strategy' && <StrategyView />}
      {activeTab === 'system' && (<div className="p-8 bg-whale-800 rounded-xl border border-whale-700"><h2 className="text-2xl font-bold text-white mb-4">Rig Telemetry</h2><SystemMonitor stats={systemStats} /></div>)}
      {activeTab === 'settings' && <SettingsView />}
    </Layout>
  );
};
export default App;
