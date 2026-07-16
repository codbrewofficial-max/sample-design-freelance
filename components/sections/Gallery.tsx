'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionProps } from '../SectionRenderer';
import PoweredByOverlay from '../watermark/PoweredByOverlay';

interface GalleryItem {
  image: string;
  caption?: string;
}

interface GalleryData {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
}

export default function Gallery({ id, data, content }: SectionProps) {
  const galleryData = data as GalleryData;
  const title = galleryData.title || 'Galeri Dokumentasi';
  const subtitle = galleryData.subtitle || 'Dokumentasi foto kegiatan dan portofolio terbaik kami.';
  const items = galleryData.items || [];

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

        {/* Responsive Grid of Images */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const bgImg = item.image || `https://picsum.photos/seed/gallery-${index}/600/400`;

              // Extract category tag from caption (e.g. "[UI/UX] Redesain Dashboard..." → "UI/UX")
              const tagMatch = item.caption?.match(/^\[(.+?)\]/);
              const tag = tagMatch ? tagMatch[1] : null;
              const cleanCaption = tagMatch ? item.caption?.replace(/^\[.+?\]\s*/, '') : item.caption;

              return (
                <motion.div
                  key={`${id}-item-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative h-72 rounded-3xl overflow-hidden shadow-sm bg-white border border-slate-100"
                >
                  {/* Gallery Image */}
                  <Image
                    src={bgImg}
                    alt={item.caption || `Gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Category Tag */}
                  {tag && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold rounded-full bg-[#22B8D4]/90 text-white backdrop-blur-sm">
                      {tag}
                    </span>
                  )}

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {cleanCaption && (
                      <p className="text-sm font-semibold text-white tracking-wide drop-shadow-sm">
                        {cleanCaption}
                      </p>
                    )}
                  </div>

                  <PoweredByOverlay />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-sm text-slate-400 font-mono py-12 border border-dashed border-slate-200 rounded-2xl">
            [No gallery items specified in markdown frontmatter items array]
          </div>
        )}

        {/* Dynamic Markdown Content (body) */}
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 leading-relaxed border-t border-slate-200"
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
