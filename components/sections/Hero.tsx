'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionProps } from '../SectionRenderer';
import { getSiteConfig } from '@/lib/site-config';
import PoweredByOverlay from '../watermark/PoweredByOverlay';
import WhatsAppButton from '../ui/WhatsAppButton';

interface HeroData {
  title?: string;
  headline?: string;
  subtitle?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: string;
  backgroundImage?: string;
}

export default function Hero({ id, data, content }: SectionProps) {
  const heroData = data as HeroData;
  const config = getSiteConfig();

  const title = heroData.headline || heroData.title || 'Selamat Datang';
  const subtitle = heroData.subheadline || heroData.subtitle || 'Website public page profesional yang ditenagai oleh LabKerKomIT.';
  const ctaText = heroData.ctaText || 'Hubungi Kami';
  const ctaLink = heroData.ctaLink || 'whatsapp';
  const imageUrl = heroData.heroImage || heroData.backgroundImage || 'https://picsum.photos/seed/hero/1200/800';

  // WhatsApp redirect builder
  const getCtaHref = () => {
    if (ctaLink === 'whatsapp') {
      const waNum = config.contact.whatsappNumber;
      const waMsg = encodeURIComponent(config.contact.whatsappMessage);
      return `https://wa.me/${waNum}?text=${waMsg}`;
    }
    return ctaLink;
  };

  const isWa = ctaLink === 'whatsapp';

  return (
    <section id={id} className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-24 px-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_40%)]" />
        
        {/* Powered by LabKerKomIT Overlay on Hero BG Image */}
        <PoweredByOverlay />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-white font-sans"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4"
        >
          {isWa ? (
            <WhatsAppButton text={ctaText} />
          ) : (
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-102 transition-all duration-300"
            >
              {ctaText}
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
        </motion.div>

        {/* Fallback description body text from Markdown */}
        {content && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-mono text-slate-500 max-w-md mx-auto pt-8 border-t border-slate-800/50"
          >
            {content}
          </motion.p>
        )}
      </div>
    </section>
  );
}
