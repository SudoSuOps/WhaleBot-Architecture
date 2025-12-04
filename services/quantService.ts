import { QuantMetrics, QuantSignal, MarketRegime } from '../types';
import { WHALE_CONFIG } from '../constants';

// Smooths jittery inputs over time
const smoothingBuffer: number[] = [];
const SMOOTHING_WINDOW = 5;

export const calculateQuantMetrics = (): QuantMetrics => {
    let totalScore = 0;
    
    const signals: QuantSignal[] = WHALE_CONFIG.quant.signals.map(sig => {
        // In a real app, this comes from the Python backend analyzing orderbook snapshots
        // Here we simulate market microstructure coherence
        const baseNoise = Math.random();
        let rawScore = baseNoise;
        
        // Add "Coherence" - if one signal is high, others likely align in a trend
        if (Math.random() > 0.7) rawScore = rawScore > 0.5 ? Math.min(1, rawScore + 0.2) : Math.max(0, rawScore - 0.2);
        
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

    // Apply Smoothing
    smoothingBuffer.push(totalScore);
    if (smoothingBuffer.length > SMOOTHING_WINDOW) smoothingBuffer.shift();
    const smoothedScore = smoothingBuffer.reduce((a, b) => a + b, 0) / smoothingBuffer.length;

    // Determine Bias
    let bias: QuantMetrics['bias'] = 'NEUTRAL';
    if (smoothedScore > 0.70) bias = 'STRONG_LONG';
    else if (smoothedScore > 0.55) bias = 'LONG';
    else if (smoothedScore < 0.30) bias = 'STRONG_SHORT';
    else if (smoothedScore < 0.45) bias = 'SHORT';

    return { 
        totalScore: smoothedScore, 
        bias, 
        signals: signals.sort((a,b) => b.contribution - a.contribution) 
    };
};

export const getQuantNarrative = (metrics: QuantMetrics, regime: MarketRegime): string => {
    const score = metrics.totalScore;
    
    if (score > 0.75) return "CONVICTION LOCK. Depth stacking on bid side. Shorts are trapped. Momentum breakout confirmed.";
    if (score > 0.60) return "Edge forming Long. Orderbook tilting bullish. Monitoring funding rates for squeeze potential.";
    if (score < 0.25) return "LIQUIDATION CASCADE. Bids pulled. Aggressive selling detected. Catching knives is fatal.";
    if (score < 0.40) return "Bearish divergence. Distribution detected on lower timeframes. Fade the pumps.";
    
    if (regime === 'CHOP_SIDEWAYS') return "No Edge. Volatility compression. Market is deciding. Sit on hands.";
    if (regime === 'VOLATILITY_SQUEEZE') return "TENSION RISING. Bollinger bands tight. Massive move imminent. Wait for breakout.";
    
    return "Noise dominant. Signals mixed. Preserving capital is a position.";
};
