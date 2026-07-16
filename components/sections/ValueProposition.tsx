'use client';

import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { SectionProps } from '../SectionRenderer';

interface ValuePoint {
  title: string;
  description: string;
  icon?: string;
}

interface ValuePropData {
  title?: string;
  subtitle?: string;
  items?: ValuePoint[];
  points?: ValuePoint[];
}

export default function ValueProposition({ id, data, content }: SectionProps) {
  const valueData = data as ValuePropData;
  const title = valueData.title || 'Kelebihan Kami';
  const subtitle = valueData.subtitle || 'Mengapa kami adalah pilihan terbaik untuk meningkatkan visibilitas digital Anda.';
  const points = valueData.points || valueData.items || [];

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

        {/* Value Points Grid - 2x2 */}
        {points.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {points.map((point, index) => {
              const iconName = (point.icon || 'HelpCircle')
                .toLowerCase()
                .replace(/-./g, (x) => x[1].toUpperCase());
              
              const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
              
              const IconComponent = (LucideIcons as any)[formattedIconName] || LucideIcons.Zap;

              return (
                <motion.div
                  key={`${id}-point-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 space-y-5 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300"
                >
                  <div className="p-3.5 bg-[#22B8D4]/10 text-[#22B8D4] rounded-2xl w-fit">
                    <IconComponent size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1E1B4B] tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-sm text-slate-400 font-mono py-12 border border-dashed border-slate-200 rounded-2xl">
            [No value points items found in markdown frontmatter]
          </div>
        )}

        {/* Fallback description body text from Markdown */}
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 border-t border-slate-200 leading-relaxed"
          >
            {content}
          </motion.div>
        )}

      </div>
    </section>
  );
}
