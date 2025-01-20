import { LucideIcon } from 'lucide-react';

export interface PathLevel {
  id: string;
  title: string;
  description: string;
  requirements?: string[];
}

export interface GrowthPath {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  levels: PathLevel[];
}

export interface LevelProgress {
  levelId: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

export interface PathProgress {
  pathId: string;
  currentLevel: number;
  overallProgress: number;
  levels: LevelProgress[];
}

export interface UserGrowthProgress {
  paths: PathProgress[];
  lastUpdated: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  date: string;
} 