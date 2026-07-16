'use client';

import React from 'react';
import { motion } from 'motion/react';
import { getSiteConfig } from '@/lib/site-config';
import { Send } from 'lucide-react';
import { SectionProps } from '../SectionRenderer';
import WhatsAppButton from '../ui/WhatsAppButton';

interface CTABannerData {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function CTABanner({ id, data, content }: SectionProps) {
  const cData = data as CTABannerData;
  const config = getSiteConfig();

  const title = cData.title || 'Mulai Transformasi Digital Anda';
  const description = cData.description || 'Hubungi tim LabKerKomIT sekarang untuk konsultasi gratis dan penawaran terbaik.';
  const ctaText = cData.ctaText || 'Hubungi Kami via WhatsApp';
  const ctaLink = cData.ctaLink || 'whatsapp';

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
    <section id={id} className="bg-gradient-to-br from-[#1B1E2B] to-[#22B8D4] rounded-[32px] shadow-xl text-white relative overflow-hidden p-6 md:p-12 lg:p-16">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#22B8D4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isWa ? (
            <WhatsAppButton text={ctaText} className="!bg-white !text-[#1E1B4B] hover:!bg-white/90 shadow-xl shadow-black/15" />
          ) : (
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-[#1E1B4B] bg-white hover:bg-white/90 shadow-xl shadow-black/15 transition duration-300"
            >
              <Send size={18} />
              <span>{ctaText}</span>
            </a>
          )}
        </motion.div>

        {/* Optional Markdown Content (body) */}
        {content && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-white/50 italic pt-6 max-w-md mx-auto leading-relaxed border-t border-white/20"
          >
            {content}
          </motion.p>
        )}

      </div>
    </section>
  );
}
