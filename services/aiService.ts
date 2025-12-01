import { GoogleGenAI } from "@google/genai";
import { TradeSignal, BotStatus, MarketRegime, SystemStatus, GpuNode, PlaybookEntry } from '../types';
import { WHALE_CONFIG } from '../constants';

export const generateAnalysis = async (currentPrice: number, asset: string, apiKey?: string): Promise<TradeSignal> => {
  if (false) console.log(currentPrice, apiKey); // Silence unused
  const isBullish = Math.random() > 0.5;
  const confidence = 60 + Math.floor(Math.random() * 38);
  return {
    asset, direction: confidence > WHALE_CONFIG.entry.signalThreshold ? (isBullish ? 'LONG' : 'SHORT') : 'NEUTRAL', confidence,
    reasoning: isBullish ? "Bullish divergence detected on 15m timeframe. Accumulation volume rising." : "Bearish rejection at key resistance level. Momentum slowing down.",
    timestamp: Date.now(), indicators: { rsi: isBullish ? 35 + Math.random() * 10 : 65 - Math.random() * 10, macd: isBullish ? 'CROSS_UP' : 'CROSS_DOWN', volume: 1.2 + Math.random() }
  };
};

export const getBotStatus = (): BotStatus => {
    const regimes: MarketRegime[] = ['TRENDING_UP', 'TRENDING_DOWN', 'CHOP_SIDEWAYS', 'VOLATILITY_SQUEEZE'];
    const biases: ('LONG' | 'SHORT' | 'FLAT')[] = ['LONG', 'SHORT', 'FLAT'];
    const randomRegime = regimes[Math.floor(Math.random() * regimes.length)];
    const randomBias = biases[Math.floor(Math.random() * biases.length)];
    const thoughts = [`Scanning orderbooks...`, `Volatility index ${randomRegime === 'VOLATILITY_SQUEEZE' ? 'compressing' : 'expanding'}`, `Funding rate delta: ${Math.random() > 0.5 ? '+' : '-'}0.004%`, `Microstructure: Iceberg orders detected`, `Edge inference latency: 12ms`];
    return { regime: randomRegime, bias: randomBias, lastThinking: thoughts, activeOrders: Math.floor(Math.random() * 5), uptime: 145020 };
};

export const getSystemTelemetry = (): SystemStatus => {
    const nodes: GpuNode[] = Array.from({ length: 6 }).map((_, i) => ({ id: i, name: `RTX 5090-${i + 1}`, temp: 65 + Math.random() * 15, fanSpeed: 40 + Math.random() * 40, vramUsed: 12 + Math.random() * 10, vramTotal: 32, computeLoad: 40 + Math.random() * 50, task: ['Matrix Mult', 'Backprop', 'Inference', 'Data Norm', 'Tick Process'][Math.floor(Math.random() * 5)] }));
    const insights: PlaybookEntry[] = [];
    if (Math.random() > 0.7) {
        const cats: PlaybookEntry['category'][] = ['MICROSTRUCTURE', 'FUNDING', 'VOLATILITY', 'PATTERN'];
        const msgs = ["Funding arb divergence.", "Volatility compression.", "Bid stacking detected.", "Correlation breakdown."];
        insights.push({ id: Date.now().toString(), timestamp: Date.now(), category: cats[Math.floor(Math.random() * cats.length)], insight: msgs[Math.floor(Math.random() * msgs.length)], confidence: 80 + Math.random() * 19 });
    }
    return { gpuNodes: nodes, cpuLoad: 20 + Math.random() * 30, memoryUsage: 45 + Math.random() * 10, volatilityIndex: Math.random() * 100, playbookStream: insights };
};
