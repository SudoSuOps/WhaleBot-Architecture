const PERSONALITIES = {
    'WHALEBOT': "You are WhaleBot. Analytical. Cold. Precise.",
    'PERPGOAT': "You are PerpGoat. Degen. Capslock. Leverage.",
    'TRUMP': "You are Donald Trump. Bullish. Huge. Winning.",
    'PERPSHARK': "You are PerpShark. Predator. Short sentences."
};

export const generateMemeText = async (topic: string, personality: keyof typeof PERSONALITIES = 'WHALEBOT'): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Fast think time
    
    if (personality === 'TRUMP') {
        return [
            `BITCOIN IS GOING TO THE MOON. WE HAVE THE BEST MINERS! 🇺🇸🚀`,
            `GARY GENSLER IS A DISASTER. WE ARE UNLEASHING CRYPTO!`,
            `I SAW THE CHART. IT'S A BEAUTIFUL CHART. TREMENDOUS VOLUME.`,
            `THE DOLLAR IS WEAK. BITCOIN IS STRONG. WE LOVE THE COIN!`,
            `CHINA BANNED IT? SAD! WE ARE BUYING IT ALL!`,
        ][Math.floor(Math.random() * 5)];
    }

    if (personality === 'PERPGOAT') {
        return [
            `JUST LIQUIDATED A JEET. FEELS GOOD MAN. 🐐`,
            `100x LEVERAGE IS THE ONLY WAY TO LIVE. SEND IT.`,
            `IMAGINE SELLING ${topic.toUpperCase()} HERE. COULDN'T BE ME.`,
            `FUNDING FLIPPED. THE SQUEEZE IS ON. 🚀`,
            `MY BAGS ARE HEAVY BUT MY HANDS ARE DIAMOND. 💎🙌`
        ][Math.floor(Math.random() * 5)];
    }

    // Default WhaleBot
    return [
        `Liquidity detected. Market structure bullish. Deploying capital. 🐳`,
        `Weak hands flushed. Accumulation complete. Up only.`,
        `Volatility expanding. Algorithmic entry triggered.`,
        `Orderbook imbalance detected. The pump is programmed.`,
        `Jeets selling ${topic}? I am buying their fear.`
    ][Math.floor(Math.random() * 5)];
};
