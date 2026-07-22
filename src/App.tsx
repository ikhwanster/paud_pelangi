import React, { useState } from 'react';
import { AppMode, GameType } from './types';
import { Header } from './components/Header';
import { StoryboardView } from './components/StoryboardView';
import { GamesView } from './components/GamesView';
import { DashboardView } from './components/DashboardView';
import { MascotMessage } from './components/MascotMessage';
import { playSound } from './utils/soundEffects';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('storyboard');
  const [selectedGameType, setSelectedGameType] = useState<GameType>('body-parts');
  const [totalStars, setTotalStars] = useState<number>(18);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleEarnStars = (count: number) => {
    setTotalStars(prev => prev + count);
  };

  const handleLaunchGameFromStoryboard = (gameType: GameType) => {
    setSelectedGameType(gameType);
    setCurrentMode('games');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-gray-900 font-sans selection:bg-amber-300 selection:text-amber-950 pb-16">
      {/* Top Application Navigation Header */}
      <Header
        currentMode={currentMode}
        onModeChange={(mode) => {
          setCurrentMode(mode);
        }}
        totalStars={totalStars}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled(!soundEnabled);
          playSound('click');
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {currentMode === 'storyboard' && (
          <StoryboardView onLaunchGame={handleLaunchGameFromStoryboard} />
        )}

        {currentMode === 'games' && (
          <GamesView
            initialGame={selectedGameType}
            onEarnStars={handleEarnStars}
          />
        )}

        {currentMode === 'analytics' && (
          <DashboardView />
        )}
      </main>

      {/* Floating Helper Mascot */}
      <MascotMessage />
    </div>
  );
}
