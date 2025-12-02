
import { GoogleGenAI } from "@google/genai";
import { TradeSignal, BotStatus, MarketRegime, SystemStatus, GpuNode, PlaybookEntry, QuantMetrics, QuantSignal, WhaleTransaction } from '../types';
import { WHALE_CONFIG } from '../constants';

export const generateAnalysis = async (
  currentPrice: number, 
  asset: string
): Promise<TradeSignal> => {
  
  if (process.env.API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze ${asset} at $${currentPrice}. Strategy: Diamond Fins v3.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      const text = response.text;
      if (text) return JSON.parse(text) as TradeSignal;
    } catch (e) {
      console.error("Gemini API Error", e);
    }
  }

  const isBullish = Math.random() > 0.5;
  const confidence = 60 + Math.floor(Math.random() * 38);
  
  return {
    asset,
    direction: confidence > WHALE_CONFIG.entry.signalThreshold ? (isBullish ? 'LONG' : 'SHORT') : 'NEUTRAL',
    confidence,
    reasoning: isBullish 
        ? "Bullish divergence detected on 15m timeframe. Accumulation volume rising." 
        : "Bearish rejection at key resistance level. Momentum slowing down.",
    timestamp: Date.now(),
    indicators: { rsi: isBullish ? 35 + Math.random() * 10 : 65 - Math.random() * 10, macd: isBullish ? 'CROSS_UP' : 'CROSS_DOWN', volume: 1.2 + Math.random() }
  };
};

export const getBotStatus = (): BotStatus => {
    const regimes: MarketRegime[] = ['TRENDING_UP', 'TRENDING_DOWN', 'CHOP_SIDEWAYS', 'VOLATILITY_SQUEEZE'];
    const biases: ('LONG' | 'SHORT' | 'FLAT')[] = ['LONG', 'SHORT', 'FLAT'];
    const randomRegime = regimes[Math.floor(Math.random() * regimes.length)];
    const randomBias = biases[Math.floor(Math.random() * biases.length)];
    const thoughts = [
        `Quant Engine: Order Flow Toxicity spike (0.82) detected on Binance.`,
        `Ensemble Model: Chronos forecasts 15m pump with 68% confidence.`,
        `Funding Delta: -0.002% (Bearish crowding).`,
        `Whale Tracker: Wintermute moved $5M to Spot.`,
        `Execution: Adjusting bid ladder spread to capture volatility.`
    ];
    return { regime: randomRegime, bias: randomBias, lastThinking: thoughts, activeOrders: Math.floor(Math.random() * 5), uptime: 145020 };
};

// --- QUANT ENGINE SIMULATION ---

const generateQuantMetrics = (): QuantMetrics => {
    let totalScore = 0;
    const signals: QuantSignal[] = WHALE_CONFIG.quant.signals.map(sig => {
        // Simulate a live signal score (0 to 1)
        // In production, this comes from the Python backend processing raw tick data
        const rawScore = Math.random(); 
        const contribution = rawScore * sig.weight;
        totalScore += contribution;
        return {
            id: sig.id,
            name: sig.id.replace(/_/g, ' ').toUpperCase(),
            description: sig.description,
            weight: sig.weight,
            score: rawScore,
            contribution
        };
    });

    // Normalize slightly if weights > 1, but usually 0-1 is fine.
    // Determine Bias
    let bias: QuantMetrics['bias'] = 'NEUTRAL';
    if (totalScore > 0.7) bias = 'STRONG_LONG';
    else if (totalScore > 0.55) bias = 'LONG';
    else if (totalScore < 0.3) bias = 'STRONG_SHORT';
    else if (totalScore < 0.45) bias = 'SHORT';

    return { totalScore, bias, signals: signals.sort((a,b) => b.contribution - a.contribution) };
};

const ENTITIES = [
    "Wintermute", "Jump Trading", "Alameda (Liquidator)", "Binance Cold 4", "Coinbase Custody", "BlockTower", "GSR Markets", "FalconX"
];

const generateWhaleFeed = (): WhaleTransaction[] => {
    // This function creates a snapshot, in real app we'd append to a stream
    const txs: WhaleTransaction[] = [];
    const count = 1 + Math.floor(Math.random() * 2); // 1-2 new txs per tick
    for(let i=0; i<count; i++) {
        const isBuy = Math.random() > 0.5;
        const amount = 100000 + Math.floor(Math.random() * 5000000); // 100k - 5M
        txs.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            entity: ENTITIES[Math.floor(Math.random() * ENTITIES.length)],
            address: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
            asset: ['BTC', 'ETH', 'SOL'][Math.floor(Math.random() * 3)],
            side: isBuy ? 'BUY' : 'SELL',
            amount,
            impact: amount > 2000000 ? 'HIGH' : amount > 500000 ? 'MEDIUM' : 'LOW'
        });
    }
    return txs;
}

