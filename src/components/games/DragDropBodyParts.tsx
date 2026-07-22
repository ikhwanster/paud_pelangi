import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../../utils/soundEffects';
import { Check, RefreshCw, Volume2, Sparkles, Award } from 'lucide-react';

interface BodyPart {
  id: string;
  name: string;
  label: string;
  icon: string;
  x: number; // percentage
  y: number; // percentage
  hint: string;
}

const BODY_PARTS: BodyPart[] = [
  { id: 'head', name: 'Kepala', label: '🧠 Kepala', icon: '🙂', x: 50, y: 16, hint: 'Ada di paling atas tubuh kita' },
  { id: 'eyes', name: 'Mata', label: '👀 Mata', icon: '👀', x: 50, y: 25, hint: 'Untuk melihat pemandangan indah' },
  { id: 'ears', name: 'Telinga', label: '👂 Telinga', icon: '👂', x: 30, y: 26, hint: 'Untuk mendengarkan suara dan lagu' },
  { id: 'nose', name: 'Hidung', label: '👃 Hidung', icon: '👃', x: 50, y: 31, hint: 'Untuk mencium bau harum' },
  { id: 'mouth', name: 'Mulut', label: '👄 Mulut', icon: '👄', x: 50, y: 36, hint: 'Untuk berbicara dan tersenyum' },
  { id: 'hands', name: 'Tangan', label: '🖐️ Tangan', icon: '🖐️', x: 22, y: 52, hint: 'Untuk memegang dan melambaikan salam' },
  { id: 'legs', name: 'Kaki', label: '🦶 Kaki', icon: '🦶', x: 50, y: 82, hint: 'Untuk berjalan dan melompat' }
];

interface Props {
  onEarnStars: (count: number) => void;
}

