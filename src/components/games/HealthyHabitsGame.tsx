import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../../utils/soundEffects';
import { Check, X, Sparkles, RefreshCw, Volume2, ShieldCheck } from 'lucide-react';

interface HabitItem {
  id: string;
  title: string;
  icon: string;
  isHealthy: boolean;
  explanation: string;
}

const HABITS_DATA: HabitItem[] = [
  { id: '1', title: 'Mandi Bersih 2x Sehari', icon: '🛀', isHealthy: true, explanation: 'Mandi membuat tubuh bersih dari kuman dan wangi!' },
  { id: '2', title: 'Sikat Gigi Pagi & Malam', icon: '🪥', isHealthy: true, explanation: 'Sikat gigi membuat gigi kuat dan senyum ceria!' },
  { id: '3', title: 'Makan Sayur & Buah', icon: '🥗', isHealthy: true, explanation: 'Sayur dan buah membuat tubuh sehat dan kuat!' },
  { id: '4', title: 'Cuci Tangan Pakai Sabun', icon: '🧼', isHealthy: true, explanation: 'Cuci tangan sebelum makan agar kuman hilang!' },
  { id: '5', title: 'Tidur Malam Cukup', icon: '🛌', isHealthy: true, explanation: 'Tidur cukup membuat otak dan tubuh segar kembali!' },
  { id: '6', title: 'Makan Permen Berlebihan', icon: '🍭', isHealthy: false, explanation: 'Permen terlalu banyak bisa membuat gigi sakit!' },
  { id: '7', title: 'Main Game HP Lama-Lama', icon: '📱', isHealthy: false, explanation: 'Terlalu lama main HP tidak baik untuk mata!' }
];

interface Props {
  onEarnStars: (count: number) => void;
}

