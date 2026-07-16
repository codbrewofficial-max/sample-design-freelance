'use client';

import React from 'react';

// Import all available sections
import Hero from './sections/Hero';
import ValueProposition from './sections/ValueProposition';
import AboutStory from './sections/AboutStory';
import Team from './sections/Team';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import MapLocation from './sections/MapLocation';
import ContactForm from './sections/ContactForm';
import CTABanner from './sections/CTABanner';
import Footer from './sections/Footer';
import MenuDisplay from './sections/MenuDisplay';
import StatsNumbers from './sections/StatsNumbers';
import ProductServiceGrid from './sections/ProductServiceGrid';
import ProcessSteps from './sections/ProcessSteps';
import Facilities from './sections/Facilities';
import Programs from './sections/Programs';
import ClientLogos from './sections/ClientLogos';
import Pricing from './sections/Pricing';
import Certifications from './sections/Certifications';
import FAQ from './sections/FAQ';
import PoweredBySection from './watermark/PoweredBySection';

export interface SectionProps {
  id: string;
  data: Record<string, any>;
  content: string;
}

// Section registry mapping the "type" field from JSON to actual React components.
// We make keys case-insensitive and kebab-case/space friendly by normalizing.
const sectionRegistry: Record<string, React.ComponentType<SectionProps>> = {
  'hero': Hero,
  'value-proposition': ValueProposition,
  'about-story': AboutStory,
  'team': Team,
  'gallery': Gallery,
  'testimonials': Testimonials,
  'map-location': MapLocation,
  'contact-form': ContactForm,
  'cta-banner': CTABanner,
  'footer': Footer,
  'menu-display': MenuDisplay,
  'stats-numbers': StatsNumbers,
  'product-service-grid': ProductServiceGrid,
  'process-steps': ProcessSteps,
  'facilities': Facilities,
  'programs': Programs,
  'client-logos': ClientLogos,
  'pricing': Pricing,
  'certifications': Certifications,
  'faq': FAQ,
};

interface SectionRendererProps {
  sections: Array<{
    id: string;
    type: string;
    data: Record<string, any>;
    content: string;
  }>;
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8 pb-8 pt-24">
      {sections.map((section) => {
        const normalizedType = section.type.toLowerCase().trim();
        const Component = sectionRegistry[normalizedType];

        if (!Component) {
          console.warn(
            `SectionRenderer: Component for type "${section.type}" (normalized: "${normalizedType}") is not registered. Skipping layout render.`
          );
          return (
            <div
              key={section.id}
              className="py-6 px-6 bg-amber-50 border border-dashed border-amber-200 text-amber-800 text-xs font-mono text-center rounded-xl my-4"
            >
              [Warning: Section of type &quot;{section.type}&quot; was not found in registry]
            </div>
          );
        }

        return (
          <div key={section.id} className="relative">
            <Component
              id={section.id}
              data={section.data}
              content={section.content}
            />
            {normalizedType !== 'footer' && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10 pointer-events-none">
                <PoweredBySection className="pointer-events-auto !pt-0 !pb-2" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