export const DragDropBodyParts: React.FC<Props> = ({ onEarnStars }) => {
  const [placedParts, setPlacedParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string>('Tarik atau ketuk bagian tubuh, lalu pasangkan ke posisi yang benar!');

  const remainingParts = BODY_PARTS.filter(p => !placedParts.includes(p.id));

  const handlePlacePart = (part: BodyPart) => {
    if (placedParts.includes(part.id)) return;

    const newPlaced = [...placedParts, part.id];
    setPlacedParts(newPlaced);
    setSelectedPart(null);

    playSound('correct');
    playSound('star');
    const msg = `Wah hebat! Ini ${part.name}! ${part.hint}`;
    setActiveMessage(msg);
    speakText(`Wah hebat! Ini ${part.name}`);

    // Check completion
    if (newPlaced.length === BODY_PARTS.length) {
      setIsCompleted(true);
      onEarnStars(3);
      playSound('victory');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      speakText('Sempurna! Kamu luar biasa sudah mengenal semua anggota tubuh!');
    }
  };

  const handleReset = () => {
    setPlacedParts([]);
    setSelectedPart(null);
    setIsCompleted(false);
    setActiveMessage('Tarik atau ketuk bagian tubuh, lalu pasangkan ke posisi yang benar!');
    playSound('pop');
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 shadow-xl border-4 border-amber-200">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-200 text-amber-800 text-xs font-bold rounded-full mb-1">
            Modul 3: Konsep Diri
          </span>
          <h2 className="text-2xl font-black text-amber-900 flex items-center gap-2">
            🧩 Pasang Anggota Tubuh
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Gender toggle */}
          <div className="bg-white p-1 rounded-2xl border-2 border-amber-200 flex gap-1 shadow-sm">
            <button
              onClick={() => { setGender('male'); playSound('click'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-all flex items-center gap-1 ${
                gender === 'male' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              👦 Anak Laki-Laki
            </button>
            <button
              onClick={() => { setGender('female'); playSound('click'); }}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-all flex items-center gap-1 ${
                gender === 'female' ? 'bg-pink-500 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              👧 Anak Perempuan
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2.5 bg-white text-amber-800 rounded-2xl border-2 border-amber-200 hover:bg-amber-100 transition-all font-bold flex items-center gap-1 shadow-sm"
            title="Ulangi Game"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="text-xs hidden sm:inline">Ulangi</span>
          </button>
        </div>
      </div>

      {/* Helper Voice / Mascot Banner */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-4 border-2 border-amber-300 shadow-md mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-bounce">🐰</div>
          <div>
            <p className="font-extrabold text-amber-900 text-sm sm:text-base">{activeMessage}</p>
            <p className="text-xs text-amber-700">Progres: {placedParts.length} / {BODY_PARTS.length} anggota tubuh terpasang</p>
          </div>
        </div>
        <button
          onClick={() => speakText(activeMessage)}
          className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-all"
          title="Dengar Suara"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Palette of Body Parts */}
        <div className="lg:col-span-5 bg-white/80 rounded-2xl p-4 border-2 border-amber-200 shadow-inner">
          <h3 className="font-black text-amber-900 text-base mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Pilih & Sentuh / Tarik Anggota Tubuh:
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {BODY_PARTS.map((part) => {
              const isPlaced = placedParts.includes(part.id);
              const isSelected = selectedPart?.id === part.id;

              return (
                <motion.div
                  key={part.id}
                  whileHover={!isPlaced ? { scale: 1.05 } : {}}
                  whileTap={!isPlaced ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (isPlaced) return;
                    setSelectedPart(part);
                    playSound('click');
                    speakText(part.name);
                    setActiveMessage(`Kamu memilih ${part.name}! Ketuk lingkaran pada gambar di kanan.`);
                  }}
                  className={`p-3 rounded-2xl border-3 cursor-pointer transition-all flex items-center justify-between ${
                    isPlaced
                      ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-200 border-amber-500 shadow-lg ring-4 ring-amber-300'
                      : 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{part.icon}</span>
                    <span className="font-extrabold text-amber-950 text-sm">{part.name}</span>
                  </div>
                  {isPlaced ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isSelected ? (
                    <span className="text-xs bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                      Aktif
                    </span>
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          {selectedPart && (
            <div className="mt-4 p-3 bg-amber-100 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium animate-fade-in">
              💡 <strong>Petunjuk:</strong> {selectedPart.hint}
            </div>
          )}
        </div>

        {/* Right Side: Interactive Character Canvas */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] bg-gradient-to-b from-sky-100 to-emerald-100 rounded-3xl border-4 border-sky-300 p-4 shadow-xl flex items-center justify-center overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-3 left-4 text-2xl opacity-40">☁️</div>
            <div className="absolute top-5 right-6 text-2xl opacity-40">☀️</div>
            <div className="absolute bottom-2 left-3 text-2xl opacity-40">🌱</div>
            <div className="absolute bottom-2 right-3 text-2xl opacity-40">🌸</div>

            {/* Character Base Illustration */}
            <div className="relative w-56 h-80 flex flex-col items-center justify-center">
              {/* Character head & body cartoon */}
              <div className="relative w-48 h-72">
                {/* Hair & Face */}
                <div className={`absolute top-2 left-12 w-24 h-24 rounded-full border-4 border-amber-900/20 shadow-md ${
                  gender === 'male' ? 'bg-amber-200' : 'bg-pink-100'
                }`}>
                  {/* Hair styling */}
                  {gender === 'male' ? (
                    <div className="absolute -top-3 -left-2 w-28 h-12 bg-amber-900 rounded-t-full" />
                  ) : (
                    <>
                      <div className="absolute -top-3 -left-3 w-30 h-14 bg-amber-950 rounded-t-full" />
                      <div className="absolute top-2 -left-4 w-6 h-12 bg-amber-950 rounded-full" />
                      <div className="absolute top-2 -right-4 w-6 h-12 bg-amber-950 rounded-full" />
                    </>
                  )}
                  {/* Default subtle face feature outlines */}
                  <div className="absolute top-8 left-5 w-3 h-3 bg-amber-900/30 rounded-full" />
                  <div className="absolute top-8 right-5 w-3 h-3 bg-amber-900/30 rounded-full" />
                  <div className="absolute top-12 left-9 w-2 h-2 bg-amber-900/30 rounded-full" />
                  <div className="absolute top-15 left-7 w-10 h-3 border-b-2 border-amber-900/40 rounded-full" />
                </div>

                {/* Torso / Shirt */}
                <div className={`absolute top-24 left-10 w-28 h-28 rounded-3xl border-4 border-amber-900/10 shadow-sm ${
                  gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'
                } flex items-center justify-center`}>
                  <div className="text-3xl opacity-30">{gender === 'male' ? '⭐' : '🌸'}</div>
                </div>

                {/* Left Arm & Right Arm */}
                <div className="absolute top-26 left-3 w-8 h-20 bg-amber-200 rounded-full border-2 border-amber-900/20 -rotate-12" />
                <div className="absolute top-26 right-3 w-8 h-20 bg-amber-200 rounded-full border-2 border-amber-900/20 rotate-12" />

                {/* Legs / Shorts */}
                <div className="absolute top-50 left-12 w-10 h-20 bg-blue-600 rounded-b-xl border-2 border-amber-900/20" />
                <div className="absolute top-50 right-12 w-10 h-20 bg-blue-600 rounded-b-xl border-2 border-amber-900/20" />
                {/* Feet */}
                <div className="absolute top-68 left-10 w-12 h-6 bg-red-400 rounded-full border-2 border-amber-900/20" />
                <div className="absolute top-68 right-10 w-12 h-6 bg-red-400 rounded-full border-2 border-amber-900/20" />
              </div>

              {/* Drop Target Markers */}
              {BODY_PARTS.map((part) => {
                const isPlaced = placedParts.includes(part.id);
                const isTargeted = selectedPart?.id === part.id;

                return (
                  <motion.button
                    key={`target-${part.id}`}
                    style={{
                      left: `${part.x}%`,
                      top: `${part.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (selectedPart?.id === part.id) {
                        handlePlacePart(part);
                      } else if (!isPlaced) {
                        speakText(`Ini adalah posisi ${part.name}. Pilih dulu ${part.name} di sebelah kiri.`);
                        setActiveMessage(`Pilih ${part.name} dari daftar di kiri, lalu sentuh lingkaran ini!`);
                      }
                    }}
                    className={`absolute z-10 transition-all duration-300 rounded-full flex items-center justify-center shadow-lg ${
                      isPlaced
                        ? 'bg-emerald-500 text-white font-extrabold px-3 py-1 text-xs border-2 border-white scale-100 ring-2 ring-emerald-300'
                        : isTargeted
                        ? 'w-12 h-12 bg-amber-400 text-white border-4 border-white animate-bounce ring-4 ring-amber-300'
                        : 'w-9 h-9 bg-white/90 text-amber-800 border-2 border-amber-400 hover:bg-amber-200'
                    }`}
                  >
                    {isPlaced ? (
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Check className="w-3.5 h-3.5" />
                        {part.name}
                      </span>
                    ) : (
                      <span className="font-bold text-xs">{part.icon}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 p-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-3xl text-center shadow-2xl border-4 border-white"
          >
            <div className="text-5xl mb-2">🎉 ⭐⭐⭐ 🎉</div>
            <h3 className="text-2xl font-black mb-1">Hebat Sekali! Kamu Lulus Modul 3!</h3>
            <p className="text-emerald-100 font-medium mb-4">
              Kamu telah berhasil mengenali semua bagian tubuh dengan sempurna. Dapat 3 Bintang Tambahan!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-white text-emerald-800 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center gap-2 shadow"
              >
                <RefreshCw className="w-4 h-4" />
                Main Lagi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
