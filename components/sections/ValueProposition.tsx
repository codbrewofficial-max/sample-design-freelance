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

        {/* Value Points Grid */}
        {points.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {points.map((point, index) => {
              // Dynamically pick a Lucide icon
              const iconName = (point.icon || 'HelpCircle')
                .toLowerCase()
                .replace(/-./g, (x) => x[1].toUpperCase()); // kebab-case to camelCase
              
              const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
              
              // Fallback to standard HelpCircle or Zap if not found
              const IconComponent = (LucideIcons as any)[formattedIconName] || LucideIcons.Zap;

              return (
                <motion.div
                  key={`${id}-point-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6 hover:shadow-lg hover:border-blue-500/10 hover:bg-white transition-all duration-300"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
                    <IconComponent size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-950 tracking-tight">
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
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 border-t border-slate-100 leading-relaxed"
          >
            {content}
          </motion.div>
        )}

      </div>
    </section>
  );
}
