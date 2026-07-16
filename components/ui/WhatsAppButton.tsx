'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { getSiteConfig } from '@/lib/site-config';

interface WhatsAppButtonProps {
  context?: string;
  text?: string;
  className?: string;
  variant?: 'solid' | 'outline' | 'floating';
}

/**
 * Reusable WhatsApp redirect button component.
 * Retrieves phone number and base message from site config,
 * with support for dynamic "context" strings appended to the final message.
 */
export default function WhatsAppButton({
  context,
  text,
  className = '',
  variant = 'solid',
}: WhatsAppButtonProps) {
  const config = getSiteConfig();
  
  if (!config || !config.contact) {
    return null;
  }

  const { whatsappNumber, whatsappMessage } = config.contact;
  
  // Construct dynamic message based on context
  let finalMessage = whatsappMessage || 'Halo, saya tertarik dengan layanan Anda.';
  if (context) {
    finalMessage = `${finalMessage} (Terkait: ${context})`;
  }

  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const buttonText = text || 'Hubungi Kami via WhatsApp';

  const baseStyles = 'inline-flex items-center justify-center gap-2.5 font-bold rounded-full transition-all duration-300 cursor-pointer text-sm md:text-base';
  
  const variantStyles = {
    solid: 'px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-800/15 hover:shadow-emerald-800/25',
    outline: 'px-7 py-3.5 bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
    floating: 'fixed bottom-24 right-6 z-50 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300',
  };

  const currentStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (variant === 'floating') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className={currentStyles}
        title={buttonText}
        id="wa-floating-button"
      >
        <MessageCircle size={28} className="shrink-0" />
        <span className="sr-only">{buttonText}</span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={currentStyles}
      id="wa-standard-button"
    >
      <MessageCircle size={20} className="shrink-0 animate-pulse" />
      <span>{buttonText}</span>
    </motion.a>
  );
}
