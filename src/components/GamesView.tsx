import React, { useState, useEffect } from 'react';
import { GameType } from '../types';
import { DragDropBodyParts } from './games/DragDropBodyParts';
import { AvatarMirrorGame } from './games/AvatarMirrorGame';
import { HealthyHabitsGame } from './games/HealthyHabitsGame';
import { IdentityQuizGame } from './games/IdentityQuizGame';
import { SongAndMovementGame } from './games/SongAndMovementGame';
import { playSound } from '../utils/soundEffects';
import { Sparkles, Gamepad2, ArrowLeft } from 'lucide-react';

interface Props {
  initialGame?: GameType;
  onEarnStars: (count: number) => void;
}

export const GamesView: React.FC<Props> = ({ initialGame = 'body-parts', onEarnStars }) => {
  const [selectedGame, setSelectedGame] = useState<GameType>(initialGame);

  useEffect(() => {
    if (initialGame) {
      setSelectedGame(initialGame);
    }
  }, [initialGame]);

  const games = [
    {
      id: 'body-parts' as GameType,
      title: '🧩 Pasang Anggota Tubuh',
      subtitle: 'Game Drag & Drop Anggota Tubuh',
      icon: '🧠',
      bg: 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
    },
    {
      id: 'mirror-avatar' as GameType,
      title: '🪞 Cermin & Kartu Nama',
      subtitle: 'Mengenal Keunikan Diri & Hias Badge',
      icon: '✨',
      bg: 'bg-sky-100 border-sky-300 text-sky-900 hover:bg-sky-200'
    },
    {
      id: 'healthy-habits' as GameType,
      title: '🧼 Kebiasaan Sehat',
      subtitle: 'Kelompokkan Kebiasaan Baik',
      icon: '🥦',
      bg: 'bg-violet-100 border-violet-300 text-violet-900 hover:bg-violet-200'
    },
    {
      id: 'quiz' as GameType,
      title: '❓ Kuis Tanya Jawab',
      subtitle: 'Melatih Komunikasi & Identitas',
      icon: '💬',
      bg: 'bg-cyan-100 border-cyan-300 text-cyan-900 hover:bg-cyan-200'
    },
    {
      id: 'song' as GameType,
      title: '🎵 Lagu & Gerak Tubuh',
      subtitle: 'Kepala Pundak Lutut Kaki',
      icon: '🕺',
      bg: 'bg-rose-100 border-rose-300 text-rose-900 hover:bg-rose-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Game Selection Buttons Bar */}
      <div className="bg-white rounded-3xl p-4 border-4 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-amber-500" />
          <h2 className="font-black text-amber-950 text-lg">Pilih Permainan Interaktif:</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {games.map((g) => {
            const isActive = selectedGame === g.id;

            return (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedGame(g.id);
                  playSound('click');
                }}
                className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300 scale-102'
                    : g.bg
                }`}
              >
                <span>{g.icon}</span>
                <span>{g.title.split(' ')[1] || g.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Game */}
      <div>
        {selectedGame === 'body-parts' && <DragDropBodyParts onEarnStars={onEarnStars} />}
        {selectedGame === 'mirror-avatar' && <AvatarMirrorGame onEarnStars={onEarnStars} />}
        {selectedGame === 'healthy-habits' && <HealthyHabitsGame onEarnStars={onEarnStars} />}
        {selectedGame === 'quiz' && <IdentityQuizGame onEarnStars={onEarnStars} />}
        {selectedGame === 'song' && <SongAndMovementGame onEarnStars={onEarnStars} />}
      </div>
    </div>
  );
};
