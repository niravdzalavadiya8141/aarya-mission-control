import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'xp';
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const config = {
    success: { icon: CheckCircle2, color: '#00FF88' },
    error: { icon: AlertCircle, color: '#EF4444' },
    info: { icon: Zap, color: '#00FFFF' },
    xp: { icon: Zap, color: '#FFD700' },
  };

  const { icon: Icon, color } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className="flex items-center gap-3 p-4 bg-[#111827] border border-[rgba(255,255,255,0.05)] rounded-xl shadow-2xl min-w-[300px]"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="p-2 rounded-lg bg-black/40">
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 text-sm font-bold text-white tracking-wide">
        {message}
      </div>
      <button 
        onClick={() => onClose(id)}
        className="p-1 text-gray-500 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
