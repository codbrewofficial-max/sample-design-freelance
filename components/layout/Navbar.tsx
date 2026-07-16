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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!config) return null;

  const { businessName, branding, pages } = config;
  const primaryColor = branding?.primaryColor || '#22B8D4';

  const isActive = (slug: string) => {
    const href = slug === 'home' ? '/' : `/${slug}`;
    return pathname === href;
  };

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full max-w-5xl transition-all duration-300 rounded-full ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-[#F5F7FA]'
            : 'bg-white/80 backdrop-blur-md border border-white/20'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
          {/* Brand Logo / Business Name */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: primaryColor }}
            >
              {businessName.charAt(0)}
            </div>
            <span className="font-extrabold text-base md:text-lg tracking-tight text-[#1E1B4B]">
              {businessName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {pages.map((page) => {
              const href = page.slug === 'home' ? '/' : `/${page.slug}`;
              const active = isActive(page.slug);
              return (
                <Link
                  key={`nav-${page.slug}`}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-[#22B8D4]/10 text-[#22B8D4]'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B] hover:bg-[#F5F7FA]'
                  }`}
                >
                  {page.title}
                </Link>
              );
            })}
            <WhatsAppButton
              variant="solid"
              text="Hubungi Kami"
              className="!px-5 !py-2 !text-xs font-bold shrink-0 ml-2"
            />
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <WhatsAppButton
              variant="solid"
              text="Hubungi"
              className="!px-3 !py-1.5 !text-[11px] font-bold shrink-0"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-[#F5F7FA] text-[#1E1B4B] hover:bg-[#22B8D4]/10 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 left-4 right-4 md:hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-[#F5F7FA] overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {pages.map((page) => {
                const href = page.slug === 'home' ? '/' : `/${page.slug}`;
                const active = isActive(page.slug);
                return (
                  <Link
                    key={`mobile-nav-${page.slug}`}
                    href={href}
                    className={`block px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                      active
                        ? 'bg-[#22B8D4]/10 text-[#22B8D4]'
                        : 'text-[#1E1B4B] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    {page.title}
                  </Link>
                );
              })}
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
