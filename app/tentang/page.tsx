import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/site-config';
import { getContent } from '@/lib/content-loader';
import { generatePageMetadata } from '@/lib/seo';
import SectionRenderer from '@/components/SectionRenderer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('tentang');
}

export default function TentangPage() {
  const config = getSiteConfig();
  
  // Find the 'tentang' page configuration
  const pageConfig = config.pages.find((page) => page.slug === 'tentang');

  if (!pageConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-mono p-6">
        <p>[Error: Tentang page configuration not found in site.config.json]</p>
      </div>
    );
  }

  // Load frontmatter data & markdown body content for each section on the tentang page
  const resolvedSections = pageConfig.sections.map((sec) => {
    const { data, content } = getContent(sec.contentFile);
    return {
      id: sec.id,
      type: sec.type,
      data: data,
      content: content,
    };
  });

  return (
    <main className="relative min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Dynamically render all sections determined by JSON config */}
      <SectionRenderer sections={resolvedSections} />

      {/* Persistent Floating WhatsApp Redirect Button */}
      <WhatsAppButton variant="floating" />
    </main>
  );
}
