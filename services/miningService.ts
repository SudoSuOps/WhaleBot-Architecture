import { MiningStats } from '../types';
let currentHashrate = 450; let blockHeight = 845230; let lastBlockTime = Date.now();
export const getMiningStats = (): MiningStats => {
    currentHashrate = currentHashrate + (Math.random() * 20 - 10);
    if (Date.now() - lastBlockTime > 1000 * 60 * 10) { blockHeight++; lastBlockTime = Date.now(); }
    const probability = (currentHashrate / 600000000) * 100;
    return { hashrate: Math.max(0, currentHashrate), temp: 68 + Math.random() * 5, blockHeight, bestShareDifficulty: 4000000000 + Math.random() * 1000000000, power: 3200 + Math.random() * 100, status: Math.random() > 0.999 ? 'FOUND_BLOCK' : 'HASHING', probability };
};
