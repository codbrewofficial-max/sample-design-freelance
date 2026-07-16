'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { getSiteConfig } from '@/lib/site-config';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const config = getSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!config) return null;

  const { businessName, branding, pages } = config;
  const primaryColor = branding?.primaryColor || '#b45309'; // default fallback amber-700
  const textColor = branding?.textColor || '#0f172a';

  const isActive = (slug: string) => {
    const href = slug === 'home' ? '/' : `/${slug}`;
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo / Business Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {branding && 'logo' in branding && branding.logo ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <img
                src={branding.logo as string}
                alt={businessName}
                className="object-contain h-full w-full"
              />
            </div>
          ) : (
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white shadow-md transition-transform duration-300 group-hover:rotate-6"
              style={{ backgroundColor: primaryColor }}
            >
              {businessName.charAt(0)}
            </div>
          )}
          <span
            className="font-extrabold text-lg tracking-tight transition-colors duration-200"
            style={{ color: scrolled ? textColor : '#ffffff' }}
          >
            {businessName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {pages.map((page) => {
              const href = page.slug === 'home' ? '/' : `/${page.slug}`;
              const active = isActive(page.slug);
              return (
                <li key={`nav-${page.slug}`}>
                  <Link
                    href={href}
                    className="relative text-sm font-semibold tracking-wide transition-all duration-200 py-1.5 hover:text-white"
                    style={{
                      color: active 
                        ? (scrolled ? primaryColor : '#ffffff') 
                        : (scrolled ? '#475569' : '#cbd5e1'),
                    }}
                  >
                    {page.title}
                    {active && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ backgroundColor: scrolled ? primaryColor : '#ffffff' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick WhatsApp Contact */}
          <WhatsAppButton
            variant="solid"
            text="Hubungi Kami"
            className="!px-4 !py-2 !text-xs font-bold shadow-xs hover:scale-105 active:scale-95 shrink-0"
          />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Quick WA Button on Mobile Navbar too */}
          <WhatsAppButton
            variant="solid"
            text="Tanya Barista"
            className="!px-3 !py-1.5 !text-[11px] font-bold shadow-xs shrink-0"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-colors focus:outline-none ${
              scrolled
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-6">
              <ul className="space-y-4">
                {pages.map((page) => {
                  const href = page.slug === 'home' ? '/' : `/${page.slug}`;
                  const active = isActive(page.slug);
                  return (
                    <li key={`mobile-nav-${page.slug}`}>
                      <Link
                        href={href}
                        className="block text-base font-bold py-2 border-b border-slate-100/80 transition-colors duration-200"
                        style={{
                          color: active ? primaryColor : '#334155',
                        }}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Large CTA in Mobile Drawer */}
              <div className="pt-2">
                <WhatsAppButton
                  variant="solid"
                  text="Hubungi Kami via WhatsApp"
                  className="w-full justify-center shadow-md py-3 text-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
