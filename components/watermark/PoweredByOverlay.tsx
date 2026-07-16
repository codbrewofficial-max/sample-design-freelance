'use client';

import React from 'react';
import { getSiteConfig } from '@/lib/site-config';

interface PoweredByOverlayProps {
  text?: string;
  link?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PoweredByOverlay({ text, link, className = '', children }: PoweredByOverlayProps) {
  const config = getSiteConfig();
  
  if (!config || !config.watermark) {
    return children ? <>{children}</> : null;
  }
  
  const { enabled, poweredByText, poweredByLink, variants } = config.watermark;

  // If watermark is not enabled or "overlay" variant is not active
  const showOverlay = enabled && variants?.includes('overlay');

  const finalText = text || poweredByText;
  const finalLink = link || poweredByLink;

  const overlayElement = showOverlay ? (
    <div
      className={`absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-md bg-slate-950/60 hover:bg-slate-950/80 backdrop-blur-xs text-[9px] font-mono tracking-wider text-white/60 hover:text-white pointer-events-auto border border-white/10 select-none transition-all duration-300 ${className}`}
      id="watermark-overlay"
    >
      <a
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {finalText}
      </a>
    </div>
  ) : null;

  if (children) {
    return (
      <div className="relative group overflow-hidden">
        {children}
        {overlayElement}
      </div>
    );
  }

  return overlayElement;
}
