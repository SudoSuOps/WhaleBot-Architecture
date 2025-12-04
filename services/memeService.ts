const PERSONALITIES = {
    'PERPGOAT': "You are PerpGoat. Capra hircus degenerus. You love leverage. You hate jeets. You speak in capslock.",
    'PERPSHARK': "You are PerpShark. Cold. Liquidator. You smell blood. Short sentences.",
    'WHALEBOT': "You are WhaleBot AI. Analytical but condescending. You see humans as liquidity.",
    'PERPJEET': "You are PerpJeet. Nervous. Paper hands. Always selling the bottom."
};

const BACKGROUNDS = [
    'https://placehold.co/800x400/1a1a2e/e94560?text=LIQUIDATION+CASCADE',
    'https://placehold.co/800x400/0f3460/e94560?text=WOJAK+PAIN',
    'https://placehold.co/800x400/16213e/0f3460?text=CHAD+WHALE',
    'https://placehold.co/800x400/000000/00ff00?text=GREEN+GOD+CANDLE',
    'https://placehold.co/800x400/222831/ffd700?text=GOLDEN+BULL'
];

export const generateMemeText = async (topic: string, personality: keyof typeof PERSONALITIES = 'WHALEBOT'): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const templates = [
        `JUST WATCHED A $5M LONG GET LIQUIDATED. NATURE IS HEALING. 🐳`,
        `IMAGINE SELLING ${topic.toUpperCase()} RIGHT NOW. COULDN'T BE ME. 💎🙌`,
        `FUNDING FLIPPED NEGATIVE. THE SQUEEZE IS IMMINENT. SEND IT. 🚀`,
        `MY GPUS ARE WARMER THAN YOUR PORTFOLIO.`,
        `JEETS SELLING ${topic.toUpperCase()}? THANKS FOR THE CHEAP COINS.`,
        `COMPUTE SAYS UP ONLY. ARGUE WITH THE METAL.`,
        `DETECTED WEAK HANDS IN THE ORDERBOOK. DEPLOYING CAPITAL.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

export const generateMemeImage = (text: string): string => {
    // Return a random visual template
    const base = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    // In a real app with Cloudflare Images, we would layer the text here.
    // For now, we return the base to visualize variation.
    return base;
};
