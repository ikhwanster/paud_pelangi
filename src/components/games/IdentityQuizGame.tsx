import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../../utils/soundEffects';
import { QuizQuestion } from '../../types';
import { Volume2, Check, X, RefreshCw, HelpCircle, Award } from 'lucide-react';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Bagian tubuh mana yang kita gunakan untuk MENDENGARKAN lagu?',
    audioPrompt: 'Bagian tubuh mana yang kita gunakan untuk mendengarkan lagu?',
    options: [
      { id: 'a', text: 'Telinga', icon: '👂', color: 'bg-emerald-500', isCorrect: true },
      { id: 'b', text: 'Mata', icon: '👀', color: 'bg-blue-500', isCorrect: false },
      { id: 'c', text: 'Kaki', icon: '🦶', color: 'bg-purple-500', isCorrect: false }
    ],
    explanation: 'Telinga kita ada 2 untuk mendengarkan suara lagu dan nasihat guru!'
  },
  {
    id: 2,
    question: 'Berapa usia anak-anak yang belajar di kelas PAUD Ceria ini?',
    audioPrompt: 'Berapa usia anak-anak di kelas PAUD Ceria ini?',
    options: [
      { id: 'a', text: '3 sampai 4 Tahun', icon: '🎂', color: 'bg-amber-500', isCorrect: true },
      { id: 'b', text: '15 Tahun', icon: '🚲', color: 'bg-rose-500', isCorrect: false },
      { id: 'c', text: '50 Tahun', icon: '👵', color: 'bg-gray-500', isCorrect: false }
    ],
    explanation: 'Anak PAUD berusia 3 sampai 4 tahun yang sedang rajin belajar dan bermain!'
  },
  {
    id: 3,
    question: 'Apa yang harus kita lakukan sebelum makan agar tangan bersih dari kuman?',
    audioPrompt: 'Apa yang harus kita lakukan sebelum makan agar tangan bersih?',
    options: [
      { id: 'a', text: 'Cuci Tangan Pakai Sabun', icon: '🧼', color: 'bg-sky-500', isCorrect: true },
      { id: 'b', text: 'Main Lumpur', icon: '🛝', color: 'bg-orange-500', isCorrect: false },
      { id: 'c', text: 'Langsung Tidur', icon: '🛌', color: 'bg-indigo-500', isCorrect: false }
    ],
    explanation: 'Mencuci tangan membuat kuman hilang dan perut kita sehat!'
  },
  {
    id: 4,
    question: 'Setiap anak punya keunikan rambut dan warna kesukaan. Apakah semua anak istimewa?',
    audioPrompt: 'Apakah semua anak istimewa dan perlu dihargai?',
    options: [
      { id: 'a', text: 'Ya, Semua Anak Istimewa!', icon: '❤️', color: 'bg-pink-500', isCorrect: true },
      { id: 'b', text: 'Tidak', icon: '❌', color: 'bg-red-500', isCorrect: false }
    ],
    explanation: 'Semua anak adalah ciptaan Tuhan yang istimewa dan saling menyayangi!'
  }
];

interface Props {
  onEarnStars: (count: number) => void;
}

