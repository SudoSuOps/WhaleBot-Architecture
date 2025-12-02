
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
import { MarketData, Position, TradeSignal, ClosedTrade, SystemStatus } from './types';
import { generateAnalysis, getSystemTelemetry } from './services/aiService';
import { connectToKrakenFutures } from './services/krakenService';
import { connectToHyperliquid } from './services/hyperliquidService';
import { WHALE_CONFIG } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataSource, setDataSource] = useState<'KRAKEN' | 'HYPERLIQUID'>('KRAKEN');

  // Multi-asset state - Initialize with realistic baselines
  const [prices, setPrices] = useState<Record<string, number>>({
      BTC: 96000,
      ETH: 2600,
      SOL: 180,
      XRP: 1.10,
      TAO: 450,
      ASTR: 0.15,
      DOGE: 0.38,
      BNB: 650
  });
  
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
  
  const [chartDataMap, setChartDataMap] = useState<Record<string, MarketData[]>>({
      BTC: [], ETH: [], SOL: [], XRP: [], TAO: [], ASTR: [], DOGE: [], BNB: []
  });

  // SYSTEM & TELEMETRY STATE (Hosted here so SignalPanel can see it)
  const [systemStats, setSystemStats] = useState<SystemStatus>({
    gpuNodes: [],
    cpuLoad: 0,
    memoryUsage: 0,
    volatilityIndex: 50,
    playbookStream: [],
    quantMetrics: { totalScore: 0.5, bias: 'NEUTRAL', signals: [] },
    whaleFeed: []
  });

  useEffect(() => {
    // Generate telemetry (simulating 6x 5090 hardware & quant engine)
    const interval = setInterval(() => {
      const newStats = getSystemTelemetry();
      setSystemStats(prev => ({
        ...newStats,
        // Append feeds instead of replacing to keep history in monitor
        playbookStream: [...newStats.playbookStream, ...prev.playbookStream].slice(0, 10),
        whaleFeed: [...newStats.whaleFeed] // The monitor handles the accumulation for visual effect
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [signal, setSignal] = useState<TradeSignal | null>(null);
  const [loadingSignal, setLoadingSignal] = useState(false);
  
  const [positions, setPositions] = useState<Position[]>([
      {
          id: '1', asset: 'BTC', type: 'LONG', entryPrice: 96100, currentPrice: 96450,
          size: WHALE_CONFIG.assets.BTC.maxSize, leverage: 10, pnl: 0, pnlPercent: 0,
          timestamp: Date.now() - 1000 * 60 * 30, status: 'OPEN'
      }
  ]);

  const [tradeHistory, setTradeHistory] = useState<ClosedTrade[]>([]);

  // Seed Data
  useEffect(() => {
    const generateHistory = (basePrice: number) => {
        const data: MarketData[] = [];
        let price = basePrice;
        const now = Date.now();
        for (let i = 50; i >= 0; i--) {
            price = price + (Math.random() * (basePrice * 0.005) - (basePrice * 0.0025));
            data.push({
                time: new Date(now - i * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                price: price,
                volume: Math.random() * 100
            });
        }
        return data;
    };

    setChartDataMap({
        BTC: generateHistory(96000),
        ETH: generateHistory(2600),
        SOL: generateHistory(180),
        XRP: generateHistory(1.10),
        TAO: generateHistory(450),
        ASTR: generateHistory(0.15),
        DOGE: generateHistory(0.38),
        BNB: generateHistory(650)
    });
  }, []);

  // Data Feed Connection
  useEffect(() => {
    let cleanup: () => void;

    const handlePriceUpdate = (asset: string, price: number, volume: number) => {
        setPrices(prev => ({ ...prev, [asset]: price }));

        setChartDataMap(prevMap => {
            const currentAssetData = prevMap[asset] || [];
            if (currentAssetData.length === 0) return prevMap;

            const lastCandle = currentAssetData[currentAssetData.length - 1];
            const nowTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            let newData;
            if (lastCandle.time === nowTime) {
                const updatedLast = { ...lastCandle, price: price, volume: lastCandle.volume + volume };
                newData = [...currentAssetData.slice(0, -1), updatedLast];
            } else {
                const newCandle = { time: nowTime, price: price, volume: volume };
                newData = [...currentAssetData.slice(-99), newCandle];
            }
            return { ...prevMap, [asset]: newData };
        });
    };

    if (dataSource === 'KRAKEN') {
        cleanup = connectToKrakenFutures(handlePriceUpdate);
    } else {
        cleanup = connectToHyperliquid(handlePriceUpdate);
    }

    return () => { if (cleanup) cleanup(); };
  }, [dataSource]);

  // Position PnL Updates
  useEffect(() => {
    setPositions(currentPositions => 
        currentPositions.map(pos => {
            const currentAssetPrice = prices[pos.asset];
            if (!currentAssetPrice) return pos;

            const priceDiff = currentAssetPrice - pos.entryPrice;
            const pnl = pos.type === 'LONG' 
                ? (priceDiff / pos.entryPrice) * pos.size 
                : (priceDiff / pos.entryPrice) * pos.size * -1;
            const pnlPercent = pos.type === 'LONG'
                ? (priceDiff / pos.entryPrice) * pos.leverage * 100
                : (priceDiff / pos.entryPrice) * pos.leverage * 100 * -1;

            return { ...pos, currentPrice: currentAssetPrice, pnl, pnlPercent };
        })
    );
  }, [prices]);

  // BOT: Autonomous Trading Engine
  const [botPositions, setBotPositions] = useState<Position[]>([]);
  const [botHistory, setBotHistory] = useState<ClosedTrade[]>([]);
  const [botVault, setBotVault] = useState({ balance: 1000000, initial: 1000000 });

  useEffect(() => {
      if (!WHALE_CONFIG.assets) return; // safety
      const runBot = () => {
          const assets = [...WHALE_CONFIG.assets.majors, ...WHALE_CONFIG.assets.trenches];
          
          assets.forEach(async (asset) => {
              const price = prices[asset];
              if (!price) return;
              
              // 1. Check active position for EXIT (TP/SL)
              const activePos = botPositions.find(p => p.asset === asset);
              if (activePos) {
                 const priceDiff = activePos.type === 'LONG' ? price - activePos.entryPrice : activePos.entryPrice - price;
                 const pnlPct = (priceDiff / activePos.entryPrice) * activePos.leverage * 100;
                 
                 let closeReason = null;
                 // TP/SL Checks based on Asset Specifics or Global defaults
                 const config = WHALE_CONFIG as any;
                 const assetConfig = config.assets[asset] || {};
                 const tp = assetConfig.takeProfitOverride || config.exit.takeProfit.percentage;
                 const sl = assetConfig.stopLossOverride || config.exit.stopLoss.percentage;

                 if (pnlPct >= tp) closeReason = 'TP';
                 if (pnlPct <= -sl) closeReason = 'SL';

                 if (closeReason) {
                     // Close Position
                     const pnl = (priceDiff / activePos.entryPrice) * activePos.size;
                     const closedTrade: ClosedTrade = {
                         id: activePos.id, asset: activePos.asset, type: activePos.type,
                         entryPrice: activePos.entryPrice, exitPrice: price,
                         size: activePos.size, leverage: activePos.leverage,
                         pnl: pnl, pnlPercent: pnlPct,
                         openTimestamp: activePos.timestamp, closeTimestamp: Date.now(),
                         hash: 'BOT_AUTO_EXEC_' + Date.now(),
                         origin: 'BOT'
                     };
                     setBotPositions(prev => prev.filter(p => p.id !== activePos.id));
                     setBotHistory(prev => [closedTrade, ...prev]);
                     setBotVault(prev => ({ ...prev, balance: prev.balance + pnl }));
                 }
                 return; // Bot already has position, don't open new one
              }

              // 2. Check for ENTRY
              // For demo: Random entry if no position
              if (Math.random() > 0.98) { // Low probability per tick to avoid spam
                  const analysis = await generateAnalysis(price, asset);
                  if (analysis.direction !== 'NEUTRAL' && analysis.confidence > 75) {
                      const size = 10000; // Standard bot clip
                      const newPos: Position = {
                          id: `bot-${Date.now()}`, asset, type: analysis.direction as 'LONG'|'SHORT',
                          entryPrice: price, currentPrice: price, size, leverage: 10,
                          pnl: 0, pnlPercent: 0, timestamp: Date.now(), status: 'OPEN',
                          origin: 'BOT'
                      };
                      setBotPositions(prev => [newPos, ...prev]);
                  }
              }
          });
      };

      const interval = setInterval(runBot, 5000); // Bot thinks every 5s
      return () => clearInterval(interval);
  }, [prices, botPositions]);

  const handlePlaceOrder = (type: 'LONG' | 'SHORT', size: number, leverage: number) => {
      const currentPrice = prices[selectedAsset];
      if (!currentPrice) return;
      const newPosition: Position = {
          id: Date.now().toString(),
          asset: selectedAsset,
          type: type,
          entryPrice: currentPrice,
          currentPrice: currentPrice,
          size: size,
          leverage: leverage,
          pnl: 0, pnlPercent: 0,
          timestamp: Date.now(), status: 'OPEN',
          origin: 'USER'
      };
      setPositions(prev => [newPosition, ...prev]);
  };

  const handleClosePosition = async (id: string) => {
    const posToClose = positions.find(p => p.id === id);
    if (!posToClose) return;
    setPositions(prev => prev.filter(p => p.id !== id));

    const closeTimestamp = Date.now();
    const dataString = `${posToClose.id}-${posToClose.asset}-${posToClose.entryPrice}-${posToClose.currentPrice}-${closeTimestamp}`;
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataString));
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    const closedTrade: ClosedTrade = {
        id: posToClose.id, asset: posToClose.asset, type: posToClose.type,
        entryPrice: posToClose.entryPrice, exitPrice: posToClose.currentPrice,
        size: posToClose.size, leverage: posToClose.leverage,
        pnl: posToClose.pnl, pnlPercent: posToClose.pnlPercent,
        openTimestamp: posToClose.timestamp, closeTimestamp: closeTimestamp,
        hash: hashHex,
        origin: 'USER'
    };
    setTradeHistory(prev => [closedTrade, ...prev]);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <>
            <SystemMonitor stats={systemStats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <TradingChart 
                        data={chartDataMap[selectedAsset] || []} 
                        currentPrice={prices[selectedAsset] || 0} 
                        selectedAsset={selectedAsset}
                        onAssetChange={setSelectedAsset}
                        dataSource={dataSource}
                        onDataSourceChange={setDataSource}
                    />
                    <PositionsTable positions={positions} onClosePosition={handleClosePosition} />
                    <TradeHistory history={tradeHistory} />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <TradeExecution 
                        currentPrice={prices[selectedAsset] || 0} 
                        selectedAsset={selectedAsset}
                        onPlaceOrder={handlePlaceOrder}
                    />
                    {/* Updated Interactive Signal Panel with full context */}
                    <SignalPanel 
                        prices={prices} 
                        selectedAsset={selectedAsset}
                        systemStatus={systemStats}
                    />
                </div>
            </div>
        </>
      )}
      {activeTab === 'whalebot' && (
          <WhaleBotView 
             botPositions={botPositions}
             botHistory={botHistory}
             botVault={botVault}
          />
      )}
      {activeTab === 'network' && <NetworkView />}
      {activeTab === 'protocol' && <ProtocolView />}
      {activeTab === 'how-it-works' && <HowItWorksView />}
      {activeTab === 'strategy' && <StrategyView />}
      {activeTab === 'system' && (
          <div className="p-8 bg-whale-800 rounded-xl border border-whale-700">
              <h2 className="text-2xl font-bold text-white mb-4">Rig Telemetry</h2>
              <SystemMonitor stats={systemStats} />
              <div className="mt-8 p-6 bg-black rounded-lg border border-trenchGold-500/30 font-mono text-xs text-trenchGold-400 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <p className="opacity-70">{'>'} ALLOCATING VRAM POOL: 192GB TOTAL...</p>
                  <p className="opacity-70">{'>'} LOADING MISTRAL-7B-INSTRUCT-v0.2 WEIGHTS...</p>
                  <p className="opacity-70">{'>'} CONNECTING TO {dataSource} FEED...</p>
                  <p className="text-emerald-400 font-bold blink">{'>'} SYSTEM READY. DIAMOND FINS v3 ENGAGED.</p>
              </div>
          </div>
      )}
      {activeTab === 'settings' && <SettingsView />}
    </Layout>
  );
};

export default App;
