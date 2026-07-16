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
    <section id={id} className="py-24 px-6 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {items.map((item, index) => {
              const bgImg = item.image || `https://picsum.photos/seed/gallery-${index}/600/400`;
              return (
                <motion.div
                  key={`${id}-item-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-100 flex flex-col justify-end"
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

                  {/* Gradient Overlay for Caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Text/Caption details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.caption && (
                      <p className="text-sm font-semibold text-white tracking-wide drop-shadow-sm font-sans">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  {/* Watermark Overlay in bottom right corner */}
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
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 leading-relaxed border-t border-slate-200/60"
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
