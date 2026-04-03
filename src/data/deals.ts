export type DealStatus = 'lead' | 'negotiating' | 'agreed' | 'in-progress' | 'delivered' | 'paid' | 'lost';

export interface Deal {
  id: string;
  brand: string;
  logo: string;
  value: number;
  paidAmount: number;
  pendingAmount: number;
  status: DealStatus;
  platform: string;
  deadline: string;
  agentId: string;
  contactName: string;
  contactEmail: string;
  deliverables: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_CONFIG: Record<DealStatus, { label: string; color: string; bg: string }> = {
  lead: { label: 'LEAD', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)' },
  negotiating: { label: 'NEGOTIATING', color: '#00FFFF', bg: 'rgba(0, 255, 255, 0.1)' },
  agreed: { label: 'AGREED', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  'in-progress': { label: 'IN PROGRESS', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  delivered: { label: 'DELIVERED', color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
  paid: { label: 'PAID', color: '#00FF88', bg: 'rgba(0, 255, 136, 0.1)' },
  lost: { label: 'LOST', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    brand: 'Hostinger',
    logo: '🌐',
    value: 50000,
    paidAmount: 25000,
    pendingAmount: 25000,
    status: 'in-progress',
    platform: 'YouTube',
    deadline: new Date(Date.now() + 2592000000).toISOString(),
    agentId: 'natasha',
    contactName: 'Raj Patel',
    contactEmail: 'partnerships@hostinger.in',
    deliverables: 'VPS hosting partnership, tutorial video, affiliate integration',
    notes: 'Final negotiations ongoing. Expecting confirmation this week.',
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'deal-2',
    brand: 'Kiran Gems',
    logo: '💎',
    value: 120000,
    paidAmount: 0,
    pendingAmount: 120000,
    status: 'negotiating',
    platform: 'Website',
    deadline: new Date(Date.now() + 5184000000).toISOString(),
    agentId: 'natasha',
    contactName: 'Kiran Shah',
    contactEmail: 'marketing@kirangems.com',
    deliverables: 'Website development, digital catalog, social media campaign',
    notes: 'High-value jewelry client. Multiple meetings scheduled.',
    createdAt: new Date(Date.now() - 1814400000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'deal-3',
    brand: 'EDINAI Academy',
    logo: '🎓',
    value: 30000,
    paidAmount: 30000,
    pendingAmount: 0,
    status: 'delivered',
    platform: 'Instagram',
    deadline: new Date(Date.now() - 604800000).toISOString(),
    agentId: 'wanda',
    contactName: 'Dr. Priya Sharma',
    contactEmail: 'collab@edinai.academy',
    deliverables: 'Instagram campaign, 5 posts, 3 reels, story series',
    notes: 'Education platform partnership completed successfully.',
    createdAt: new Date(Date.now() - 2419200000).toISOString(),
    updatedAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 'deal-4',
    brand: 'Myntra Affiliate',
    logo: '👗',
    value: 15000,
    paidAmount: 15000,
    pendingAmount: 0,
    status: 'paid',
    platform: 'Instagram',
    deadline: new Date(Date.now() - 1209600000).toISOString(),
    agentId: 'vision',
    contactName: 'Affiliate Team',
    contactEmail: 'affiliates@myntra.com',
    deliverables: 'Affiliate links integration, product showcase content',
    notes: 'Fashion affiliate partnership - fully paid and completed.',
    createdAt: new Date(Date.now() - 3628800000).toISOString(),
    updatedAt: new Date(Date.now() - 1209600000).toISOString(),
  },
  {
    id: 'deal-5',
    brand: 'Local Jewelry Store',
    logo: '💍',
    value: 75000,
    paidAmount: 0,
    pendingAmount: 75000,
    status: 'lead',
    platform: 'Multiple',
    deadline: new Date(Date.now() + 7776000000).toISOString(),
    agentId: 'natasha',
    contactName: 'Mahesh Bhai',
    contactEmail: 'owner@localjewels.in',
    deliverables: 'Full digital presence setup, website, social media, SEO',
    notes: 'Local business looking to expand online. Initial discussions.',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

export const DEAL_STATUS_COLORS: Record<DealStatus, string> = {
  lead: '#94A3B8',
  negotiating: '#00FFFF',
  agreed: '#3B82F6',
  'in-progress': '#8B5CF6',
  delivered: '#F97316',
  paid: '#00FF88',
  lost: '#FF3366',
};

export const formatIndianCurrency = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }
  return `₹${amount}`;
};

export const formatFullINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
