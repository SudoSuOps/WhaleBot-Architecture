import { TradeSignal, BotStatus, MarketRegime } from '../types';
import { WHALE_CONFIG } from '../constants';

export const generateAnalysis = async (currentPrice: number, asset: string, apiKey?: string): Promise<TradeSignal> => {
  const isBullish = Math.random() > 0.5;
  const confidence = 60 + Math.floor(Math.random() * 35); 
  return {
    asset,
    direction: confidence > WHALE_CONFIG.entry.signalThreshold ? (isBullish ? 'LONG' : 'SHORT') : 'NEUTRAL',
    confidence,
    reasoning: isBullish ? "Bullish divergence detected on 15m timeframe. Accumulation volume rising." : "Bearish rejection at key resistance level. Momentum slowing down.",
    timestamp: Date.now(),
    indicators: { rsi: isBullish ? 35 + Math.random() * 10 : 65 - Math.random() * 10, macd: isBullish ? 'CROSS_UP' : 'CROSS_DOWN', volume: 1.2 + Math.random() }
  };
};

export const getBotStatus = (): BotStatus => {
    const regimes: MarketRegime[] = ['TRENDING_UP', 'TRENDING_DOWN', 'CHOP_SIDEWAYS', 'VOLATILITY_SQUEEZE'];
    const biases: ('LONG' | 'SHORT' | 'FLAT')[] = ['LONG', 'SHORT', 'FLAT'];
    const randomRegime = regimes[Math.floor(Math.random() * regimes.length)];
    const randomBias = biases[Math.floor(Math.random() * biases.length)];
    const thoughts = [`Scanning 12 orderbooks...`, `Volatility index ${randomRegime === 'VOLATILITY_SQUEEZE' ? 'compressing (0.45)' : 'expanding (1.2)'}`, `Funding rate delta: ${Math.random() > 0.5 ? '+' : '-'}0.004%`, `Microstructure: Iceberg orders detected at bid depth 2`, `Edge inference latency: 12ms`];
    return { regime: randomRegime, bias: randomBias, lastThinking: thoughts, activeOrders: Math.floor(Math.random() * 5), uptime: 145020 };
};
