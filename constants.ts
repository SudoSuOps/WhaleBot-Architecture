export const WHALE_CONFIG = {
    name: "Paper Whale", version: "3.0.0", codename: "DIAMOND FINS v3",
    sizing: { maxLongSize: 25000, maxShortSize: 25000, leverage: 10, maxExposure: 50000, minTradeSize: 5000 },
    entry: { signalThreshold: 70, long: { minConfidence: 70, indicators: { rsiOversold: 35, macdCrossUp: true, volumeSpike: 1.5, priceAboveEMA: false } }, short: { minConfidence: 70, indicators: { rsiOverbought: 65, macdCrossDown: true, volumeSpike: 1.5, priceBelowEMA: false } }, cooldownMinutes: 15 },
    exit: { takeProfit: { enabled: true, percentage: 3.0, trailingEnabled: true, trailingActivation: 2.0, trailingDistance: 1.0 }, stopLoss: { enabled: true, percentage: 5.0, dynamicEnabled: true, minStop: 3.0, maxStop: 7.0, atrMultiplier: 1.5 }, timeExit: { enabled: true, maxHoldHours: 8, minHoldMinutes: 30 }, signalExit: { enabled: true, reverseThreshold: 60 } },
    risk: { maxDailyLoss: 5000, maxDailyTrades: 20, maxConsecutiveLosses: 3, pauseAfterLossMinutes: 60, maxHeat: 0.5, maxCorrelatedPositions: 2 },
    assets: { primary: ['BTC', 'ETH'], secondary: ['SOL'], BTC: { maxSize: 25000, leverage: 10, takeProfitOverride: 2.5 }, ETH: { maxSize: 25000, leverage: 10, takeProfitOverride: 3.5 }, SOL: { maxSize: 15000, leverage: 10, takeProfitOverride: 5.0, stopLossOverride: 7.0 } },
    ai: { model: "mistral", endpoint: "http://localhost:11434/api/generate", promptTemplate: "market_analysis_v3", weights: { aiSignal: 0.4, technicals: 0.35, sentiment: 0.15, momentum: 0.10 } }
};
