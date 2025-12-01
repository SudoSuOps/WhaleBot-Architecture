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
import { MarketData, Position, TradeSignal, ClosedTrade } from './types';
import { generateAnalysis } from './services/aiService';
import { connectToKrakenFutures } from './services/krakenService';
import { connectToHyperliquid } from './services/hyperliquidService';
import { WHALE_CONFIG } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataSource, setDataSource] = useState<'KRAKEN' | 'HYPERLIQUID'>('KRAKEN');
  const [prices, setPrices] = useState<Record<string, number>>({ BTC: 96000, ETH: 2600, SOL: 180, XRP: 1.10, TAO: 450, ASTR: 0.15, DOGE: 0.38, BNB: 650 });
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
  const [chartDataMap, setChartDataMap] = useState<Record<string, MarketData[]>>({});
  const [signal, setSignal] = useState<TradeSignal | null>(null);
  const [loadingSignal, setLoadingSignal] = useState(false);
  const [positions, setPositions] = useState<Position[]>([{ id: '1', asset: 'BTC', type: 'LONG', entryPrice: 96100, currentPrice: 96450, size: 25000, leverage: 10, pnl: 0, pnlPercent: 0, timestamp: Date.now() - 1000 * 60 * 30, status: 'OPEN' }]);
  const [tradeHistory, setTradeHistory] = useState<ClosedTrade[]>([]);
  const [botPositions, setBotPositions] = useState<Position[]>([]);
  const [botHistory, setBotHistory] = useState<ClosedTrade[]>([]);
  const [botVault, setBotVault] = useState({ balance: 1000000, initial: 1000000 });

  useEffect(() => { setChartDataMap({ BTC: [], ETH: [], SOL: [], XRP: [], TAO: [], ASTR: [], DOGE: [], BNB: [] }); }, []);

  useEffect(() => {
    let cleanup: () => void;
    const handlePriceUpdate = (asset: string, price: number, volume: number) => {
        setPrices(prev => ({ ...prev, [asset]: price }));
        setChartDataMap(prevMap => {
            const currentAssetData = prevMap[asset] || [];
            if (currentAssetData.length === 0) return { ...prevMap, [asset]: [{ time: new Date().toLocaleTimeString(), price, volume }]};
            const lastCandle = currentAssetData[currentAssetData.length - 1];
            const nowTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            let newData;
            if (lastCandle.time === nowTime) { newData = [...currentAssetData.slice(0, -1), { ...lastCandle, price, volume: lastCandle.volume + volume }]; } else { newData = [...currentAssetData.slice(-99), { time: nowTime, price, volume }]; }
            return { ...prevMap, [asset]: newData };
        });
    };
    cleanup = dataSource === 'KRAKEN' ? connectToKrakenFutures(handlePriceUpdate) : connectToHyperliquid(handlePriceUpdate);
    return () => { if (cleanup) cleanup(); };
  }, [dataSource]);

  useEffect(() => {
    setPositions(currentPositions => currentPositions.map(pos => {
        const currentAssetPrice = prices[pos.asset];
        if (!currentAssetPrice) return pos;
        const priceDiff = currentAssetPrice - pos.entryPrice;
        const pnl = pos.type === 'LONG' ? (priceDiff / pos.entryPrice) * pos.size : (priceDiff / pos.entryPrice) * pos.size * -1;
        const pnlPercent = pos.type === 'LONG' ? (priceDiff / pos.entryPrice) * pos.leverage * 100 : (priceDiff / pos.entryPrice) * pos.leverage * 100 * -1;
        return { ...pos, currentPrice: currentAssetPrice, pnl, pnlPercent };
    }));
  }, [prices]);

  // BOT LOGIC
  useEffect(() => {
      if (!WHALE_CONFIG.assets) return;
      const runBot = () => {
          const assets = [...WHALE_CONFIG.assets.majors, ...WHALE_CONFIG.assets.trenches];
          assets.forEach(async (asset) => {
              const price = prices[asset];
              if (!price) return;
              const activePos = botPositions.find(p => p.asset === asset);
              if (activePos) {
                 const priceDiff = activePos.type === 'LONG' ? price - activePos.entryPrice : activePos.entryPrice - price;
                 const pnlPct = (priceDiff / activePos.entryPrice) * activePos.leverage * 100;
                 let closeReason = null;
                 if (pnlPct >= 3.0) closeReason = 'TP';
                 if (pnlPct <= -5.0) closeReason = 'SL';
                 if (closeReason) {
                     const pnl = (priceDiff / activePos.entryPrice) * activePos.size;
                     setBotPositions(prev => prev.filter(p => p.id !== activePos.id));
                     setBotHistory(prev => [{ id: activePos.id, asset: activePos.asset, type: activePos.type, entryPrice: activePos.entryPrice, exitPrice: price, size: activePos.size, leverage: activePos.leverage, pnl, pnlPercent: pnlPct, openTimestamp: activePos.timestamp, closeTimestamp: Date.now(), hash: 'BOT_' + Date.now(), origin: 'BOT' }, ...prev]);
                     setBotVault(prev => ({ ...prev, balance: prev.balance + pnl }));
                 }
                 return;
              }
              if (Math.random() > 0.98) {
                  const analysis = await generateAnalysis(price, asset);
                  if (analysis.direction !== 'NEUTRAL' && analysis.confidence > 75) {
                      setBotPositions(prev => [{ id: `bot-${Date.now()}`, asset, type: analysis.direction as 'LONG'|'SHORT', entryPrice: price, currentPrice: price, size: 10000, leverage: 10, pnl: 0, pnlPercent: 0, timestamp: Date.now(), status: 'OPEN', origin: 'BOT' }, ...prev]);
                  }
              }
          });
      };
      const interval = setInterval(runBot, 5000);
      return () => clearInterval(interval);
  }, [prices, botPositions]);

  const handlePlaceOrder = (type: 'LONG' | 'SHORT', size: number, leverage: number) => {
      const currentPrice = prices[selectedAsset];
      if (!currentPrice) return;
      setPositions(prev => [{ id: Date.now().toString(), asset: selectedAsset, type, entryPrice: currentPrice, currentPrice, size, leverage, pnl: 0, pnlPercent: 0, timestamp: Date.now(), status: 'OPEN', origin: 'USER' }, ...prev]);
  };

  const handleClosePosition = async (id: string) => {
    const posToClose = positions.find(p => p.id === id);
    if (!posToClose) return;
    setPositions(prev => prev.filter(p => p.id !== id));
    setTradeHistory(prev => [{ id: posToClose.id, asset: posToClose.asset, type: posToClose.type, entryPrice: posToClose.entryPrice, exitPrice: posToClose.currentPrice, size: posToClose.size, leverage: posToClose.leverage, pnl: posToClose.pnl, pnlPercent: posToClose.pnlPercent, openTimestamp: posToClose.timestamp, closeTimestamp: Date.now(), hash: 'USER_' + Date.now(), origin: 'USER' }, ...prev]);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <>
            <SystemMonitor />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <TradingChart data={chartDataMap[selectedAsset] || []} currentPrice={prices[selectedAsset] || 0} selectedAsset={selectedAsset} onAssetChange={setSelectedAsset} dataSource={dataSource} onDataSourceChange={setDataSource} />
                    <PositionsTable positions={positions} onClosePosition={handleClosePosition} />
                    <TradeHistory history={tradeHistory} />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <TradeExecution currentPrice={prices[selectedAsset] || 0} selectedAsset={selectedAsset} onPlaceOrder={handlePlaceOrder} />
                    <SignalPanel signal={signal} loading={loadingSignal} onRefresh={async () => { setLoadingSignal(true); const s = await generateAnalysis(prices[selectedAsset], selectedAsset); setSignal(s); setLoadingSignal(false); }} />
                </div>
            </div>
        </>
      )}
      {activeTab === 'whalebot' && <WhaleBotView botPositions={botPositions} botHistory={botHistory} botVault={botVault} />}
      {activeTab === 'network' && <NetworkView />}
      {activeTab === 'protocol' && <ProtocolView />}
      {activeTab === 'how-it-works' && <HowItWorksView />}
      {activeTab === 'strategy' && <StrategyView />}
      {activeTab === 'system' && (<div className="p-8 bg-whale-800 rounded-xl border border-whale-700"><h2 className="text-2xl font-bold text-white mb-4">Rig Telemetry</h2><SystemMonitor /></div>)}
      {activeTab === 'settings' && <SettingsView />}
    </Layout>
  );
};
export default App;
