import React from 'react';
import { motion } from 'motion/react';
import ButterflyBackground from './ButterflyBackground';

export default function TikTokDM() {
  return (
    <footer className="relative w-full bg-[#08060f] px-4 pb-12 pt-8">
      <ButterflyBackground variant="footer" />

      <div className="mx-auto max-w-md">
        
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden bg-[#0f0b1f]"
        >
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
        </motion.div>
      </div>
    </footer>
  );
}
