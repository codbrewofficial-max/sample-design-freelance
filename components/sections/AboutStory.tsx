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
    <section id={id} className="py-24 px-6 bg-white text-slate-900 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-12 gap-12 lg:gap-16 items-center' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: hasImage && imagePosition === 'left' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${hasImage ? 'lg:col-span-7' : 'max-w-3xl mx-auto'} space-y-6`}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {title}
            </h2>

            {/* Markdown Body Content with Tailwind CSS Typography prose classes */}
            {content ? (
              <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-900 prose-headings:font-bold prose-p:leading-relaxed prose-li:my-1">
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
              className={`lg:col-span-5 relative h-[380px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-slate-100 shadow-lg ${
                imagePosition === 'left' ? 'lg:order-first' : ''
              }`}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Image Watermark overlay */}
              <PoweredByOverlay />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
