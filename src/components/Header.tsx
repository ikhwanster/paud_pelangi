import React from 'react';
import { AppMode } from '../types';
import { BookOpen, Gamepad2, BarChart3, Star, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface Props {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  totalStars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<Props> = ({
  currentMode,
  onModeChange,
  totalStars,
  soundEnabled,
  onToggleSound
}) => {
  const navItems = [
    { id: 'storyboard' as AppMode, label: 'Storyboard Guru PAUD', icon: BookOpen, badge: '8 Modul' },
    { id: 'games' as AppMode, label: 'Game Drag & Drop', icon: Gamepad2, badge: 'Interaktif' },
    { id: 'analytics' as AppMode, label: 'Dasbor Analitik & Rapor', icon: BarChart3, badge: 'Ortu & Guru' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b-4 border-amber-300 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg border-2 border-white">
            🌞
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-amber-300">
                Tema: Diri Sendiri (3–4 Tahun)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
              PAUD Pintar
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-amber-50/80 p-1.5 rounded-2xl border-2 border-amber-200 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click');
                  onModeChange(item.id);
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-amber-950 shadow-md border-2 border-amber-300 scale-102'
                    : 'text-gray-700 hover:bg-amber-100/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-amber-950 text-amber-200' : 'bg-gray-200 text-gray-700'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Status Bar (Stars & Sound) */}
        <div className="flex items-center gap-3">
          {/* Star Counter */}
          <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 px-3.5 py-1.5 rounded-2xl font-black text-sm flex items-center gap-1.5 shadow-md border-2 border-white">
            <Star className="w-5 h-5 fill-amber-950 text-amber-950 animate-spin" />
            <span>{totalStars} Bintang</span>
          </div>

          {/* Mute / Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-2xl border-2 transition-all shadow-sm ${
              soundEnabled
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-gray-100 text-gray-500 border-gray-300'
            }`}
            title={soundEnabled ? 'Suara Aktif' : 'Suara Hening'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
