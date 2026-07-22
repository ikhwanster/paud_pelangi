import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSound, speakText, stopSpeech } from '../../utils/soundEffects';
import { Music, Play, Pause, RotateCcw, Sparkles, Volume2, Award } from 'lucide-react';

interface LyricLine {
  text: string;
  part: string; // body part highlight
  icon: string;
}

const LYRICS: LyricLine[] = [
  { text: 'Kepala...', part: 'kepala', icon: '🧠' },
  { text: 'Pundak...', part: 'pundak', icon: '💪' },
  { text: 'Lutut, Kaki...', part: 'kaki', icon: '🦶' },
  { text: 'Lutut, Kaki...', part: 'kaki', icon: '🦶' },
  { text: 'Mata, Telinga...', part: 'mata', icon: '👀' },
  { text: 'Mulut, Hidung, dan Pipi...', part: 'mulut', icon: '👄' },
  { text: 'Kepala, Pundak, Lutut, Kaki, Lutut, Kaki!', part: 'semua', icon: '🕺' }
];

interface Props {
  onEarnStars: (count: number) => void;
}

export const SongAndMovementGame: React.FC<Props> = ({ onEarnStars }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [danceAction, setDanceAction] = useState('🙂');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentLineIndex < LYRICS.length) {
        const line = LYRICS[currentLineIndex];
        setDanceAction(line.icon);
        playSound('star');
        speakText(line.text);

        timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, 2200);
      } else {
        setIsPlaying(false);
        setCurrentLineIndex(0);
        onEarnStars(3);
        playSound('victory');
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        speakText('Hore! Bernyanyi dan menari bersama selesai! Kamu hebat sekali!');
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentLineIndex, onEarnStars]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
    } else {
      setIsPlaying(true);
      if (currentLineIndex >= LYRICS.length) setCurrentLineIndex(0);
      playSound('click');
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    stopSpeech();
    setCurrentLineIndex(0);
    setDanceAction('🙂');
    playSound('pop');
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-emerald-50 rounded-3xl p-6 shadow-xl border-4 border-rose-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-rose-200 text-rose-800 text-xs font-bold rounded-full mb-1">
            Modul 2: Gerak & Lagu
          </span>
          <h2 className="text-2xl font-black text-rose-950 flex items-center gap-2">
            🎵 Lagu: Kepala Pundak Lutut Kaki
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`px-5 py-2.5 rounded-2xl font-black text-white shadow-lg transition-all flex items-center gap-2 ${
              isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Jeda Lagu' : 'Putar Lagu & Menari!'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-white text-rose-800 rounded-2xl border-2 border-rose-200 hover:bg-rose-100 transition-all font-bold"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Dancing Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated Dancer Character */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-xs aspect-square bg-gradient-to-b from-amber-100 to-rose-200 rounded-full border-8 border-white shadow-2xl flex flex-col items-center justify-center p-6 text-center">
            {/* Dancer Emoji / Illustration */}
            <motion.div
              animate={isPlaying ? { y: [0, -20, 0], rotate: [-5, 5, -5] } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="text-8xl my-2 drop-shadow-md"
            >
              {danceAction}
            </motion.div>

            <span className="px-4 py-1.5 bg-white text-rose-900 font-black text-sm rounded-full shadow border-2 border-rose-300">
              {isPlaying ? '🎶 Ayo Ikuti Gerakannya!' : 'Siap Bernyanyi!'}
            </span>
          </div>
        </div>

        {/* Lyrics & Tap-to-Sing interactive list */}
        <div className="lg:col-span-7 bg-white/90 rounded-2xl p-5 border-2 border-rose-200 shadow-sm space-y-3">
          <h3 className="font-black text-rose-950 text-base mb-2 flex items-center gap-2">
            <Music className="w-5 h-5 text-rose-500" />
            Lirik & Sentuh Kata untuk Mendengar Suara:
          </h3>

          <div className="space-y-2">
            {LYRICS.map((line, idx) => {
              const isActive = isPlaying && currentLineIndex === idx;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    playSound('click');
                    speakText(line.text);
                    setDanceAction(line.icon);
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-100 border-emerald-500 shadow-md ring-4 ring-emerald-200 scale-102'
                      : 'bg-gray-50 border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{line.icon}</span>
                    <span className={`font-black text-base sm:text-lg ${isActive ? 'text-emerald-950' : 'text-gray-800'}`}>
                      {line.text}
                    </span>
                  </div>

                  <button className="p-2 bg-white text-rose-700 rounded-xl hover:bg-rose-100 transition-all border border-rose-200">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
