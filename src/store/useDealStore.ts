import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Deal, DealStatus } from '../data/deals';
import { INITIAL_DEALS } from '../data/deals';

interface DealState {
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Deal;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  moveDealStatus: (id: string, newStatus: DealStatus) => void;
  getDealsByStatus: (status: DealStatus) => Deal[];
  getActiveDeals: () => Deal[];
  getTotalPipeline: () => number;
  getTotalEarned: () => number;
  getTotalPending: () => number;
}

export const useDealStore = create<DealState>()(
  persist(
    (set, get) => ({
      deals: INITIAL_DEALS,

      addDeal: (dealData) => {
        const newDeal: Deal = {
          ...dealData,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          deals: [...state.deals, newDeal],
        }));
        return newDeal;
      },

      updateDeal: (id, updates) => {
        set((state) => ({
          deals: state.deals.map((deal) =>
            deal.id === id ? { ...deal, ...updates, updatedAt: new Date().toISOString() } : deal
          ),
        }));
      },

      deleteDeal: (id) => {
        set((state) => ({
          deals: state.deals.filter((deal) => deal.id !== id),
        }));
      },

      moveDealStatus: (id, newStatus) => {
        set((state) => ({
          deals: state.deals.map((deal) =>
            deal.id === id
              ? { ...deal, status: newStatus, updatedAt: new Date().toISOString() }
              : deal
          ),
        }));
      },

      getDealsByStatus: (status) => {
        return get().deals.filter((deal) => deal.status === status);
      },

      getActiveDeals: () => {
        return get().deals.filter(
          (deal) => !['paid', 'lost'].includes(deal.status)
        );
      },

      getTotalPipeline: () => {
        return get().deals.reduce((sum, deal) => sum + deal.value, 0);
      },

      getTotalEarned: () => {
        return get().deals.reduce((sum, deal) => sum + deal.paidAmount, 0);
      },

      getTotalPending: () => {
        return get().deals.reduce((sum, deal) => sum + deal.pendingAmount, 0);
      },
    }),
    {
      name: 'aarya-deals-storage',
    }
  )
);
