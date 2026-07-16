import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getSiteConfig } from '@/lib/site-config';
import { Analytics, GTMNoScript } from '@/lib/analytics';
import Navbar from '@/components/layout/Navbar';
import PoweredByFloating from '@/components/watermark/PoweredByFloating';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  const { defaultTitle, defaultDescription, keywords, ogImage } = config.seo;
  
  return {
    title: {
      default: defaultTitle,
      template: `%s | ${config.businessName}`,
    },
    description: defaultDescription,
    keywords: keywords,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Analytics (GA4) & Google Tag Manager (GTM) */}
        <Analytics />
      </head>
      <body className="antialiased bg-[#1B1E2B] text-[#1E1B4B]" suppressHydrationWarning>
        {/* GTM Noscript */}
        <GTMNoScript />
        <Navbar />
        {children}
        <PoweredByFloating />
      </body>
    </html>
  );
}
