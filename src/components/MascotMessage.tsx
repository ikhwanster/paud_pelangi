import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playSound, speakText } from '../utils/soundEffects';
import { Volume2, Sparkles, X } from 'lucide-react';

export const MascotMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);

  const tips = [
    'Halo Teman-Teman! Hari ini kita belajar mengenal diri kita sendiri dengan gembira!',
    'Ingat ya, semua anak itu unik dan istimewa! Sayangi dirimu dan teman-temanmu!',
    'Tarik atau ketuk gambar di game untuk mengumpulkan Bintang Bintang Emas!',
    'Mandi bersih dan rajin cuci tangan membuat tubuh kita sehat dan segar selalu!'
  ];

  const currentTip = tips[msgIndex];

  const handleNextTip = () => {
    const nextIdx = (msgIndex + 1) % tips.length;
    setMsgIndex(nextIdx);
    playSound('star');
    speakText(tips[nextIdx]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); playSound('pop'); }}
        className="fixed bottom-4 right-4 z-40 bg-amber-400 text-amber-950 p-3.5 rounded-full shadow-2xl border-4 border-white hover:scale-110 transition-all font-black text-2xl flex items-center gap-2"
        title="Buka Maskot Ceria"
      >
        <span>🐰</span>
        <span className="text-xs hidden sm:inline font-bold">Panduan Maskot</span>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-4 right-4 z-40 max-w-sm w-full bg-white rounded-3xl p-4 border-4 border-amber-300 shadow-2xl flex items-start gap-3"
      >
        <div
          onClick={handleNextTip}
          className="text-4xl cursor-pointer hover:scale-110 transition-all shrink-0 animate-bounce"
          title="Ketuk untuk pesan berikutnya"
        >
          🐰
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              Kelinci Ceria PAUD
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => speakText(currentTip)}
                className="p-1 text-amber-800 hover:text-amber-950 rounded-lg hover:bg-amber-100"
                title="Dengar Suara"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-800 font-extrabold leading-snug">
            "{currentTip}"
          </p>

          <button
            onClick={handleNextTip}
            className="mt-2 text-[10px] font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>Pesan Lainnya ➡️</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