export const IdentityQuizGame: React.FC<Props> = ({ onEarnStars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const q = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (opt: { id: string; text: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOptionId(opt.id);
    setIsAnswered(true);

    if (opt.isCorrect) {
      playSound('correct');
      playSound('star');
      setScore(score + 1);
      speakText(`Jawabanmu tepat sekali! ${opt.text}`);
    } else {
      playSound('wrong');
      speakText(`Ups, belum tepat. ${q.explanation}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      playSound('pop');
      speakText(QUIZ_QUESTIONS[currentIndex + 1].question);
    } else {
      setIsQuizCompleted(true);
      onEarnStars(3);
      playSound('victory');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      speakText(`Hore! Kamu berhasil menyelesaikan kuis tanya jawab dengan skor ${score + 1} dari ${QUIZ_QUESTIONS.length}!`);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizCompleted(false);
    playSound('pop');
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-50 rounded-3xl p-6 shadow-xl border-4 border-cyan-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-cyan-200 text-cyan-800 text-xs font-bold rounded-full mb-1">
            Modul 6: Tanya Jawab Sederhana
          </span>
          <h2 className="text-2xl font-black text-cyan-950 flex items-center gap-2">
            ❓ Kuis Tanya Jawab Identitas Diri
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-1.5 bg-white text-cyan-900 border-2 border-cyan-200 font-extrabold rounded-2xl text-sm shadow-xs">
            Soal {currentIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <button
            onClick={handleRestart}
            className="p-2 bg-white text-cyan-800 rounded-2xl border-2 border-cyan-200 hover:bg-cyan-100 transition-all font-bold"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isQuizCompleted ? (
        <div className="bg-white rounded-3xl p-6 border-2 border-cyan-200 shadow-sm space-y-6">
          {/* Question Box */}
          <div className="bg-cyan-50 rounded-2xl p-4 border-2 border-cyan-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500 text-white rounded-2xl shadow">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-cyan-950">
                {q.question}
              </h3>
            </div>
            <button
              onClick={() => speakText(q.audioPrompt)}
              className="p-3 bg-cyan-200 hover:bg-cyan-300 text-cyan-900 rounded-2xl transition-all shadow-xs shrink-0"
              title="Dengar Soal"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {q.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const showResult = isAnswered;

              return (
                <motion.button
                  key={opt.id}
                  whileHover={!isAnswered ? { scale: 1.03 } : {}}
                  whileTap={!isAnswered ? { scale: 0.97 } : {}}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`p-5 rounded-3xl border-4 text-center transition-all flex flex-col items-center justify-between gap-3 shadow-md ${
                    showResult
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300'
                        : isSelected
                        ? 'bg-rose-100 border-rose-500 text-rose-950'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                      : 'bg-white border-cyan-200 hover:border-cyan-400 text-cyan-950'
                  }`}
                >
                  <span className="text-5xl my-1 animate-bounce">{opt.icon}</span>
                  <span className="font-black text-base sm:text-lg">{opt.text}</span>

                  {showResult && opt.isCorrect && (
                    <span className="px-3 py-1 bg-emerald-500 text-white font-bold text-xs rounded-full flex items-center gap-1">
                      <Check className="w-4 h-4" /> Benar!
                    </span>
                  )}
                  {showResult && isSelected && !opt.isCorrect && (
                    <span className="px-3 py-1 bg-rose-500 text-white font-bold text-xs rounded-full flex items-center gap-1">
                      <X className="w-4 h-4" /> Kurang Tepat
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Answer Feedback & Next Button */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-cyan-100/80 rounded-2xl border-2 border-cyan-300 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className="font-black text-cyan-950 text-sm">💡 Penjelasan Guru:</p>
                  <p className="text-xs text-cyan-900 font-medium">{q.explanation}</p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black text-sm shadow-md shrink-0 flex items-center gap-2"
                >
                  {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soal Selanjutnya ➡️' : 'Lihat Hasil Kuis 🎉'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white rounded-3xl border-4 border-cyan-300 text-center shadow-xl space-y-4"
        >
          <div className="text-6xl">🏆 ⭐⭐⭐ 🏆</div>
          <h3 className="text-3xl font-black text-cyan-950">Luar Biasa! Kuis Selesai!</h3>
          <p className="text-gray-700 font-bold text-lg">
            Kamu berhasil menjawab <span className="text-emerald-600 text-2xl font-black">{score}</span> dari {QUIZ_QUESTIONS.length} pertanyaan dengan sangat baik!
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-black shadow-lg transition-all"
          >
            Coba Kuis Lagi
          </button>
        </motion.div>
      )}
    </div>
  );
};
