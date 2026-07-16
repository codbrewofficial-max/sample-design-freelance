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
    <section id={id} className="py-24 px-6 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Form Header Info Side (4 cols) */}
          <div className="md:col-span-5 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.6),transparent_50%)] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-2xl font-extrabold tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {content && (
              <div className="text-xs text-blue-200 border-t border-blue-500/30 pt-6 mt-8 italic leading-relaxed relative z-10">
                {content}
              </div>
            )}
          </div>

          {/* Actual Contact Form Side (7 cols) */}
          <div className="md:col-span-7 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor={`${id}-name`} className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id={`${id}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={placeholderName}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm transition outline-none"
                  required
                />
              </div>

              {/* Contact Field (Phone/WhatsApp/Email) */}
              <div className="space-y-1.5">
                <label htmlFor={`${id}-contact`} className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                  No. HP / WhatsApp / Email
                </label>
                <input
                  type="text"
                  id={`${id}-contact`}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={placeholderContact}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm transition outline-none"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label htmlFor={`${id}-message`} className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Detail Kebutuhan / Pesan
                </label>
                <textarea
                  id={`${id}-message`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={placeholderMessage}
                  disabled={loading}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm transition outline-none resize-none"
                  required
                />
              </div>

              {/* Status Alert Notification */}
              <AnimatePresence mode="wait">
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl flex items-start gap-3 text-sm font-sans ${
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

              {/* Action Button */}
              <motion.button
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/10 transition-colors cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}
