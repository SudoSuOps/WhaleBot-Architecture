import { GoogleGenAI } from "@google/genai";
import { TradeSignal, BotStatus, MarketRegime, SystemStatus, GpuNode, PlaybookEntry, QuantMetrics, QuantSignal, WhaleTransaction, MiningStats } from '../types';
import { WHALE_CONFIG } from '../constants';
import { getMiningStats } from './miningService';

let apiBackoffUntil = 0;
const callWorkerAI = async (prompt: string, systemContext: string, model: 'MISTRAL' | 'LLAMA' | 'QWEN' = 'MISTRAL') => {
    try { const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, system: systemContext, model }) }); if (!res.ok) throw new Error('Worker AI Error'); const data = await res.json(); return data.response; } catch (e) { console.error("Worker AI Failed:", e); return null; }
};

export const generateAnalysis = async (currentPrice: number, asset: string): Promise<TradeSignal> => {
  if (process.env.API_KEY && Date.now() > apiBackoffUntil) { try { const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); const prompt = `Analyze ${asset} at $${currentPrice}. Strategy: Diamond Fins v3.`; const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config: { responseMimeType: 'application/json' } }); const text = response.text; if (text) return JSON.parse(text) as TradeSignal; } catch (e: any) { if (e.toString().includes('429') || e.status === 429) { console.warn("[WhaleBot] Rate Limit Hit."); apiBackoffUntil = Date.now() + 60000; } } }
  const isBullish = Math.random() > 0.5; const confidence = 60 + Math.floor(Math.random() * 38);
  return { asset, direction: confidence > WHALE_CONFIG.entry.signalThreshold ? (isBullish ? 'LONG' : 'SHORT') : 'NEUTRAL', confidence, reasoning: isBullish ? "Bullish divergence detected on 15m timeframe." : "Bearish rejection at key resistance level.", timestamp: Date.now(), indicators: { rsi: isBullish ? 35 + Math.random() * 10 : 65 - Math.random() * 10, macd: isBullish ? 'CROSS_UP' : 'CROSS_DOWN', volume: 1.2 + Math.random() } };
};

export const getBotStatus = (): BotStatus => {
    const regimes: MarketRegime[] = ['TRENDING_UP', 'TRENDING_DOWN', 'CHOP_SIDEWAYS', 'VOLATILITY_SQUEEZE']; const biases: ('LONG' | 'SHORT' | 'FLAT')[] = ['LONG', 'SHORT', 'FLAT']; const randomRegime = regimes[Math.floor(Math.random() * regimes.length)]; const randomBias = biases[Math.floor(Math.random() * biases.length)];
    const thoughts = [`Quant Engine: Order Flow Toxicity spike (0.82) detected on Binance.`, `Ensemble Model: Chronos forecasts 15m pump.`, `Whale Tracker: Wintermute moved $5M to Spot.`];
    return { regime: randomRegime, bias: randomBias, lastThinking: thoughts, activeOrders: Math.floor(Math.random() * 5), uptime: 145020 };
};

const generateQuantMetrics = (): QuantMetrics => {
    let totalScore = 0; const signals: QuantSignal[] = WHALE_CONFIG.quant.signals.map(sig => { const rawScore = Math.random(); const contribution = rawScore * sig.weight; totalScore += contribution; return { id: sig.id, name: sig.id.replace(/_/g, ' ').toUpperCase(), description: sig.description, weight: sig.weight, score: rawScore, contribution }; });
    let bias: QuantMetrics['bias'] = 'NEUTRAL'; if (totalScore > 0.7) bias = 'STRONG_LONG'; else if (totalScore > 0.55) bias = 'LONG'; else if (totalScore < 0.3) bias = 'STRONG_SHORT'; else if (totalScore < 0.45) bias = 'SHORT';
    return { totalScore, bias, signals: signals.sort((a,b) => b.contribution - a.contribution) };
};

