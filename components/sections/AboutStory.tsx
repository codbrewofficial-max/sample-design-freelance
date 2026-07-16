'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { SectionProps } from '../SectionRenderer';
import PoweredByOverlay from '../watermark/PoweredByOverlay';

interface AboutStoryData {
  title?: string;
  image?: string;
  imagePosition?: 'left' | 'right';
}

export default function AboutStory({ id, data, content }: SectionProps) {
  const storyData = data as AboutStoryData;
  const title = storyData.title || 'Tentang Kami';
  const imageUrl = storyData.image;
  const imagePosition = storyData.imagePosition || 'right';

  const hasImage = !!imageUrl;

  return (
    <section id={id} className="relative bg-[#F5F7FA] rounded-[32px] shadow-xl overflow-hidden p-6 md:p-12">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10">
        <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-12 gap-10 lg:gap-16 items-center' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: hasImage && imagePosition === 'left' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${hasImage ? 'lg:col-span-7' : 'max-w-3xl mx-auto'} space-y-6`}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1B4B] leading-tight">
              {title}
            </h2>

            {/* Markdown Body Content */}
            {content ? (
              <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-[#1E1B4B] prose-headings:font-bold prose-p:leading-relaxed prose-li:my-1">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm font-mono">
                [Tuliskan cerita tentang bisnis Anda di bagian markdown body file content Anda]
              </p>
            )}
          </motion.div>

          {/* Optional Image */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`lg:col-span-5 relative ${
                imagePosition === 'left' ? 'lg:order-first' : ''
              }`}
            >
              <div className="relative h-[380px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg ring-1 ring-[#22B8D4]/20">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1B4B]/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
