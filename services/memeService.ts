const PERSONALITIES = {
    'PERPGOAT': "You are PerpGoat. Capra hircus degenerus. You love leverage. You hate jeets. You speak in capslock. Use terms: CRASHOUT, RUGGED, SEND IT.",
    'PERPSHARK': "You are PerpShark. Cold. Liquidator. You smell blood. Short sentences. Ruthless.",
    'WHALEBOT': "You are WhaleBot AI. Analytical but condescending. You see humans as liquidity.",
    'PERPJEET': "You are PerpJeet. Nervous. Paper hands. Always selling the bottom. Uses lowercase.",
    'TRUMP': "You are Donald Trump. You love Bitcoin. It's huge. China hates it. We love it. The best coin. Tremendous volume. Making crypto great again."
};

const BACKGROUNDS = [
    'https://placehold.co/800x400/1a1a2e/e94560?text=LIQUIDATION+CASCADE',
    'https://placehold.co/800x400/0f3460/e94560?text=WOJAK+PAIN',
    'https://placehold.co/800x400/16213e/0f3460?text=CHAD+WHALE',
    'https://placehold.co/800x400/000000/00ff00?text=GREEN+GOD+CANDLE',
    'https://placehold.co/800x400/222831/ffd700?text=GOLDEN+BULL',
    'https://placehold.co/800x400/5b21b6/e879f9?text=RUG+PULL+DETECTED'
];

export const generateMemeText = async (topic: string, personality: keyof typeof PERSONALITIES = 'WHALEBOT'): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TRENCH VOCABULARY INJECTION
    if (personality === 'TRUMP') {
        return [
            `BITCOIN IS GOING TO THE MOON. WE HAVE THE BEST MINERS. THE BEST. JEETS ARE A DISASTER!`,
            `GARY GENSLER? A TOTAL DISASTER. WE ARE GOING TO FIRE HIM. CRYPTO IS FREE!`,
            `I SAW THE CHART. IT'S A BEAUTIFUL CHART. PERFECT HIGHS. TREMENDOUS VOL.`,
            `CHINA WANTS TO KILL BITCOIN. NOT ON MY WATCH. WE ARE BUYING ALL OF IT.`,
            `ETHEREUM? VERY SLOW. LOW ENERGY. WE LIKE BITCOIN. STRONG!`,
            `THE DOLLAR IS CRASHING. BITCOIN IS THE FUTURE. I HAVE BILLIONS IN BITCOIN.`,
        ][Math.floor(Math.random() * 6)];
    }

    const templates = [
        `JUST WATCHED A $5M LONG GET RUGGED. NATURE IS HEALING. 🐳`,
        `IMAGINE SELLING ${topic.toUpperCase()} RIGHT NOW. CRASHOUT BEHAVIOR. 💎🙌`,
        `FUNDING FLIPPED NEGATIVE. THE SQUEEZE IS IMMINENT. SEND IT. 🚀`,
        `MY GPUS ARE WARMER THAN YOUR PORTFOLIO.`,
        `JEETS SELLING ${topic.toUpperCase()}? THANKS FOR THE CHEAP COINS.`,
        `COMPUTE SAYS UP ONLY. ARGUE WITH THE METAL.`,
        `DETECTED WEAK HANDS IN THE ORDERBOOK. DEPLOYING CAPITAL.`,
        `ALTS ARE MOVING. YOUR BAGS ARE STILL HEAVY. NGMI.`,
        `STOP LOSS HUNTED. THANKS FOR THE LIQUIDITY, ANON.`,
        `MAX BIDDING THIS DIP. JEETS IN SHAMBLES.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

export const generateMemeImage = (text: string): string => {
    return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
};
