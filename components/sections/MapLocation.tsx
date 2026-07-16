'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { SectionProps } from '../SectionRenderer';

interface MapLocationData {
  title?: string;
  subtitle?: string;
  mapEmbedUrl?: string;
  address?: string;
}

export default function MapLocation({ id, data, content }: SectionProps) {
  const mapData = data as MapLocationData;
  const title = mapData.title || 'Lokasi Kami';
  const subtitle = mapData.subtitle || 'Temukan kami langsung di Google Maps untuk memudahkan kunjungan Anda.';
  const address = mapData.address || 'Jl. Teknik Komputer No. 1, Kampus ITS, Surabaya';
  
  // Default fallback embed URL to Surabaya, Indonesia if none is configured
  const mapEmbedUrl = mapData.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.691979929255!2d112.7944063!3d-7.2758471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10fb63ff83%3A0x6b107b1d9bc4155b!2sDepartemen%20Teknik%20Komputer%20ITS!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid';

  return (
    <section id={id} className="bg-[#F5F7FA] rounded-[32px] shadow-xl p-6 md:p-12">
      <div className="space-y-10 md:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1B4B]"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Address & Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-stretch">
          
          {/* Address card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <div className="p-3.5 bg-[#22B8D4]/10 text-[#22B8D4] rounded-2xl w-fit">
                <MapPin size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1E1B4B] tracking-tight">
                  Base Operasi
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {address}
                </p>
              </div>
            </div>

            {content && (
              <div className="text-xs text-slate-500 italic border-l-2 border-slate-200 pl-4 py-1">
                {content}
              </div>
            )}
          </motion.div>

          {/* Map Embed Iframe (8 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 h-[380px] md:h-[450px] rounded-3xl overflow-hidden shadow-md ring-1 ring-[#22B8D4]/20 relative"
          >
            <iframe
              src={mapEmbedUrl}
              title={`Maps Location for ${title}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
