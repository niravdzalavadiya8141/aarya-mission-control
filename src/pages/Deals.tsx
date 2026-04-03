import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Plus, 
  Search, 
  Mail, 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  Edit2,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';

import GlowCard from '../components/ui/GlowCard';
import Modal from '../components/ui/Modal';
import { useDealStore } from '../store/useDealStore';
import { useXPStore } from '../store/useXPStore';
import { AGENTS } from '../data/agents';
import type { Deal, DealStatus } from '../data/deals';

// --- Constants ---

const STATUS_CONFIG: Record<DealStatus, { label: string; color: string; bg: string }> = {
  lead: { label: 'LEAD', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)' },
  negotiating: { label: 'NEGOTIATING', color: '#00FFFF', bg: 'rgba(0, 255, 255, 0.1)' },
  agreed: { label: 'AGREED', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  'in-progress': { label: 'IN PROGRESS', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  delivered: { label: 'DELIVERED', color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
  paid: { label: 'PAID', color: '#00FF88', bg: 'rgba(0, 255, 136, 0.1)' },
  lost: { label: 'LOST', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

// --- Sub-components ---

const DealRow = ({ deal }: { deal: Deal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = STATUS_CONFIG[deal.status];
  const paymentProgress = (deal.paidAmount / (deal.value || 1)) * 100;

  return (
    <div className="group border-b border-white/5 last:border-0 overflow-hidden">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-4 px-4 py-4 hover:bg-white/[0.02] transition-all cursor-pointer"
      >
        <div className="flex-1 flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xl shrink-0">
            {deal.logo}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white group-hover:text-[#00FFFF] transition-colors truncate">
              {deal.brand}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{deal.platform}</span>
            </div>
          </div>
        </div>

        <div className="w-32 hidden md:block">
          <div className="text-sm font-bold text-white">{formatCurrency(deal.value)}</div>
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Deal Value</div>
        </div>

        <div className="w-32 hidden lg:block">
          <span 
            className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter"
            style={{ color: status.color, backgroundColor: status.bg, border: `1px solid ${status.color}33` }}
          >
            {status.label}
          </span>
        </div>

        <div className="w-32 hidden xl:block">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{AGENTS.find(a => a.id === deal.agentId)?.emoji}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{AGENTS.find(a => a.id === deal.agentId)?.name}</span>
          </div>
        </div>

        <div className="w-40 hidden sm:block">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase mb-1">
            <span>Payment</span>
            <span className="text-green-400">{Math.round(paymentProgress)}%</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
              style={{ width: `${paymentProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button className={`p-2 rounded-lg hover:bg-white/5 transition-all ${isExpanded ? 'rotate-180 text-[#00FFFF]' : 'text-gray-500'}`}>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black/40 border-t border-white/5 overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Contact Details</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <User size={14} className="text-[#00FFFF]" />
                    <span className="font-bold">{deal.contactName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <Mail size={14} className="text-[#00FFFF]" />
                    <span className="font-mono">{deal.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <Calendar size={14} className="text-[#00FFFF]" />
                    <span>Deadline: {format(new Date(deal.deadline), 'dd MMM yyyy')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Deliverables</h5>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {deal.deliverables}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Financial Status</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Paid Amount</span>
                    <span className="text-green-400 font-bold">{formatCurrency(deal.paidAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Pending</span>
                    <span className="text-yellow-400 font-bold">{formatCurrency(deal.pendingAmount)}</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">Total Value</span>
                    <span className="text-[#00FFFF] font-black">{formatCurrency(deal.value)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6 flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest flex items-center gap-2">
                <Edit2 size={12} /> Edit Deal
              </button>
              <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-black text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-widest flex items-center gap-2">
                <Trash2 size={12} /> Archive
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function Deals() {
  const deals = useDealStore(state => state.deals);
  const getTotalPipeline = useDealStore(state => state.getTotalPipeline);
  const getTotalEarned = useDealStore(state => state.getTotalEarned);
  const getTotalPending = useDealStore(state => state.getTotalPending);
  const addDeal = useDealStore(state => state.addDeal);
  const { addActivity } = useXPStore();
  
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<DealStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newBrand, setNewBrand] = useState('');
  const [newValue, setNewValue] = useState(0);
  const [newAgent, setNewAgent] = useState('natasha');

  const agentsMap = useMemo(() => {
    const map: Record<string, typeof AGENTS[0]> = {};
    AGENTS.forEach(a => {
      map[a.id] = a;
    });
    return map;
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchesSearch = d.brand.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [deals, search, filterStatus]);

  console.log('Agents Map initialized:', Object.keys(agentsMap).length);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    
    addDeal({
      brand: newBrand,
      logo: '🏢',
      value: newValue,
      paidAmount: 0,
      pendingAmount: newValue,
      status: 'lead',
      platform: 'Multiple',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      agentId: newAgent,
      contactName: 'New Lead',
      contactEmail: 'contact@brand.com',
      deliverables: 'To be negotiated',
      notes: 'Initial lead created from dashboard.',
    });

    addActivity({
      agentId: 'aarya',
      agentName: 'AARYA',
      agentEmoji: '⚡',
      agentColor: '#00FFFF',
      action: `initialized new brand lead: "${newBrand}"`,
    });

    setIsModalOpen(false);
    setNewBrand('');
    setNewValue(0);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlowCard glowColor="#00FFFF" className="h-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#00FFFF]/10 border border-[#00FFFF]/20">
              <Briefcase size={18} className="text-[#00FFFF]" />
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Deals</span>
          </div>
          <div className="text-2xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {deals.filter(d => !['paid', 'lost'].includes(d.status)).length}
          </div>
        </GlowCard>

        <GlowCard glowColor="#3B82F6" className="h-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              <TrendingUp size={18} className="text-[#3B82F6]" />
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Pipeline</span>
          </div>
          <div className="text-2xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {formatCurrency(getTotalPipeline())}
          </div>
        </GlowCard>

        <GlowCard glowColor="#00FF88" className="h-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/20">
              <CheckCircle2 size={18} className="text-[#00FF88]" />
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Earned Revenue</span>
          </div>
          <div className="text-2xl font-black text-green-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {formatCurrency(getTotalEarned())}
          </div>
        </GlowCard>

        <GlowCard glowColor="#FFD700" className="h-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/20">
              <Clock size={18} className="text-[#FFD700]" />
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pending</span>
          </div>
          <div className="text-2xl font-black text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {formatCurrency(getTotalPending())}
          </div>
        </GlowCard>
      </div>

      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            💼 BRAND DEALS
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'lead', 'negotiating', 'agreed', 'in-progress', 'delivered', 'paid', 'lost'] as const).map(s => (
              <button 
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all
                  ${filterStatus === s 
                    ? 'bg-[#00FFFF] text-black shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                    : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group flex-1 xl:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00FFFF] transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#111827] border border-slate-800 focus:border-[#00FFFF] rounded-lg text-sm text-white outline-none w-full xl:w-64 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white font-black rounded-lg hover:bg-orange-400 active:scale-95 transition-all text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            <Plus size={16} /> NEW DEAL
          </button>
        </div>
      </div>

      {/* Deals List */}
      <div className="bg-[#111827]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="hidden md:flex items-center gap-4 px-8 py-4 bg-black/40 border-b border-white/5">
          <div className="flex-1 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Brand & Platform</div>
          <div className="w-32 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Value</div>
          <div className="w-32 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden lg:block">Status</div>
          <div className="w-32 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden xl:block">Assigned To</div>
          <div className="w-40 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden sm:block">Payment</div>
          <div className="w-10"></div>
        </div>
        
        <div className="divide-y divide-white/5">
          {filteredDeals.length > 0 ? (
            filteredDeals.map(deal => (
              <DealRow key={deal.id} deal={deal} />
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="text-4xl opacity-20">💼</div>
              <div className="text-xs font-black text-gray-600 uppercase tracking-widest">No deals found matching your criteria</div>
            </div>
          )}
        </div>
      </div>

      {/* New Deal Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="💼 INITIALIZE BRAND DEAL"
      >
        <form onSubmit={handleCreateDeal} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Brand Name</label>
            <input 
              required
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="e.g. Google Cloud, Nike, etc."
              className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Deal Value (₹)</label>
              <input 
                required
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(parseInt(e.target.value))}
                className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lead Agent</label>
              <select 
                value={newAgent}
                onChange={(e) => setNewAgent(e.target.value)}
                className="w-full bg-[#0D1117] border border-slate-800 focus:border-[#00FFFF] rounded-lg p-3 text-sm text-white outline-none"
              >
                {AGENTS.filter(a => a.id !== 'aarya').map(a => (
                  <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10">
            <div className="flex gap-3">
              <AlertCircle className="text-orange-500 shrink-0" size={16} />
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Initializing a new deal will set the status to <span className="text-orange-400 font-bold uppercase tracking-tighter">LEAD</span>. 
                You can update the status, contact info, and deliverables once the deal is created.
              </p>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-500 text-white font-black rounded-lg py-3 mt-4 flex items-center justify-center gap-2 hover:bg-orange-400 active:scale-95 transition-all text-sm tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            CREATE BRAND LEAD
          </button>
        </form>
      </Modal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
