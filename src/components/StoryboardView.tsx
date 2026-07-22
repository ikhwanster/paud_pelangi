import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STORYBOARD_STEPS, PAUD_THEME_INFO } from '../data/storyboardData';
import { StoryboardStep, GameType } from '../types';
import { playSound, speakText } from '../utils/soundEffects';
import {
  Sun, Music, Hand, Sparkles, Heart, MessageCircle, ShieldCheck, Rocket,
  Volume2, Play, CheckCircle2, Award, User, BadgeCheck, HelpCircle
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sun, Music, Hand, Sparkles, Heart, MessageCircle, ShieldCheck, Rocket
};

interface Props {
  onLaunchGame: (gameType: GameType) => void;
}

export const StoryboardView: React.FC<Props> = ({ onLaunchGame }) => {
  const [activeStepId, setActiveStepId] = useState<number>(1);

  const handleSpeakDialog = (step: StoryboardStep) => {
    playSound('star');
    speakText(`Modul ${step.id} ${step.title}. Dialog Guru: ${step.dialog}`);
  };

  return (
    <div className="space-y-8">
      {/* Storyboard Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-300 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-xl border-4 border-white relative overflow-hidden">
        <div className="absolute top-2 right-4 text-7xl opacity-20 pointer-events-none">☀️</div>
        <div className="absolute -bottom-6 -left-6 text-8xl opacity-15 pointer-events-none">🌸</div>

        <div className="relative z-10 text-center space-y-2">
          <span className="inline-block px-4 py-1.5 bg-amber-950 text-amber-200 font-black text-xs uppercase tracking-widest rounded-full shadow">
            {PAUD_THEME_INFO.title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-amber-950">
            {PAUD_THEME_INFO.theme}
          </h2>
          <p className="text-xl font-black text-amber-900">
            {PAUD_THEME_INFO.subtheme} • <span className="underline decoration-wavy decoration-rose-500">{PAUD_THEME_INFO.ageGroup}</span>
          </p>
        </div>
      </div>

      {/* 8-Step Storyboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STORYBOARD_STEPS.map((step) => {
          const IconComponent = ICON_MAP[step.icon] || Sun;
          const isActive = activeStepId === step.id;

          return (
            <motion.div
              key={step.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveStepId(step.id)}
              className={`bg-gradient-to-b ${step.bgGradient} rounded-3xl p-5 border-4 transition-all duration-300 flex flex-col justify-between shadow-md relative ${
                isActive ? 'border-amber-400 ring-4 ring-amber-200 scale-102 shadow-xl' : 'border-white hover:border-amber-200'
              }`}
            >
              {/* Step Badge & Icon Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-full ${step.accentColor} text-white font-black text-base flex items-center justify-center shadow-md`}>
                    {step.id}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakDialog(step);
                    }}
                    className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-2xl shadow-xs transition-all border border-gray-200"
                    title="Putar Suara Dialog Guru"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </button>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="font-black text-gray-900 text-lg leading-tight mb-0.5">
                  {step.title}
                </h3>
                <p className="text-xs font-bold text-amber-800 mb-3">
                  {step.subtitle}
                </p>

                {/* Speech Bubble Dialog Guru */}
                <div className="bg-white/90 rounded-2xl p-3 border-2 border-amber-200/80 shadow-xs mb-3 relative">
                  <p className="text-xs font-bold text-gray-800 italic leading-relaxed">
                    💬 <span className="text-amber-900 font-extrabold font-sans">Guru:</span> "{step.dialog}"
                  </p>
                </div>

                {/* Objective (Tujuan) */}
                <div className="bg-amber-100/70 rounded-xl p-2.5 border border-amber-300 text-[11px] mb-3">
                  <span className="font-extrabold text-amber-950 block mb-0.5">🎯 Tujuan:</span>
                  <p className="text-amber-900 font-medium leading-normal">{step.objective}</p>
                </div>
              </div>

              {/* Media Badges & Interactive Action */}
              <div className="space-y-3 pt-2 border-t border-amber-200/60">
                {/* Media Tags */}
                <div className="flex flex-wrap gap-1">
                  {step.mediaUsed.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-white/80 text-gray-700 text-[10px] font-bold rounded-lg border border-gray-200">
                      🏷️ {m}
                    </span>
                  ))}
                </div>

                {/* Game / Activity Trigger Button */}
                {step.gameType ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      onLaunchGame(step.gameType!);
                    }}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Mainkan Aktivitas Modul {step.id}</span>
                  </button>
                ) : (
                  <div className="text-center py-1.5 bg-white/60 text-gray-600 text-[10px] font-bold rounded-xl border border-gray-200">
                    ✨ Panduan Pembukaan Guru
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Media Pembelajaran & Aspek Perkembangan Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Media Pembelajaran Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-4 border-amber-200 shadow-md">
          <h3 className="font-black text-amber-950 text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            MEDIA PEMBELAJARAN
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {PAUD_THEME_INFO.mediaPembelajaran.map((m) => (
              <div key={m.id} className={`p-3 rounded-2xl border-2 ${m.color} flex items-center gap-3 shadow-xs`}>
                <div className="text-2xl">
                  {m.id === 'cermin' ? '🪞' : m.id === 'anggota-tubuh' ? '🖐️' : m.id === 'lagu' ? '🎵' : '🪪'}
                </div>
                <span className="font-extrabold text-xs sm:text-sm">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aspek Perkembangan Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-4 border-emerald-200 shadow-md">
          <h3 className="font-black text-emerald-950 text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            ASPEK PERKEMBANGAN (Kurikulum PAUD 3–4 Tahun)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAUD_THEME_INFO.aspekPerkembangan.map((asp, i) => (
              <div key={i} className="p-3 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 space-y-1">
                <div className="flex items-center gap-2 font-black text-emerald-950 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{asp.title}</span>
                </div>
                <p className="text-[11px] text-emerald-900 font-medium pl-6 leading-tight">
                  {asp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
