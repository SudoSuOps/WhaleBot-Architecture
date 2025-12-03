import { WHALE_CONFIG } from '../constants';

const API_BASE = WHALE_CONFIG.api.worker;

export const positionService = {
  async loadPositions(userId: string): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.positions}?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to load positions');
      const data = await res.json();
      return data.positions || [];
    } catch (error) {
      console.error('Load positions error:', error);
      return [];
    }
  },

  async createPosition(userId: string, position: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.positions}?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(position)
      });
      if (!res.ok) throw new Error('Failed to create position');
      return res.json();
    } catch (error) {
      console.error('Create position error:', error);
      throw error;
    }
  },

  async closePosition(userId: string, positionId: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.positions}?userId=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positionId })
      });
      if (!res.ok) throw new Error('Failed to close position');
      return res.json();
    } catch (error) {
      console.error('Close position error:', error);
      throw error;
    }
  },

  async loadHistory(userId: string): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.history}?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to load history');
      const data = await res.json();
      return data.history || [];
    } catch (error) {
      console.error('Load history error:', error);
      return [];
    }
  },

  async loadVault(userId: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.vault}?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to load vault');
      return res.json();
    } catch (error) {
      console.error('Load vault error:', error);
      return { balance: 1000000, initial: 1000000 };
    }
  },

  async updateVault(userId: string, balance: number): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}${WHALE_CONFIG.api.vault}?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance })
      });
      if (!res.ok) throw new Error('Failed to update vault');
      return res.json();
    } catch (error) {
      console.error('Update vault error:', error);
      throw error;
    }
  }
};
