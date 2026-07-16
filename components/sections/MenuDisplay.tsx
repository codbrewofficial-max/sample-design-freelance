'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionProps } from '../SectionRenderer';
import PoweredByOverlay from '../watermark/PoweredByOverlay';

interface MenuItem {
  name: string;
  description: string;
  price: number | string;
  image?: string;
  category?: string;
}

interface MenuDisplayData {
  title?: string;
  subtitle?: string;
  items?: MenuItem[];
}

export default function MenuDisplay({ id, data, content }: SectionProps) {
  const menuData = data as MenuDisplayData;
  const title = menuData.title || 'Daftar Menu';
  const subtitle = menuData.subtitle || 'Pilihan hidangan istimewa yang kami sajikan dengan sepenuh hati.';
  const items = menuData.items || [];

  // Helper to format price to Rupiah, e.g. 18000 -> "Rp 18.000"
  const formatPrice = (price: number | string) => {
    if (price === undefined || price === null) return '';
    const numericStr = String(price).replace(/[^\d]/g, '');
    const numeric = parseInt(numericStr, 10);
    if (isNaN(numeric)) return String(price); // Fallback for non-numeric prices like "Hubungi Kami"
    return `Rp ${numeric.toLocaleString('id-ID')}`;
  };

  // Check if items have category field for grouping
  const hasCategories = items.some((item) => item.category);

  // Group items by category if applicable
  const groups: Record<string, MenuItem[]> = {};
  const categoryOrder: string[] = [];

  if (hasCategories) {
    items.forEach((item) => {
      const cat = item.category || 'Lainnya';
      if (!groups[cat]) {
        groups[cat] = [];
        categoryOrder.push(cat);
      }
      groups[cat].push(item);
    });
  }

  // Render a single menu card
  const renderCard = (item: MenuItem, index: number, delayIndex: number) => {
    const fallbackImage = `https://picsum.photos/seed/menu-${index}/600/400`;
    const itemImage = item.image || fallbackImage;

    return (
      <motion.div
        key={`${id}-item-${index}`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delayIndex * 0.05 }}
        className="group flex flex-col bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        {/* Product Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={itemImage}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay for better contrast */}
          <div className="absolute inset-0 bg-slate-950/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          
          {/* Watermark Overlay in bottom right corner of the image */}
          <PoweredByOverlay />
        </div>

        {/* Product Information */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-2">
              <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors duration-200">
                {item.name}
              </h4>
              <span className="text-sm font-bold text-amber-700 shrink-0 font-mono">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

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

        {/* Menu Items Grid */}
        {items.length > 0 ? (
          hasCategories ? (
            <div className="space-y-12">
              {categoryOrder.map((cat, catIndex) => (
                <div key={`${id}-cat-${catIndex}`} className="space-y-6">
                  {/* Category Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-sans shrink-0">
                      {cat}
                    </h3>
                    <div className="h-px bg-slate-200/80 w-full" />
                  </motion.div>

                  {/* Category Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups[cat].map((item, index) =>
                      renderCard(item, index, index + catIndex * 2)
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {items.map((item, index) => renderCard(item, index, index))}
            </div>
          )
        ) : (
          <div className="text-center text-sm text-slate-400 font-mono py-12 border border-dashed border-slate-200 rounded-2xl">
            [No menu items specified in markdown frontmatter items array]
          </div>
        )}

        {/* Dynamic Markdown Content (body) */}
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-8 leading-relaxed border-t border-slate-200/60"
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
