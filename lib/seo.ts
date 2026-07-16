import type { Metadata } from 'next';
import { getSiteConfig } from './site-config';

/**
 * Generates the Next.js Metadata object based on the site configuration and active page slug.
 * @param slug The page slug (e.g., 'home')
 */
export function generatePageMetadata(slug: string): Metadata {
  const config = getSiteConfig();
  const { defaultTitle, defaultDescription, keywords, ogImage, siteUrl } = config.seo;
  const businessName = config.businessName;

  // Find the page in configuration
  const page = config.pages?.find((p) => p.slug === slug);

  if (!page) {
    const fallbackUrl = `${siteUrl}/${slug === 'home' ? '' : slug}`;
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: keywords,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        images: [{ url: ogImage, width: 1200, height: 630, alt: defaultTitle }],
        type: 'website',
        url: fallbackUrl,
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
        images: [ogImage],
      },
      alternates: {
        canonical: fallbackUrl,
      },
    };
  }

  const isHome = page.slug === 'home';
  const pageTitle = isHome ? defaultTitle : `${page.title} | ${businessName}`;
  const pageDescription = page.metaDescription || defaultDescription;
  const pageUrl = `${siteUrl}${isHome ? '' : `/${page.slug}`}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'website',
      url: pageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
