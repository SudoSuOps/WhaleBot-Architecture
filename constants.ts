
export const WHALE_CONFIG = {
    // ═══════════════════════════════════════════════════════════════════════
    // IDENTITY
    // ═══════════════════════════════════════════════════════════════════════
    name: "Paper Whale",
    version: "3.2.0",
    codename: "DIAMOND FINS v3 (Trench Edition)",
    
    // ═══════════════════════════════════════════════════════════════════════
    // POSITION SIZING
    // ═══════════════════════════════════════════════════════════════════════
    sizing: {
        maxLongSize: 25000,      // $25k max long position
        maxShortSize: 25000,     // $25k max short position
        leverage: 10,            // 10x leverage base
        maxExposure: 50000,      // $50k total exposure max
        minTradeSize: 1000,      // Lower min trade for alts
    },
    
    // ═══════════════════════════════════════════════════════════════════════
    // ENTRY SIGNALS
    // ═══════════════════════════════════════════════════════════════════════
    entry: {
        signalThreshold: 70,     // Enter at 70% confidence
        long: { minConfidence: 70, indicators: { rsiOversold: 35, macdCrossUp: true, volumeSpike: 1.5, priceAboveEMA: false } },
        short: { minConfidence: 70, indicators: { rsiOverbought: 65, macdCrossDown: true, volumeSpike: 1.5, priceBelowEMA: false } },
        cooldownMinutes: 15,
    },
    
    // ═══════════════════════════════════════════════════════════════════════
    // EXIT STRATEGY
    // ═══════════════════════════════════════════════════════════════════════
    exit: {
        takeProfit: { enabled: true, percentage: 3.0, trailingEnabled: true, trailingActivation: 2.0, trailingDistance: 1.0 },
        stopLoss: { enabled: true, percentage: 5.0, dynamicEnabled: true, minStop: 3.0, maxStop: 10.0, atrMultiplier: 1.5 },
        timeExit: { enabled: true, maxHoldHours: 8, minHoldMinutes: 30 },
        signalExit: { enabled: true, reverseThreshold: 60 }
    },
    
    // ═══════════════════════════════════════════════════════════════════════
    // RISK MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════
    risk: {
        maxDailyLoss: 5000, maxDailyTrades: 20, maxConsecutiveLosses: 3, pauseAfterLossMinutes: 60, maxHeat: 0.6, maxCorrelatedPositions: 3,
    },
    
    // ═══════════════════════════════════════════════════════════════════════
    // ASSETS
    // ═══════════════════════════════════════════════════════════════════════
    assets: {
        majors: ['BTC', 'ETH', 'SOL', 'XRP'],
        trenches: ['ASTR', 'TAO', 'DOGE', 'BNB'],
        BTC: { maxSize: 25000, leverage: 10, takeProfitOverride: 2.5 },
        ETH: { maxSize: 25000, leverage: 10, takeProfitOverride: 3.5 },
        SOL: { maxSize: 15000, leverage: 10, takeProfitOverride: 5.0, stopLossOverride: 7.0 },
        XRP: { maxSize: 15000, leverage: 10, takeProfitOverride: 4.0, stopLossOverride: 6.0 },
        ASTR: { maxSize: 5000, leverage: 5, takeProfitOverride: 12.0, stopLossOverride: 10.0 },
        TAO:  { maxSize: 10000, leverage: 5, takeProfitOverride: 8.0, stopLossOverride: 10.0 },
        DOGE: { maxSize: 15000, leverage: 10, takeProfitOverride: 6.0, stopLossOverride: 8.0 },
        BNB:  { maxSize: 20000, leverage: 10, takeProfitOverride: 4.0, stopLossOverride: 6.0 },
    },
    
    // ═══════════════════════════════════════════════════════════════════════
    // QUANT ENGINE CONFIG
    // ═══════════════════════════════════════════════════════════════════════
    quant: {
        scoring: {
            longThreshold: 0.70,
            shortThreshold: 0.30,
        },
        signals: [
            { id: 'order_flow_toxicity', weight: 0.18, description: "Aggression Imbalance" },
            { id: 'volatility_regime', weight: 0.12, description: "Expansion/Compression" },
            { id: 'micro_momentum', weight: 0.12, description: "50ms-250ms Slope" },
            { id: 'spot_perp_delta', weight: 0.10, description: "Structure Lead" },
            { id: 'depth_imbalance', weight: 0.10, description: "Book Pressure Skew" },
            { id: 'liquidation_pressure', weight: 0.10, description: "Liq Magnet" },
            { id: 'regime_detection', weight: 0.10, description: "Meta-Signal Filter" },
            { id: 'funding_divergence', weight: 0.08, description: "Crowding Indicator" },
            { id: 'liquidity_heatmap', weight: 0.08, description: "Wick Clusters" },
            { id: 'spoof_pull_rate', weight: 0.07, description: "Smart Money Pulls" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AI SIGNAL SOURCE
    // ═══════════════════════════════════════════════════════════════════════
    ai: {
        model: "mistral",
        endpoint: "http://localhost:11434/api/generate",
        promptTemplate: "market_analysis_v3",
        weights: { aiSignal: 0.4, technicals: 0.35, sentiment: 0.15, momentum: 0.10 }
    }
};
