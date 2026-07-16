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
    <footer id={id} className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
        
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
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 transition"
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
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 transition"
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
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 transition"
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
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero-1" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="#about-1" className="hover:text-white transition">Tentang Kami</a>
              </li>
              <li>
                <a href="#features-1" className="hover:text-white transition">Layanan</a>
              </li>
              <li>
                <a href="#contact-1" className="hover:text-white transition">Hubungi Kami</a>
              </li>
            </ul>
          </div>

          {/* Contact Details info card */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              {contact.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-blue-500 shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white transition">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-blue-500 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-slate-500">
                    {contact.address}
                  </span>
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

      {/* Powered by Watermark footer */}
      <PoweredBySection />
    </footer>
  );
}