export const HealthyHabitsGame: React.FC<Props> = ({ onEarnStars }) => {
  const [items, setItems] = useState<HabitItem[]>(HABITS_DATA);
  const [healthyList, setHealthyList] = useState<HabitItem[]>([]);
  const [unhealthyList, setUnhealthyList] = useState<HabitItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HabitItem | null>(null);
  const [feedback, setFeedback] = useState<string>('Pilih kebiasaan, lalu masukkan ke kelompok yang tepat!');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClassify = (category: 'healthy' | 'unhealthy') => {
    if (!selectedItem) return;

    const isCorrect = (category === 'healthy' && selectedItem.isHealthy) || (category === 'unhealthy' && !selectedItem.isHealthy);

    if (isCorrect) {
      playSound('correct');
      playSound('star');

      if (category === 'healthy') {
        setHealthyList([...healthyList, selectedItem]);
      } else {
        setUnhealthyList([...unhealthyList, selectedItem]);
      }

      setItems(items.filter(i => i.id !== selectedItem.id));
      setFeedback(`Hebat! ${selectedItem.explanation}`);
      speakText(`Hebat! ${selectedItem.explanation}`);

      // Check completion
      if (items.length === 1) {
        setIsCompleted(true);
        onEarnStars(3);
        playSound('victory');
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      playSound('wrong');
      setFeedback(`Ups, coba lagi! ${selectedItem.title} ${selectedItem.isHealthy ? 'adalah kebiasaan sehat!' : 'bukan kebiasaan sehat.'}`);
      speakText(`Ups, coba pikirkan lagi ya!`);
    }

    setSelectedItem(null);
  };

  const handleReset = () => {
    setItems(HABITS_DATA);
    setHealthyList([]);
    setUnhealthyList([]);
    setSelectedItem(null);
    setFeedback('Pilih kebiasaan, lalu masukkan ke kelompok yang tepat!');
    setIsCompleted(false);
    playSound('pop');
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-3xl p-6 shadow-xl border-4 border-violet-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-violet-200 text-violet-800 text-xs font-bold rounded-full mb-1">
            Modul 7: Penguatan Nilai Positif
          </span>
          <h2 className="text-2xl font-black text-violet-950 flex items-center gap-2">
            🧼 Kebiasaan Sehat & Sayangi Tubuh
          </h2>
        </div>

        <button
          onClick={handleReset}
          className="p-2.5 bg-white text-violet-800 rounded-2xl border-2 border-violet-200 hover:bg-violet-100 transition-all font-bold flex items-center gap-1 shadow-sm"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="text-xs hidden sm:inline">Ulangi</span>
        </button>
      </div>

      {/* Mascot voice bar */}
      <div className="bg-white/90 rounded-2xl p-4 border-2 border-violet-300 shadow-md mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🐱</div>
          <div>
            <p className="font-extrabold text-violet-950 text-sm sm:text-base">{feedback}</p>
            <p className="text-xs text-violet-700">Sisa kebiasaan yang perlu dikelompokkan: {items.length}</p>
          </div>
        </div>
        <button
          onClick={() => speakText(feedback)}
          className="p-2 bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-xl transition-all"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Item Selector List */}
      {items.length > 0 && (
        <div className="bg-white/80 rounded-2xl p-4 border-2 border-violet-200 shadow-inner mb-6">
          <h3 className="font-black text-violet-950 text-sm mb-3">Pilih Salah Satu Kartu Kebiasaan:</h3>
          <div className="flex flex-wrap gap-3">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    playSound('click');
                    speakText(item.title);
                  }}
                  className={`px-4 py-3 rounded-2xl border-3 font-extrabold text-sm flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-amber-300 border-amber-500 shadow-lg ring-4 ring-amber-200 scale-105'
                      : 'bg-white border-violet-200 hover:border-violet-400 shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category 1: Kebiasaan Sehat */}
        <motion.div
          whileHover={{ scale: selectedItem ? 1.02 : 1 }}
          onClick={() => selectedItem && handleClassify('healthy')}
          className={`p-5 rounded-3xl border-4 transition-all flex flex-col justify-between ${
            selectedItem
              ? 'cursor-pointer border-emerald-400 bg-emerald-100/90 shadow-xl ring-4 ring-emerald-200'
              : 'border-emerald-300 bg-emerald-50/70'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🟩</span>
              <h3 className="text-xl font-black text-emerald-950">
                ✅ Kebiasaan Sehat
              </h3>
            </div>
            <p className="text-xs text-emerald-800 font-bold mb-4">
              {selectedItem ? '👉 Ketuk di sini untuk memasukkan sebagai Kebiasaan Sehat!' : 'Membuat tubuh kita selalu kuat dan gembira.'}
            </p>

            {/* List of placed healthy items */}
            <div className="space-y-2">
              {healthyList.map((h) => (
                <div key={h.id} className="p-3 bg-white rounded-xl border-2 border-emerald-300 text-emerald-900 font-extrabold text-sm flex items-center gap-2 shadow-xs">
                  <span className="text-2xl">{h.icon}</span>
                  <span>{h.title}</span>
                  <Check className="w-4 h-4 text-emerald-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category 2: Bukan Kebiasaan Sehat */}
        <motion.div
          whileHover={{ scale: selectedItem ? 1.02 : 1 }}
          onClick={() => selectedItem && handleClassify('unhealthy')}
          className={`p-5 rounded-3xl border-4 transition-all flex flex-col justify-between ${
            selectedItem
              ? 'cursor-pointer border-rose-400 bg-rose-100/90 shadow-xl ring-4 ring-rose-200'
              : 'border-rose-300 bg-rose-50/70'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🟥</span>
              <h3 className="text-xl font-black text-rose-950">
                ❌ Perlu Diwaspadai
              </h3>
            </div>
            <p className="text-xs text-rose-800 font-bold mb-4">
              {selectedItem ? '👉 Ketuk di sini untuk memasukkan sebagai hal yang kurang sehat!' : 'Hal yang sebaiknya kita kurangi agar tidak sakit.'}
            </p>

            {/* List of placed unhealthy items */}
            <div className="space-y-2">
              {unhealthyList.map((u) => (
                <div key={u.id} className="p-3 bg-white rounded-xl border-2 border-rose-300 text-rose-900 font-extrabold text-sm flex items-center gap-2 shadow-xs">
                  <span className="text-2xl">{u.icon}</span>
                  <span>{u.title}</span>
                  <X className="w-4 h-4 text-rose-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Victory Card */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-3xl text-center shadow-2xl border-4 border-white"
          >
            <div className="text-5xl mb-2">⭐ 🧼 ⭐</div>
            <h3 className="text-2xl font-black mb-1">Hebat! Kamu Mengerti Kebiasaan Sehat!</h3>
            <p className="text-violet-100 font-medium mb-4">
              Tubuhmu sehat, bersih, dan selalu ceria! Kamu mendapatkan 3 Bintang Kebersihan!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-white text-violet-900 rounded-2xl font-black hover:bg-violet-50 transition-all"
            >
              Main Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
