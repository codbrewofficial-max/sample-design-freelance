'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SectionProps } from '../SectionRenderer';

interface ContactFormData {
  title?: string;
  subtitle?: string;
  formPlaceholderName?: string;
  formPlaceholderContact?: string;
  formPlaceholderMessage?: string;
  buttonText?: string;
}

export default function ContactForm({ id, data, content }: SectionProps) {
  const formConf = data as ContactFormData;
  const title = formConf.title || 'Hubungi Kami';
  const subtitle = formConf.subtitle || 'Kirimkan pesan Anda langsung kepada kami, tim kami siap melayani Anda.';
  const placeholderName = formConf.formPlaceholderName || 'Nama Lengkap';
  const placeholderContact = formConf.formPlaceholderContact || 'Nomor WhatsApp / Email';
  const placeholderMessage = formConf.formPlaceholderMessage || 'Bagaimana kami bisa membantu bisnis Anda?';
  const buttonText = formConf.buttonText || 'Kirim Pesan';

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contact.trim() || !message.trim()) {
      setStatus('error');
      setStatusMessage('Mohon isi semua kolom formulir.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message, sourceId: id }),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage(resData.message || 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.');
        setName('');
        setContact('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(resData.error || 'Terjadi kesalahan saat mengirim pesan.');
      }
    } catch (error) {
      console.error('Contact Form submit error:', error);
      setStatus('error');
      setStatusMessage('Gagal menghubungi server. Silakan coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="bg-[#F5F7FA] rounded-[32px] shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12">
        
        {/* Illustration Side (4 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#1B1E2B] to-[#22B8D4] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {content && (
            <div className="text-xs text-white/50 border-t border-white/20 pt-6 mt-8 italic leading-relaxed relative z-10">
              {content}
            </div>
          )}
        </div>

        {/* Form Side (7 cols) */}
        <div className="md:col-span-7 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor={`${id}-name`} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <input
                type="text"
                id={`${id}-name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={placeholderName}
                disabled={loading}
                className="w-full px-5 py-3.5 rounded-full border border-slate-200 focus:border-[#22B8D4] focus:ring-2 focus:ring-[#22B8D4]/20 bg-white text-[#1E1B4B] placeholder-slate-400 text-sm transition outline-none"
                required
              />
            </div>

            {/* Contact Field */}
            <div className="space-y-1.5">
              <label htmlFor={`${id}-contact`} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                No. HP / WhatsApp / Email
              </label>
              <input
                type="text"
                id={`${id}-contact`}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={placeholderContact}
                disabled={loading}
                className="w-full px-5 py-3.5 rounded-full border border-slate-200 focus:border-[#22B8D4] focus:ring-2 focus:ring-[#22B8D4]/20 bg-white text-[#1E1B4B] placeholder-slate-400 text-sm transition outline-none"
                required
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label htmlFor={`${id}-message`} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Detail Kebutuhan / Pesan
              </label>
              <textarea
                id={`${id}-message`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholderMessage}
                disabled={loading}
                rows={4}
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#22B8D4] focus:ring-2 focus:ring-[#22B8D4]/20 bg-white text-[#1E1B4B] placeholder-slate-400 text-sm transition outline-none resize-none"
                required
              />
            </div>

            {/* Status Alert */}
            <AnimatePresence mode="wait">
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-2xl flex items-start gap-3 text-sm ${
                    status === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                      : 'bg-rose-50 text-rose-800 border border-rose-100'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#1B1E2B] to-[#22B8D4] hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{buttonText}</span>
                </>
              )}
            </motion.button>

          </form>
        </div>

      </div>
    </section>
  );
}
