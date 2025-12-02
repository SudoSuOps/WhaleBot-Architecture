
export interface Position {
  id: string;
  asset: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  size: number;
  leverage: number;
  pnl: number;
  pnlPercent: number;
  timestamp: number;
  status: 'OPEN' | 'CLOSED';
  origin?: 'USER' | 'BOT';
}

export interface ClosedTrade {
  id: string;
  asset: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  size: number;
  leverage: number;
  pnl: number;
  pnlPercent: number;
  openTimestamp: number;
  closeTimestamp: number;
  hash: string; // SHA-256 Verification
  origin?: 'USER' | 'BOT';
}

export interface TradeSignal {
  asset: string;
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
  reasoning: string;
  timestamp: number;
  indicators: {
    rsi: number;
    macd: 'CROSS_UP' | 'CROSS_DOWN' | 'NEUTRAL';
    volume: number;
  };
}

export interface GpuNode {
    id: number;
    name: string;
    temp: number;
    fanSpeed: number;
    vramUsed: number; // GB
    vramTotal: number; // GB
    computeLoad: number; // %
    task: string;
}

export interface PlaybookEntry {
    id: string;
    timestamp: number;
    insight: string;
    category: 'MICROSTRUCTURE' | 'FUNDING' | 'VOLATILITY' | 'PATTERN';
    confidence: number;
}

// --- QUANT ENGINE TYPES ---

export interface QuantSignal {
    id: string;
    name: string;
    score: number; // 0 to 1
    weight: number;
    contribution: number; // score * weight
    description: string;
}

export interface QuantMetrics {
    totalScore: number; // 0 to 1 (Weighted Probability)
    bias: 'STRONG_LONG' | 'LONG' | 'NEUTRAL' | 'SHORT' | 'STRONG_SHORT';
    signals: QuantSignal[];
}

export interface WhaleTransaction {
    id: string;
    timestamp: number;
    entity: string; // e.g. "Wintermute", "Jump"
    address: string;
    asset: string;
    side: 'BUY' | 'SELL';
    amount: number; // USD value
    impact: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SystemStatus {
  gpuNodes: GpuNode[];
  cpuLoad: number;
  memoryUsage: number;
  volatilityIndex: number; // Keep for legacy compatibility if needed
  playbookStream: PlaybookEntry[];
  quantMetrics: QuantMetrics;
  whaleFeed: WhaleTransaction[];
}

export interface MarketData {
  time: string;
  price: number;
  volume: number;
}

// --- WHALEBOT TYPES ---

export type RiskProfile = 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE' | 'DEGEN';
export type MarketRegime = 'TRENDING_UP' | 'TRENDING_DOWN' | 'CHOP_SIDEWAYS' | 'VOLATILITY_SQUEEZE' | 'LIQUIDITY_CRISIS';

export interface BotConfig {
  active: boolean;
  riskProfile: RiskProfile;
  assets: string[];
  modules: {
    volatilityCrush: boolean;
    fundingArb: boolean;
    trendFollowing: boolean;
    orderbookImbalance: boolean;
  };
  maxDrawdown: number;
  autoHedge: boolean;
}

export interface BotStatus {
  regime: MarketRegime;
  bias: 'LONG' | 'SHORT' | 'FLAT';
  lastThinking: string[];
  activeOrders: number;
  uptime: number;
}

export interface Guardrails {
    maxDailyLoss: number;
    maxLeverage: number;
    maxPositionSize: number;
    coolingOffPeriod: number;
}

export interface RiskState {
    exposure: number;
    portfolioHeat: number; // 0 to 1
    correlationScore: number;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    timestamp: number;
}
