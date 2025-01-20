import { useState, useEffect } from 'react';
import { GROWTH_PATHS } from '@/data/growth-paths';
import type { UserGrowthProgress, PathProgress, LevelProgress } from '@/types/growth-map';

export function useGrowthMap() {
  const [progress, setProgress] = useState<UserGrowthProgress>({
    paths: [],
    lastUpdated: new Date().toISOString()
  });

  useEffect(() => {
    // TODO: Load user progress from backend/localStorage
    const initialProgress: PathProgress[] = GROWTH_PATHS.map(path => ({
      pathId: path.id,
      currentLevel: 1,
      overallProgress: 0,
      levels: path.levels.map((level, index) => ({
        levelId: level.id,
        status: index === 0 ? 'in-progress' as const : 'locked' as const,
        progress: index === 0 ? 0 : 0
      }))
    }));

    setProgress({
      paths: initialProgress,
      lastUpdated: new Date().toISOString()
    });
  }, []);

  const updateLevelProgress = (pathId: string, levelId: string, newProgress: number) => {
    setProgress(prev => {
      const newPaths = prev.paths.map(path => {
        if (path.pathId !== pathId) return path;

        const newLevels = path.levels.map(level => {
          if (level.levelId !== levelId) return level;
          
          const newStatus: LevelProgress['status'] = newProgress >= 100 ? 'completed' : 'in-progress';
          return {
            ...level,
            progress: newProgress,
            status: newStatus
          };
        });

        // Update overall progress
        const overallProgress = Math.round(
          newLevels.reduce((acc, level) => acc + level.progress, 0) / newLevels.length
        );

        // Update current level
        const completedLevels = newLevels.filter(l => l.status === 'completed').length;
        const currentLevel = completedLevels + 1;

        // Unlock next level if current is completed
        if (newProgress >= 100) {
          const currentIndex = newLevels.findIndex(l => l.levelId === levelId);
          if (currentIndex < newLevels.length - 1) {
            newLevels[currentIndex + 1].status = 'in-progress';
          }
        }

        return {
          ...path,
          levels: newLevels,
          overallProgress,
          currentLevel
        };
      });

      return {
        paths: newPaths,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const getPathProgress = (pathId: string): PathProgress | undefined => {
    return progress.paths.find(p => p.pathId === pathId);
  };

  const getLevelProgress = (pathId: string, levelId: string): LevelProgress | undefined => {
    return progress.paths
      .find(p => p.pathId === pathId)
      ?.levels.find(l => l.levelId === levelId);
  };

  return {
    progress,
    updateLevelProgress,
    getPathProgress,
    getLevelProgress
  };
} 