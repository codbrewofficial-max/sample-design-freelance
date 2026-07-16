import React from 'react';
import Script from 'next/script';
import { getSiteConfig } from './site-config';

/**
 * Analytics component to inject Google Tag Manager (GTM) and Google Analytics (GA4)
 * dynamically based on the configuration fields.
 */
export function Analytics() {
  const config = getSiteConfig();
  
  if (!config || !config.tracking) return null;

  const { gtmId, gaId } = config.tracking;
  // Support both gaId and ga4Id (just in case)
  const ga4Id = (config.tracking as any).ga4Id || gaId;

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (GTM) */}
      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}
    </>
  );
}

/**
 * GTM NoScript fallback to be placed right after the <body> tag opening.
 */
export function GTMNoScript() {
  const config = getSiteConfig();
  
  if (!config || !config.tracking) return null;

  const { gtmId } = config.tracking;

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
