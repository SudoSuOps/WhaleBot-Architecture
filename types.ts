export interface Position { id: string; asset: string; type: 'LONG' | 'SHORT'; entryPrice: number; currentPrice: number; size: number; leverage: number; pnl: number; pnlPercent: number; timestamp: number; status: 'OPEN' | 'CLOSED'; origin?: 'USER' | 'BOT'; }
export interface ClosedTrade { id: string; asset: string; type: 'LONG' | 'SHORT'; entryPrice: number; exitPrice: number; size: number; leverage: number; pnl: number; pnlPercent: number; openTimestamp: number; closeTimestamp: number; hash: string; origin?: 'USER' | 'BOT'; }
export interface TradeSignal { asset: string; direction: 'LONG' | 'SHORT' | 'NEUTRAL'; confidence: number; reasoning: string; timestamp: number; indicators: { rsi: number; macd: 'CROSS_UP' | 'CROSS_DOWN' | 'NEUTRAL'; volume: number; }; }
export interface GpuNode { id: number; name: string; temp: number; fanSpeed: number; vramUsed: number; vramTotal: number; computeLoad: number; task: string; }
export interface PlaybookEntry { id: string; timestamp: number; insight: string; category: 'MICROSTRUCTURE' | 'FUNDING' | 'VOLATILITY' | 'PATTERN'; confidence: number; }
export interface QuantSignal { id: string; name: string; score: number; weight: number; contribution: number; description: string; }
export interface QuantMetrics { totalScore: number; bias: 'STRONG_LONG' | 'LONG' | 'NEUTRAL' | 'SHORT' | 'STRONG_SHORT'; signals: QuantSignal[]; }
export interface WhaleTransaction { id: string; timestamp: number; entity: string; address: string; asset: string; side: 'BUY' | 'SELL'; amount: number; impact: 'LOW' | 'MEDIUM' | 'HIGH'; action: string; }
export interface MacroEvent { id: string; timestamp: number; source: 'TRUMP' | 'POWELL' | 'ELON' | 'FED'; text: string; impact: 'HIGH' | 'MEDIUM' | 'LOW'; sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'; }
export interface MiningStats { hashrate: number; temp: number; blockHeight: number; bestShareDifficulty: number; power: number; status: 'HASHING' | 'FOUND_BLOCK' | 'CONNECTING'; probability: number; }
export interface SystemStatus { gpuNodes: GpuNode[]; cpuLoad: number; memoryUsage: number; volatilityIndex: number; playbookStream: PlaybookEntry[]; quantMetrics: QuantMetrics; whaleFeed: WhaleTransaction[]; mining: MiningStats; }
export interface MarketData { time: string; price: number; volume: number; }
export type RiskProfile = 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE' | 'DEGEN';
export type MarketRegime = 'TRENDING_UP' | 'TRENDING_DOWN' | 'CHOP_SIDEWAYS' | 'VOLATILITY_SQUEEZE' | 'LIQUIDITY_CRISIS';
export interface BotConfig { active: boolean; riskProfile: RiskProfile; assets: string[]; modules: { volatilityCrush: boolean; fundingArb: boolean; trendFollowing: boolean; orderbookImbalance: boolean; }; maxDrawdown: number; autoHedge: boolean; }
export interface BotStatus { regime: MarketRegime; bias: 'LONG' | 'SHORT' | 'FLAT'; lastThinking: string[]; activeOrders: number; uptime: number; }
export interface Guardrails { maxDailyLoss: number; maxLeverage: number; maxPositionSize: number; coolingOffPeriod: number; }
export interface RiskState { exposure: number; portfolioHeat: number; correlationScore: number; }
export interface ChatMessage { id: string; role: 'user' | 'bot'; text: string; timestamp: number; }
export type Timeframe = '15m' | '1h' | '4h';
export interface UserProfile { handle: string; rootDomain: 'whaleperp.eth' | 'perpjeet.eth' | 'perpshark.eth' | 'btcsolo.eth'; walletAddress: string; tier: SubscriptionTier; mintTimestamp: number; }
export type SubscriptionTier = 'FREE' | 'WHALE' | 'GIGA';
export interface ChatRoomMessage { id: string; sender: string; text: string; timestamp: number; tier: SubscriptionTier; isSystem?: boolean; }

// --- MEME REACTOR TYPES ---
export interface MemeContext {
  persona: string;
  asset: string;
  side: 'LONG' | 'SHORT' | 'FLAT';
  leverage: number;
  pnl_pct: number;
  funding: string;
  context_text: string;
}

export interface MemeResponse {
  headline: string;
  subline: string;
  tone: string;
  risk_vibe: string;
  bg_style: 'WHALE_DEPTH_METAL' | 'GOAT_SUMMIT_GOLD' | 'APE_CANDLE_FOREST' | 'SHARK_TRENCH_ABYSS' | 'TERMINAL_MONITOR_GLOW' | 'GPU_RACK_NEBULA' | 'CASINO_RUG_ALERT';
  hashtags: string[];
}
