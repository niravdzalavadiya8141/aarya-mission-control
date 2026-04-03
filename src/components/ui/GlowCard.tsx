import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  header?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function GlowCard({ children, className = '', glowColor = '#00FFFF', header, style }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative bg-[rgba(17,24,39,0.8)] backdrop-blur-md border border-[rgba(0,255,255,0.1)] rounded-xl p-5 overflow-hidden group ${className}`}
      style={{
        boxShadow: '0 4px 24px -12px rgba(0,0,0,0.5)',
        ...style
      }}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: glowColor }}
      ></div>

      {header && (
        <div className="flex items-center justify-between mb-4 border-b border-[rgba(255,255,255,0.05)] pb-3">
          {header}
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom Glow Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          boxShadow: `0 0 10px ${glowColor}`
        }}
      ></div>
    </motion.div>
  );
}
