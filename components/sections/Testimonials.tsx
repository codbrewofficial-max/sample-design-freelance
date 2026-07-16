'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { SectionProps } from '../SectionRenderer';

interface TestimonialItem {
  name: string;
  quote: string;
  rating?: number;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
}

export default function Testimonials({ id, data, content }: SectionProps) {
  const tData = data as TestimonialsData;
  const title = tData.title || 'Kata Mereka';
  const subtitle = tData.subtitle || 'Dengarkan kisah sukses langsung dari mitra dan klien kami.';
  const items = tData.items || [];

  return (
    <section id={id} className="py-24 px-6 bg-white text-slate-900 font-sans">
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

        {/* Testimonials Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {items.map((item, index) => {
              const rating = item.rating || 5;
              return (
                <motion.div
                  key={`${id}-item-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:shadow-md transition duration-300"
                >
                  <div className="space-y-4">
                    {/* Star rating */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={16}
                          className={`${
                            starIndex < rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate-700 text-sm leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Name info */}
                  <div className="pt-4 border-t border-slate-200/40">
                    <h4 className="text-sm font-bold text-slate-950 tracking-tight">
                      {item.name}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-sm text-slate-400 font-mono py-12 border border-dashed border-slate-200 rounded-2xl">
            [No testimonial items found in markdown frontmatter]
          </div>
        )}

        {/* Dynamic Markdown Content (body) */}
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 leading-relaxed border-t border-slate-100"
          >
            {content}
          </motion.div>
        )}

      </div>
    </section>
  );
}
