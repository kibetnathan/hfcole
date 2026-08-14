import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Phone, Video, Plus, Send } from 'lucide-react';
import ButterflyBackground from './ButterflyBackground';

export default function TikTokDM() {
  return (
    <footer className="relative w-full bg-[#08060f] px-4 pb-12 pt-8">
      <ButterflyBackground variant="footer" />

      <div className="mx-auto max-w-md">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8 }}
          className="text-center font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6"
        >
          sent with love
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden border border-purple-deep/20 bg-[#0f0b1f] shadow-[0_0_60px_rgba(139,92,246,0.18)]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="text-white/40">
              <ChevronLeft size={18} />
            </span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-soft to-purple-brand flex items-center justify-center text-xs font-semibold text-white">
                K
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-white/90">Kruegenn</p>
                <p className="text-[10px] text-purple-soft/70">Active now</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4 text-white/40">
              <Phone size={16} />
              <Video size={18} />
            </div>
          </div>

          <div className="px-4 py-6 space-y-4">
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-soft to-purple-brand flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
                C
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5 text-sm text-white/85 leading-relaxed">
                You're obsessed with me huh 👀
              </div>
            </div>

            <div className="flex items-end justify-end gap-2">
              <div className="max-w-[75%] rounded-2xl rounded-br-md bg-purple-deep px-4 py-2.5 text-sm text-white leading-relaxed">
                Ofc I am
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-soft to-purple-brand flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
                K
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2.5">
              <Plus size={16} className="text-white/40 shrink-0" />
              <span className="text-sm text-white/30 flex-1 truncate">Send a message...</span>
              <Send size={14} className="text-purple-soft shrink-0" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
