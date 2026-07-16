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

        {/* Testimonials Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, index) => {
              const rating = item.rating || 5;
              return (
                <motion.div
                  key={`${id}-item-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-5 flex flex-col justify-between hover:shadow-md transition duration-300"
                >
                  {/* Quote icon */}
                  <div className="space-y-4">
                    <svg className="w-8 h-8 text-[#22B8D4]/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {/* Star rating */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={16}
                          className={`${
                            starIndex < rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate-700 text-sm leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Avatar + Name + Role */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22B8D4] to-[#1E1B4B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E1B4B]">
                        {item.name}
                      </h4>
                    </div>
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
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 leading-relaxed border-t border-slate-200"
          >
            {content}
          </motion.div>
        )}

      </div>
    </section>
  );
}
