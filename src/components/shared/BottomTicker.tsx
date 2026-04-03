import { useMemo } from 'react';

const tickerItems = [
  "⚡ JARVIS deployed v2.1",
  "🎯 HAWKEYE cleared 3 bugs",
  "🦾 BUCKY pushed 12 commits",
  "🎨 FRIDAY completed cyberpunk UI",
  "💼 NATASHA closed Hostinger deal",
  "🔮 WANDA created viral reel script",
  "🔧 ULTRON optimized server routes",
  "🚀 ROCKET reduced bundle by 24%",
  "⚡ JARVIS deployed v2.1",
  "🎯 HAWKEYE cleared 3 bugs",
  "🦾 BUCKY pushed 12 commits",
  "🎨 FRIDAY completed cyberpunk UI",
  "💼 NATASHA closed Hostinger deal",
  "🔮 WANDA created viral reel script",
  "🔧 ULTRON optimized server routes",
  "🚀 ROCKET reduced bundle by 24%",
];

export default function BottomTicker() {
  const tickerItemsMemo = useMemo(() => tickerItems, []);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-[240px] h-10 bg-[rgba(13,17,23,0.8)] border-t border-[rgba(0,255,255,0.1)] backdrop-blur-md z-40 overflow-hidden flex items-center">
      <div 
        className="flex gap-8 whitespace-nowrap animate-ticker py-2"
        style={{
          animation: 'ticker 30s linear infinite',
        }}
      >
        {tickerItemsMemo.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span 
              className="text-[#00FFFF] text-[10px] font-bold tracking-[0.2em]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700 mx-2"></span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
