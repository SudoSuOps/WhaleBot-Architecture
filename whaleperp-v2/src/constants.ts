export const WHALE_CONFIG = {
  name: "WhalePerp",
  version: "2.0.0",
  codename: "NATION STATE EDITION",
  api: {
    worker: import.meta.env.VITE_WORKER_URL || 'http://localhost:8787',
    chat: '/api/chat',
    positions: '/api/user/positions',
    history: '/api/user/history',
    vault: '/api/user/vault',
    community: '/api/community/chat'
  },
  sizing: {
    maxLongSize: 25000,
    maxShortSize: 25000,
    leverage: 10,
    maxExposure: 50000,
    minTradeSize: 1000
  },
  assets: {
    majors: ['BTC', 'ETH', 'SOL', 'XRP'],
    trenches: ['ASTR', 'TAO', 'DOGE', 'BNB']
  }
};
