
type PriceUpdateCallback = (symbol: string, price: number, volume?: number) => void;

const HL_WS_URL = 'wss://api.hyperliquid.xyz/ws';

// Mapping Hyperliquid Tickers to Internal IDs
const ASSET_MAPPING: Record<string, string> = {
  'BTC': 'BTC',
  'ETH': 'ETH',
  'SOL': 'SOL',
  'XRP': 'XRP',
  'TAO': 'TAO',
  'DOGE': 'DOGE',
  'BNB': 'BNB',
  'PURR/USDC': 'ASTR', // Fallback or Specific pair
  'ASTR': 'ASTR',
  'ASTER': 'ASTR' // Handle ticker variances
};

export const connectToHyperliquid = (onPriceUpdate: PriceUpdateCallback) => {
  let socket: WebSocket | null = null;
  let pingInterval: any;

  try {
    socket = new WebSocket(HL_WS_URL);

    socket.onopen = () => {
      console.log('Connected to Hyperliquid L1 WS');
      
      const subscribeMsg = {
        method: "subscribe",
        subscription: { type: "allMids" }
      };
      socket?.send(JSON.stringify(subscribeMsg));

      // Keep alive
      pingInterval = setInterval(() => {
        if (socket?.readyState === WebSocket.OPEN) {
             socket.send(JSON.stringify({ method: "ping" }));
        }
      }, 50000);
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.channel === 'allMids') {
         const mids = msg.data.mids;
         
         // Iterate through our known assets to see if they exist in the update
         Object.keys(ASSET_MAPPING).forEach(hlTicker => {
             if (mids[hlTicker]) {
                 const assetId = ASSET_MAPPING[hlTicker];
                 const price = parseFloat(mids[hlTicker]);
                 // Synthesize volume since L1 Mids doesn't provide it directly, using random flux for visualization
                 onPriceUpdate(assetId, price, Math.random() * 50); 
             }
         });
      }
    };

    socket.onerror = (error) => {
      console.error('Hyperliquid WS Error:', error);
    };

    socket.onclose = () => {
      console.log('Hyperliquid WS Disconnected');
      clearInterval(pingInterval);
    };

  } catch (e) {
    console.error("Failed to connect to Hyperliquid:", e);
  }

  return () => {
    if (socket) socket.close();
    clearInterval(pingInterval);
  };
};
