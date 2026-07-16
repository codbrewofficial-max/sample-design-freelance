'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionProps } from '../SectionRenderer';
import { getSiteConfig } from '@/lib/site-config';
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

const skillBadges = [
  'UI/UX Design', 'Branding', 'Motion Graphic',
  'Figma', 'Illustrator', 'After Effects',
];

const floatingIcons = [
  { label: 'Figma', emoji: '🎨', x: 'left-0 top-8', delay: 0.2 },
  { label: 'Illustrator', emoji: '✨', x: 'right-0 top-12', delay: 0.4 },
  { label: 'After Effects', emoji: '🎬', x: 'left-4 bottom-4', delay: 0.6 },
  { label: 'UI/UX', emoji: '📱', x: 'right-4 bottom-8', delay: 0.8 },
];

export default function Hero({ id, data, content }: SectionProps) {
  const heroData = data as HeroData;
  const config = getSiteConfig();

  const title = heroData.headline || heroData.title || 'Selamat Datang';
  const subtitle = heroData.subheadline || heroData.subtitle || 'Website public page profesional yang ditenagai oleh LabKerKomIT.';
  const ctaText = heroData.ctaText || 'Hubungi Kami';
  const ctaLink = heroData.ctaLink || 'whatsapp';
  const imageUrl = heroData.heroImage || heroData.backgroundImage || 'https://picsum.photos/seed/hero/1200/800';

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
    <section id={id} className="relative bg-[#F5F7FA] rounded-[32px] shadow-xl overflow-hidden">
      {/* Dot pattern texture */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#22B8D4]/10 text-[#22B8D4] text-xs font-bold rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#22B8D4] animate-pulse" />
              Freelance Designer — Siap Rakit Ide Anda
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#1E1B4B]"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              {subtitle}
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {isWa ? (
                <WhatsAppButton
                  text={ctaText}
                  className="!bg-gradient-to-r !from-[#1B1E2B] !to-[#22B8D4] !text-white !border-none !shadow-lg hover:!shadow-xl !px-8 !py-4 !text-base"
                />
              ) : (
                <a
                  href={getCtaHref()}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#1B1E2B] to-[#22B8D4] hover:shadow-xl transition-all duration-300"
                >
                  {ctaText}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
              <a
                href={getCtaHref()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-[#1E1B4B] border-2 border-[#1E1B4B]/20 hover:border-[#22B8D4] hover:text-[#22B8D4] transition-all duration-300"
              >
                Konsultasi Dulu
              </a>
            </motion.div>

            {/* Badge Row — Skill/Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-4"
            >
              {skillBadges.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white border border-slate-200 text-[#1E1B4B] shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Markdown body */}
            {content && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-slate-500 leading-relaxed pt-6 border-t border-slate-200"
              >
                {content}
              </motion.p>
            )}
          </div>

          {/* Right — Profile Photo with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Profile Photo Circle with Teal Ring */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full ring-4 ring-[#22B8D4] ring-offset-4 ring-offset-[#F5F7FA] overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badges */}
              {floatingIcons.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + item.delay, type: 'spring' }}
                  className={`absolute ${item.x} bg-white rounded-full px-3 py-1.5 shadow-lg border border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1E1B4B]`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
