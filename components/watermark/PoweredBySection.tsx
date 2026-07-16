'use client';

import React from 'react';
import { getSiteConfig } from '@/lib/site-config';

interface PoweredBySectionProps {
  text?: string;
  link?: string;
  className?: string;
}

export default function PoweredBySection({ text, link, className = '' }: PoweredBySectionProps) {
  const config = getSiteConfig();
  
  if (!config || !config.watermark) return null;
  const { enabled, poweredByText, poweredByLink, variants } = config.watermark;

  // Check if watermark is enabled globally and "section" variant is active
  if (!enabled || !variants?.includes('section')) return null;

  const finalText = text || poweredByText;
  const finalLink = link || poweredByLink;

  return (
    <div className={`mt-auto pt-6 pb-2 text-center text-[10px] md:text-xs font-mono tracking-wider text-slate-400/50 hover:text-slate-500/80 transition-colors duration-300 select-none ${className}`}>
      <a
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:underline"
        id="watermark-section"
      >
        {finalText}
      </a>
    </div>
  );
}
