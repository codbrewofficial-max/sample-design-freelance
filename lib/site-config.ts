import siteConfigData from '../config/site.config.json';

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
}

export interface ContactConfig {
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
}

export interface TrackingConfig {
  gtmId?: string;
  gaId?: string;
}

export interface SEOConfig {
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface WatermarkConfig {
  enabled: boolean;
  poweredByText: string;
  poweredByLink: string;
  variants: string[];
}

export interface SectionConfig {
  id: string;
  type: string; // e.g., 'Hero', 'Value-Proposition', 'About-Story'
  contentFile: string; // e.g., 'home-hero.md'
}

export interface PageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  sections: SectionConfig[];
}

export interface SiteConfig {
  businessName: string;
  branding: BrandingConfig;
  contact: ContactConfig;
  tracking: TrackingConfig;
  seo: SEOConfig;
  watermark: WatermarkConfig;
  pages: PageConfig[];
}

/**
 * Returns the site configuration.
 * Imports JSON directly to prevent any "fs" errors on client-side compilation.
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigData as unknown as SiteConfig;
}
