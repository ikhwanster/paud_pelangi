import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../../utils/soundEffects';
import { Sparkles, Heart, Star, Palette, Award, Volume2, Printer, Check } from 'lucide-react';

interface Props {
  onEarnStars: (count: number) => void;
}

export const AvatarMirrorGame: React.FC<Props> = ({ onEarnStars }) => {
  const [name, setName] = useState('Budi');
  const [age, setAge] = useState('3 Tahun');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [hairStyle, setHairStyle] = useState('pendek'); // 'pendek', 'panjang', 'keriting', 'hijab'
  const [shirtColor, setShirtColor] = useState('#3B82F6'); // default blue
  const [favoriteBadge, setFavoriteBadge] = useState('⭐ Bintang');
  const [mirrorShine, setMirrorShine] = useState(false);
  const [badgeCreated, setBadgeCreated] = useState(false);

  const colors = [
    { name: 'Biru', hex: '#3B82F6', label: '🔵 Biru' },
    { name: 'Merah', hex: '#EF4444', label: '🔴 Merah' },
    { name: 'Hijau', hex: '#10B981', label: '🟢 Hijau' },
    { name: 'Kuning', hex: '#F59E0B', label: '🟡 Kuning' },
    { name: 'Ungu', hex: '#8B5CF6', label: '🟣 Ungu' },
    { name: 'Pink', hex: '#EC4899', label: '🩷 Pink' }
  ];

  const badges = [
    '⭐ Bintang',
    '❤️ Hati',
    '🚗 Mobil',
    '🌸 Bunga',
    '🦖 Dinosaurus',
    '🎵 Musik'
  ];

  const handleLookInMirror = () => {
    setMirrorShine(true);
    playSound('star');
    playSound('correct');
    speakText(`Coba lihat di cermin! Siapa yang kamu lihat? Halo ${name}! Kamu adalah anak yang sangat istimewa!`);
    setTimeout(() => setMirrorShine(false), 2000);
  };

  const handleSaveBadge = () => {
    setBadgeCreated(true);
    playSound('victory');
    onEarnStars(3);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    speakText(`Kartu nama untuk ${name} berhasil dibuat! Luar biasa!`);
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 rounded-3xl p-6 shadow-xl border-4 border-sky-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-sky-200 text-sky-800 text-xs font-bold rounded-full mb-1">
            Modul 4 & 5: Cermin & Keunikan Diri
          </span>
          <h2 className="text-2xl font-black text-sky-950 flex items-center gap-2">
            🪞 Cermin Diri & Kartu Namaku
          </h2>
        </div>

        <button
          onClick={handleLookInMirror}
          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-2xl font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          Lihat di Cermin!
        </button>
      </div>

      {/* Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Mirror & Avatar Display (Left) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`relative w-full max-w-xs aspect-[3/4] bg-gradient-to-b from-cyan-100 via-sky-200 to-indigo-200 rounded-[3rem] border-8 border-amber-300 p-4 shadow-2xl flex flex-col items-center justify-center transition-all ${
            mirrorShine ? 'ring-8 ring-yellow-300 shadow-yellow-200/50' : ''
          }`}>
            {/* Mirror Frame Arch */}
            <div className="absolute top-2 w-24 h-4 bg-amber-400 rounded-full" />
            
            {/* Mirror Shine Effect */}
            <AnimatePresence>
              {mirrorShine && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/40 backdrop-blur-xs rounded-[2.5rem] z-20 flex items-center justify-center"
                >
                  <span className="text-5xl animate-bounce">✨🪞✨</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar Head & Features */}
            <div className="relative w-44 h-56 flex flex-col items-center justify-center">
              {/* Hair */}
              <div className="relative w-32 h-32 rounded-full bg-amber-100 border-4 border-amber-900/20 shadow-md flex items-center justify-center">
                {/* Hair Variations */}
                {hairStyle === 'pendek' && (
                  <div className="absolute -top-3 w-36 h-16 bg-amber-950 rounded-t-full border-b-2 border-amber-800" />
                )}
                {hairStyle === 'panjang' && (
                  <>
                    <div className="absolute -top-3 w-38 h-18 bg-amber-950 rounded-t-full" />
                    <div className="absolute top-4 -left-3 w-8 h-24 bg-amber-950 rounded-b-full" />
                    <div className="absolute top-4 -right-3 w-8 h-24 bg-amber-950 rounded-b-full" />
                  </>
                )}
                {hairStyle === 'keriting' && (
                  <div className="absolute -top-5 w-40 h-20 bg-amber-950 rounded-full border-2 border-amber-800 flex justify-around items-center px-1">
                    <span className="text-xl">🌀</span>
                    <span className="text-xl">🌀</span>
                    <span className="text-xl">🌀</span>
                  </div>
                )}
                {hairStyle === 'hijab' && (
                  <div className="absolute -inset-2 bg-pink-400 rounded-t-[2.5rem] rounded-b-xl border-4 border-pink-300 shadow-sm" />
                )}

                {/* Face Expression */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex gap-6 mb-2">
                    <div className="w-3.5 h-3.5 bg-amber-950 rounded-full animate-pulse" />
                    <div className="w-3.5 h-3.5 bg-amber-950 rounded-full animate-pulse" />
                  </div>
                  <div className="w-2.5 h-2.5 bg-pink-300/60 rounded-full mb-1" />
                  <div className="w-8 h-4 border-b-4 border-amber-950 rounded-full" />
                </div>
              </div>

              {/* Shirt */}
              <div
                style={{ backgroundColor: shirtColor }}
                className="w-36 h-24 rounded-t-3xl border-4 border-white/40 shadow-md mt-2 flex flex-col items-center justify-center text-white font-black text-sm"
              >
                <span className="text-xl drop-shadow">{favoriteBadge.split(' ')[0]}</span>
              </div>
            </div>

            {/* Mirror Frame Label */}
            <div className="mt-3 px-4 py-1 bg-amber-300 text-amber-950 font-black text-xs rounded-full border border-amber-400">
              Cermin Keunikan Diri
            </div>
          </div>
        </div>

        {/* Customizer Controls (Right) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border-2 border-sky-200 shadow-sm space-y-4">
          <h3 className="font-black text-sky-950 text-lg flex items-center gap-2 border-b pb-2">
            <Palette className="w-5 h-5 text-sky-600" />
            Hias & Sesuaikan Kartu Namamu:
          </h3>

          {/* Name & Age Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Anak:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-sky-300 rounded-xl font-bold text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Masukkan nama..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Usia Anak:</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border-2 border-sky-300 rounded-xl font-bold text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="3 Tahun">3 Tahun</option>
                <option value="3.5 Tahun">3.5 Tahun</option>
                <option value="4 Tahun">4 Tahun</option>
              </select>
            </div>
          </div>

          {/* Hair Style */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Gaya Rambut / Penampilan:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'pendek', label: '✂️ Pendek' },
                { id: 'panjang', label: '🎀 Panjang' },
                { id: 'keriting', label: '🌀 Keriting' },
                { id: 'hijab', label: '🧕 Berhijab' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => { setHairStyle(style.id); playSound('click'); }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
                    hairStyle === style.id
                      ? 'bg-sky-500 text-white border-sky-600 shadow'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-sky-50'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Color */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Warna Baju Kesukaan:</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => { setShirtColor(c.hex); playSound('click'); }}
                  style={{ backgroundColor: c.hex }}
                  className={`px-3 py-1.5 rounded-xl text-white text-xs font-extrabold shadow-sm hover:scale-105 transition-all flex items-center gap-1 ${
                    shirtColor === c.hex ? 'ring-4 ring-sky-300 scale-105' : ''
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Badge Sticker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Stiker Simbol Kesukaan:</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {badges.map((b) => (
                <button
                  key={b}
                  onClick={() => { setFavoriteBadge(b); playSound('click'); }}
                  className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                    favoriteBadge === b
                      ? 'bg-indigo-500 text-white border-indigo-600 shadow'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-indigo-50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSaveBadge}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-yellow-300" />
              Cetak & Simpan Kartu Nama Anak!
            </button>
          </div>
        </div>
      </div>

      {/* Generated Kartu Nama Card Result */}
      <AnimatePresence>
        {badgeCreated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-6 bg-white rounded-3xl border-4 border-emerald-300 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div
                style={{ backgroundColor: shirtColor }}
                className="w-20 h-20 rounded-2xl text-white font-black text-3xl flex items-center justify-center shadow-md border-4 border-white"
              >
                {favoriteBadge.split(' ')[0]}
              </div>
              <div>
                <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  🪪 Kartu Nama PAUD
                </span>
                <h4 className="text-2xl font-black text-gray-900 mt-1">{name}</h4>
                <p className="text-sm font-bold text-gray-600">Usia: {age} • Simbol: {favoriteBadge}</p>
                <p className="text-xs text-emerald-700 mt-1 font-medium">✨ "Semua Anak Istimewa dan Unik!"</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-all flex items-center gap-2 text-sm shadow"
              >
                <Printer className="w-4 h-4" />
                Cetak Kartu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
