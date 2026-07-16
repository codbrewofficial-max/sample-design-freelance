'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionProps } from '../SectionRenderer';

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

interface TeamData {
  title?: string;
  subtitle?: string;
  items?: TeamMember[];
}

export default function Team({ id, data, content }: SectionProps) {
  const teamData = data as TeamData;
  const title = teamData.title || 'Tim Profesional Kami';
  const subtitle = teamData.subtitle || 'Dibalik kesuksesan setiap project, ada tim ahli yang berdedikasi tinggi.';
  const items = teamData.items || [];

  return (
    <section id={id} className="py-24 px-6 bg-slate-50 text-slate-900 font-sans">
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

        {/* Team Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {items.map((member, index) => {
              const photoUrl = member.photo || `https://picsum.photos/seed/member-${index}/400/400`;
              return (
                <motion.div
                  key={`${id}-member-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden flex flex-col group"
                  id={`${id}-card-${index}`}
                >
                  {/* Member Photo */}
                  <div className="relative h-80 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Profile Info */}
                  <div className="p-6 text-center space-y-1">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold font-mono text-slate-400 uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-sm text-slate-400 font-mono py-12 border border-dashed border-slate-200 rounded-2xl">
            [No team items specified in markdown frontmatter items array]
          </div>
        )}

        {/* Markdown Content (body) */}
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
