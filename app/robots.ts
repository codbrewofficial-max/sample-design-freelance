import { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const { siteUrl } = config.seo;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
