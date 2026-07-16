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

        {/* Team Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center p-8 group"
                >
                  {/* Circle Photo with Teal Ring */}
                  <div className="relative w-32 h-32 rounded-full ring-4 ring-[#22B8D4] ring-offset-4 ring-offset-white overflow-hidden shadow-lg mb-6">
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-[#1E1B4B]">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-400">
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
            className="text-center text-sm text-slate-500 max-w-xl mx-auto pt-6 leading-relaxed border-t border-slate-200"
          >
            {content}
          </motion.div>
        )}

      </div>
    </section>
  );
}