export const getSystemTelemetry = (): SystemStatus => {
    // Generate 6 GPU Nodes with specific Quant/AI tasks
    const tasks = [
        'Time-Series (Chronos)', 'NLP Reasoning (Mistral)', 'Orderbook Reconstruction', 
        'Quant Engine (Scoring)', 'Risk Check (Guardrails)', 'Whale Wallet Indexing'
    ];
    
    const nodes: GpuNode[] = Array.from({ length: 6 }).map((_, i) => {
        const load = 40 + Math.random() * 50; 
        return {
            id: i,
            name: `RTX 5090-${i + 1}`,
            temp: 65 + Math.random() * 15,
            fanSpeed: 40 + Math.random() * 40,
            vramUsed: 20 + Math.random() * 10, // High usage for models
            vramTotal: 32,
            computeLoad: load,
            task: tasks[i] || 'Idle'
        };
    });

    const insights: PlaybookEntry[] = [];
    if (Math.random() > 0.7) {
        insights.push({
            id: Date.now().toString(),
            timestamp: Date.now(),
            category: 'PATTERN',
            insight: "Quant Engine detected high toxicity on Ask side. Skewing Probability Short.",
            confidence: 85
        });
    }

    return {
        gpuNodes: nodes,
        cpuLoad: 20 + Math.random() * 30,
        memoryUsage: 128 + Math.random() * 20,
        volatilityIndex: Math.random() * 100,
        playbookStream: insights,
        quantMetrics: generateQuantMetrics(),
        whaleFeed: generateWhaleFeed()
    };
};

// --- INTERACTIVE AI QUERY ENGINE ---

const getAssetFlavor = (asset: string) => {
    switch(asset) {
        case 'BTC': return "validating against 200-week MA microstructure";
        case 'ETH': return "monitoring gas/fees for on-chain activity spikes";
        case 'SOL': return "analyzing validator slot times and congestion metrics";
        case 'XRP': return "scanning ledger nodes for large wallet movement";
        case 'DOGE': return "tracking mempool sentiment velocity";
        default: return "analyzing depth and volume profile";
    }
}

export const queryWhaleBot = async (
    query: string, 
    context: SystemStatus, 
    prices: Record<string, number>, 
    selectedAsset: string
): Promise<string> => {
    const q = query.toLowerCase();
    
    // 1. Entity Detection: Determine which asset the user is asking about
    let targetAsset = selectedAsset;
    // Check if query contains any known ticker
    const knownAssets = Object.keys(prices);
    for (const asset of knownAssets) {
        if (q.includes(asset.toLowerCase())) {
            targetAsset = asset;
            break;
        }
    }

    const currentPrice = prices[targetAsset];
    const { quantMetrics, whaleFeed } = context;
    const scorePct = (quantMetrics.totalScore * 100).toFixed(0);
    const bias = quantMetrics.bias.replace('_', ' ');
    const flavor = getAssetFlavor(targetAsset);
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

    // 2. Intent Analysis & Response Generation

    if (q.includes('quant') || q.includes('score') || q.includes('probability')) {
        return `**${targetAsset} Analysis:** Quant Engine is reading **${scorePct}% (${bias})**. The primary driver is **${quantMetrics.signals[0].name}**. I am ${flavor} to confirm if this ${bias.includes('LONG') ? 'breakout' : 'breakdown'} has follow-through.`;
    }

    if (q.includes('whale') || q.includes('flow') || q.includes('money')) {
        // Filter whale feed for the target asset if possible, or give general sentiment
        const assetFlows = whaleFeed.filter(tx => tx.asset === targetAsset);
        const recentHighImpact = assetFlows.find(tx => tx.impact === 'HIGH') || whaleFeed.find(tx => tx.impact === 'HIGH');
        
        if (recentHighImpact) {
            return `Tracking smart money on **${recentHighImpact.asset}**. **${recentHighImpact.entity}** just executed a ${recentHighImpact.side} for $${(recentHighImpact.amount/1000000).toFixed(1)}M. For ${targetAsset}, flows are currently ${assetFlows.length > 0 ? 'active' : 'quiet'}.`;
        }
        return `Whale flows are mixed. I'm seeing net distribution on majors but accumulation on trenches. Keep an eye on Wintermute's hot wallet activity regarding ${targetAsset}.`;
    }

    if (q.includes('price') || q.includes('prediction') || q.includes('target') || q.includes('entry')) {
        const target = bias.includes('LONG') ? currentPrice * 1.025 : currentPrice * 0.975;
        return `**${targetAsset} @ $${currentPrice.toFixed(4)}**: Microstructure suggests a move towards **$${target.toFixed(4)}** in the next 4h window if Quant Score > ${scorePct}%.`;
    }

    if (q.includes('risk') || q.includes('safe') || q.includes('leverage')) {
        const vol = context.volatilityIndex;
        return `**${targetAsset} Risk Check:** Volatility Index is ${vol.toFixed(1)} (${vol > 70 ? 'EXTREME' : 'MODERATE'}). ${vol > 70 ? '⚠️ Recommend reducing leverage to 2x-5x.' : '✅ Standard 10x leverage is within risk parameters.'}`;
    }

    // Default Fallback
    return `Analyzing **${targetAsset}** ($${currentPrice.toFixed(4)})... Volume profile is ${Math.random() > 0.5 ? 'accumulating' : 'distributing'}. Quant score of ${scorePct}% indicates a ${bias.toLowerCase()} edge. I am currently ${flavor}.`;
};