const generateWhaleFeed = (): WhaleTransaction[] => {
    const ENTITIES = ["Wintermute", "Jump Trading", "Alameda (Liquidator)", "Binance Cold 4", "Coinbase Custody", "BlockTower", "GSR Markets", "FalconX"];
    const ACTIONS = ["Opened 50x Long", "Opened 25x Short", "Dumped Spot", "Accumulated Spot", "Liquidated", "Bridged to Base", "Moved to Cold Storage"];
    const txs: WhaleTransaction[] = []; const count = 1 + Math.floor(Math.random() * 2);
    for(let i=0; i<count; i++) { const isBuy = Math.random() > 0.5; const amount = 100000 + Math.floor(Math.random() * 5000000); txs.push({ id: Math.random().toString(36).substr(2, 9), timestamp: Date.now(), entity: ENTITIES[Math.floor(Math.random() * ENTITIES.length)], address: `0x${Math.random().toString(16).substr(2, 4)}...`, asset: ['BTC', 'ETH', 'SOL'][Math.floor(Math.random() * 3)], side: isBuy ? 'BUY' : 'SELL', amount, impact: amount > 2000000 ? 'HIGH' : amount > 500000 ? 'MEDIUM' : 'LOW', action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)] }); }
    return txs;
}

export const getSystemTelemetry = (): SystemStatus => {
    const tasks = ['Time-Series (Chronos)', 'NLP Reasoning', 'Orderbook Reconstruction', 'Quant Engine', 'Risk Check', 'Whale Indexing'];
    const nodes: GpuNode[] = Array.from({ length: 6 }).map((_, i) => ({ id: i, name: `RTX 5090-${i + 1}`, temp: 65 + Math.random() * 15, fanSpeed: 40 + Math.random() * 40, vramUsed: 20 + Math.random() * 10, vramTotal: 32, computeLoad: 40 + Math.random() * 50, task: tasks[i] || 'Idle' }));
    const insights: PlaybookEntry[] = []; if (Math.random() > 0.7) { insights.push({ id: Date.now().toString(), timestamp: Date.now(), category: 'PATTERN', insight: "Quant Engine detected high toxicity on Ask side.", confidence: 85 }); }
    return { gpuNodes: nodes, cpuLoad: 20 + Math.random() * 30, memoryUsage: 128 + Math.random() * 20, volatilityIndex: Math.random() * 100, playbookStream: insights, quantMetrics: generateQuantMetrics(), whaleFeed: generateWhaleFeed(), mining: getMiningStats() };
};

export const queryWhaleBot = async (query: string, context: SystemStatus, prices: Record<string, number>, selectedAsset: string, activeModel: 'MISTRAL'|'LLAMA'|'QWEN' = 'MISTRAL'): Promise<string> => {
    const q = query.toLowerCase(); let targetAsset = selectedAsset; const knownAssets = Object.keys(prices); for (const asset of knownAssets) { if (q.includes(asset.toLowerCase())) { targetAsset = asset; break; } }
    const currentPrice = prices[targetAsset]; const scorePct = (context.quantMetrics.totalScore * 100).toFixed(0); const bias = context.quantMetrics.bias.replace('_', ' ');
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
    
    // 1. Try Gemini (Paid)
    if (process.env.API_KEY && Date.now() > apiBackoffUntil) {
       try { const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); const prompt = `You are WhaleBot, a trench-native crypto trading AI. Answer in a professional yet cryptic style (use terms: jeets, rekt, god candle, nuke). Current Market Context: Asset: ${targetAsset}, Price: $${currentPrice}, Quant Score: ${scorePct}% (${bias}), Volatility: ${context.volatilityIndex.toFixed(1)}. User Query: "${query}"`; const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt }); return response.text || "Analysis stream interrupted."; } catch (e: any) { if (e.toString().includes('429') || e.status === 429) { console.warn("[WhaleBot] Rate Limit Hit. Switching to Worker AI."); apiBackoffUntil = Date.now() + 60000; } }
    }

    // 2. Try Worker AI (Sovereign)
    const systemPrompt = `You are WhaleBot, a trench-native crypto trading AI running on Cloudflare Edge GPUs (${activeModel}). Current Market Context: Asset: ${targetAsset}, Price: $${currentPrice}, Quant Score: ${scorePct}% (${bias}). Answer concisely.`;
    const workerResponse = await callWorkerAI(query, systemPrompt, activeModel);
    if (workerResponse) return workerResponse;

    // 3. Fallback
    return `[OFFLINE MODE] Analyzing **${targetAsset}** ($${currentPrice.toFixed(4)})... Quant score of ${scorePct}% indicates a ${bias.toLowerCase()} edge.`;
};
