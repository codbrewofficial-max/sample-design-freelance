'use client';

import React from 'react';
import { motion } from 'motion/react';
import { getSiteConfig } from '@/lib/site-config';

interface PoweredByFloatingProps {
  text?: string;
  link?: string;
  className?: string;
}

export default function PoweredByFloating({ text, link, className = '' }: PoweredByFloatingProps) {
  const config = getSiteConfig();
  
  if (!config || !config.watermark) return null;
  const { enabled, poweredByText, poweredByLink, variants } = config.watermark;

  // Check if watermark is enabled globally and "floating" variant is active
  if (!enabled || !variants?.includes('floating')) return null;

  const finalText = text || poweredByText;
  const finalLink = link || poweredByLink;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`fixed bottom-6 right-6 z-50 ${className}`}
    >
      <a
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white text-xs font-semibold font-sans tracking-wide shadow-lg border border-slate-800 backdrop-blur-md transition-all group"
        id="watermark-floating"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
        <span className="text-slate-300 group-hover:text-white transition-colors">
          {finalText}
        </span>
      </a>
    </motion.div>
  );
}
