'use client';

import React from 'react';
import { getSiteConfig } from '@/lib/site-config';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import PoweredBySection from '../watermark/PoweredBySection';
import { SectionProps } from '../SectionRenderer';

interface FooterData {
  businessName?: string;
}

export default function Footer({ id, data, content }: SectionProps) {
  const fData = data as FooterData;
  const config = getSiteConfig();

  const businessName = fData.businessName || config.businessName || 'LabKerKomIT Public Page';
  const contact = config.contact;

  return (
    <footer id={id} className="bg-[#1B1E2B] rounded-[32px] shadow-xl text-slate-400 overflow-hidden p-6 md:p-12">
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand details (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {businessName}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {content || 'Starter template website public page milik LabKerKomIT, dioptimalkan untuk performa maksimal dan kemudahan penyesuaian lewat markdown.'}
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            {contact.socials.instagram && (
              <a
                href={contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#22B8D4] hover:text-white text-slate-400 transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {contact.socials.facebook && (
              <a
                href={contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#22B8D4] hover:text-white text-slate-400 transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            )}
            {contact.socials.twitter && (
              <a
                href={contact.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#22B8D4] hover:text-white text-slate-400 transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Contact details (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero-1" className="text-slate-500 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="#about-1" className="text-slate-500 hover:text-white transition">Tentang</a>
              </li>
              <li>
                <a href="#features-1" className="text-slate-500 hover:text-white transition">Layanan</a>
              </li>
              <li>
                <a href="#contact-1" className="text-slate-500 hover:text-white transition">Kontak</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm">
              {contact.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#22B8D4] shrink-0" />
                  <a href={`tel:${contact.phone}`} className="text-slate-500 hover:text-white transition">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[#22B8D4] shrink-0" />
                  <a href={`mailto:${contact.email}`} className="text-slate-500 hover:text-white transition">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#22B8D4] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-slate-500">
                    {contact.address}
                  </span>
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

      <PoweredBySection />
    </footer>
  );
}
