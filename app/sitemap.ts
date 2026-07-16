import { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();
  const { siteUrl } = config.seo;

  // Generate sitemap items for all pages in the configuration
  return config.pages.map((page) => {
    const isHome = page.slug === 'home';
    const path = isHome ? '' : `/${page.slug}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: isHome ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : 0.8,
    };
  });
}
