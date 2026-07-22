export type AppMode = 'storyboard' | 'games' | 'analytics' | 'guide';

export type GameType = 'body-parts' | 'mirror-avatar' | 'healthy-habits' | 'quiz' | 'song';

export interface StoryboardStep {
  id: number;
  title: string;
  subtitle: string;
  dialog: string;
  objective: string;
  icon: string;
  bgGradient: string;
  accentColor: string;
  mediaUsed: string[];
  aspects: string[];
  gameType?: GameType;
}

export interface BodyPartItem {
  id: string;
  name: string;
  label: string;
  x: number; // percentage offset for drop zone on character
  y: number;
  iconName: string;
  audioPrompt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: string;
  avatar: string;
  gender: 'male' | 'female';
  favoriteColor: string;
  hairStyle: string;
  stars: number;
  completedModules: number[];
  aspectScores: {
    jatiDiri: number; // 0 - 100
    nilaiAgama: number;
    literasi: number;
    fisikMotorik: number;
  };
  dailyLogs: DailyLog[];
}

export interface DailyLog {
  id: string;
  date: string;
  attendance: 'Hadir' | 'Izin' | 'Sakit';
  activitiesDone: string[];
  starsEarned: number;
  teacherNote: string;
  aspectObservation: {
    jatiDiri: string;
    nilaiAgama: string;
    literasi: string;
    fisikMotorik: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioPrompt: string;
  options: {
    id: string;
    text: string;
    icon: string;
    color: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
