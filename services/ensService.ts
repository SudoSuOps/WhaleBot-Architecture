import { UserProfile, SubscriptionTier } from '../types';
import { WHALE_CONFIG } from '../constants';
export const checkDomainAvailability = async (handle: string, rootDomain: string): Promise<boolean> => { await new Promise(resolve => setTimeout(resolve, 600)); return handle.toLowerCase() !== 'satoshi'; };
export const mintSubdomain = async (handle: string, rootDomain: string, wallet: string): Promise<UserProfile> => { await new Promise(resolve => setTimeout(resolve, 1500)); let tier: SubscriptionTier = 'FREE'; if (rootDomain === 'whaleperp.eth') tier = 'WHALE'; if (rootDomain === 'btcsolo.eth') tier = 'GIGA'; return { handle: `${handle}.${rootDomain}`, rootDomain: rootDomain as any, walletAddress: wallet, tier, mintTimestamp: Date.now() }; };
