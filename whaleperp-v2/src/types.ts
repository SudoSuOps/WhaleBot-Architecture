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

export interface ClosedTrade extends Omit<Position, 'currentPrice' | 'pnl' | 'pnlPercent'> {
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  openTimestamp: number;
  closeTimestamp: number;
  hash: string;
}

export interface MarketData {
  time: string;
  price: number;
  volume: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

export interface UserProfile {
  handle: string;
  userId: string;
  tier: 'FREE' | 'WHALE' | 'GIGA';
  mintTimestamp: number;
}

export interface CommunityMessage {
  id: string;
  userId: string;
  handle: string;
  text: string;
  timestamp: number;
}
