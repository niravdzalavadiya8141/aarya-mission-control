import { motion, AnimatePresence } from 'framer-motion';
import { useXPStore } from '../../store/useXPStore';
import { formatDistanceToNow } from 'date-fns';

export default function ActivityFeed() {
  const { activityFeed } = useXPStore();

  return (
    <div className="max-h-[320px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
      <AnimatePresence initial={false}>
        {activityFeed.slice(0, 15).map((activity) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 py-2 border-l-2 pl-3 group"
            style={{ borderLeftColor: activity.agentColor }}
          >
            <span className="text-[10px] text-gray-500 font-mono w-16 shrink-0 mt-0.5">
              {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex-1">
              <span className="text-[10px] font-black mr-2 uppercase tracking-tighter" style={{ color: activity.agentColor }}>
                {activity.agentEmoji} {activity.agentName}:
              </span>
              <span className="text-[11px] text-gray-300">
                {activity.action}
              </span>
              <div className="text-[8px] text-gray-600 mt-1 uppercase font-bold tracking-widest">
                {formatDistanceToNow(new Date(activity.timestamp))} ago
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
