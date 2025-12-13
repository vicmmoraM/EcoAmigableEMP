import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconType: 'leaf' | 'tree' | 'trophy' | 'fire' | 'star' | 'water' | 'air' | 'shield';
  color: string;
  requirement: number;
  category: 'goals' | 'streak' | 'impact' | 'special';
  unlocked: boolean;
  unlockedAt?: number;
  progress: number;
}

const STORAGE_KEY = 'ecoamigables_achievements';

// Definir todos los logros disponibles
const allAchievements: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Logros de Metas
  {
    id: 'first_goal',
    title: 'Primer Paso',
    description: 'Completa tu primera meta de reciclaje',
    iconType: 'leaf',
    color: '#4CAF50',
    requirement: 1,
    category: 'goals'
  },
  {
    id: 'five_goals',
    title: 'Compromiso Verde',
    description: 'Completa 5 metas de reciclaje',
    iconType: 'leaf',
    color: '#66BB6A',
    requirement: 5,
    category: 'goals'
  },
  {
    id: 'ten_goals',
    title: 'EcoGuerrero',
    description: 'Completa 10 metas de reciclaje',
    iconType: 'tree',
    color: '#2e7d32',
    requirement: 10,
    category: 'goals'
  },
  {
    id: 'twenty_goals',
    title: 'Maestro del Reciclaje',
    description: 'Completa 20 metas de reciclaje',
    iconType: 'trophy',
    color: '#FFD700',
    requirement: 20,
    category: 'goals'
  },
  
  // Logros de Racha
  {
    id: 'week_streak',
    title: 'Una Semana Constante',
    description: 'Mantén una racha de 7 días',
    iconType: 'fire',
    color: '#FF5722',
    requirement: 7,
    category: 'streak'
  },
  {
    id: 'month_streak',
    title: 'Mes de Compromiso',
    description: 'Mantén una racha de 30 días',
    iconType: 'fire',
    color: '#FF9800',
    requirement: 30,
    category: 'streak'
  },
  
  // Logros de Impacto
  {
    id: 'co2_saver',
    title: 'Guardián del Aire',
    description: 'Reduce 50 kg de CO₂',
    iconType: 'air',
    color: '#03A9F4',
    requirement: 50,
    category: 'impact'
  },
  {
    id: 'water_saver',
    title: 'Protector del Agua',
    description: 'Ahorra 300 litros de agua',
    iconType: 'water',
    color: '#2196F3',
    requirement: 300,
    category: 'impact'
  },
  {
    id: 'tree_saver',
    title: 'Amigo de los Árboles',
    description: 'Salva 5 árboles',
    iconType: 'tree',
    color: '#4CAF50',
    requirement: 5,
    category: 'impact'
  },
  
  // Logros Especiales
  {
    id: 'early_bird',
    title: 'Madrugador Verde',
    description: 'Completa una meta antes de las 8 AM',
    iconType: 'star',
    color: '#FFA726',
    requirement: 1,
    category: 'special'
  },
  {
    id: 'perfect_week',
    title: 'Semana Perfecta',
    description: 'Completa al menos una meta cada día de la semana',
    iconType: 'shield',
    color: '#9C27B0',
    requirement: 7,
    category: 'special'
  }
];

export const useAchievements = (completedGoals: number, totalImpact?: {
  co2: number;
  water: number;
  trees: number;
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);

  // Cargar logros desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAchievements(JSON.parse(stored));
      } catch (error) {
        initializeAchievements();
      }
    } else {
      initializeAchievements();
    }
  }, []);

  // Inicializar logros
  const initializeAchievements = () => {
    const initialized = allAchievements.map(ach => ({
      ...ach,
      unlocked: false,
      progress: 0
    }));
    setAchievements(initialized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
  };

  // Verificar y desbloquear logros
  useEffect(() => {
    if (achievements.length === 0) return;

    const updated = achievements.map(ach => {
      if (ach.unlocked) return ach;

      let currentProgress = 0;
      let shouldUnlock = false;

      // Calcular progreso según categoría
      switch (ach.category) {
        case 'goals':
          currentProgress = completedGoals;
          shouldUnlock = completedGoals >= ach.requirement;
          break;
        
        case 'impact':
          if (totalImpact) {
            if (ach.id === 'co2_saver') {
              currentProgress = totalImpact.co2;
              shouldUnlock = totalImpact.co2 >= ach.requirement;
            } else if (ach.id === 'water_saver') {
              currentProgress = totalImpact.water;
              shouldUnlock = totalImpact.water >= ach.requirement;
            } else if (ach.id === 'tree_saver') {
              currentProgress = totalImpact.trees;
              shouldUnlock = totalImpact.trees >= ach.requirement;
            }
          }
          break;
        
        default:
          currentProgress = ach.progress;
          break;
      }

      if (shouldUnlock && !ach.unlocked) {
        const unlockedAch = {
          ...ach,
          unlocked: true,
          unlockedAt: Date.now(),
          progress: ach.requirement
        };
        
        setNewUnlocks(prev => [...prev, unlockedAch]);
        return unlockedAch;
      }

      return {
        ...ach,
        progress: Math.min(currentProgress, ach.requirement)
      };
    });

    if (JSON.stringify(updated) !== JSON.stringify(achievements)) {
      setAchievements(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [completedGoals, totalImpact]);

  // Limpiar notificación de nuevo logro
  const clearNewUnlock = (id: string) => {
    setNewUnlocks(prev => prev.filter(ach => ach.id !== id));
  };

  // Obtener estadísticas
  const getStats = () => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const percentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
    
    return {
      unlockedCount,
      totalCount,
      percentage
    };
  };

  // Obtener nivel basado en logros
  const getLevel = () => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    
    if (unlockedCount >= 10) return { level: 5, title: 'Leyenda Verde', nextAt: 999 };
    if (unlockedCount >= 7) return { level: 4, title: 'Experto Eco', nextAt: 10 };
    if (unlockedCount >= 5) return { level: 3, title: 'Defensor del Planeta', nextAt: 7 };
    if (unlockedCount >= 3) return { level: 2, title: 'Guerrero Verde', nextAt: 5 };
    if (unlockedCount >= 1) return { level: 1, title: 'Aprendiz Eco', nextAt: 3 };
    return { level: 0, title: 'Novato', nextAt: 1 };
  };

  return {
    achievements,
    newUnlocks,
    clearNewUnlock,
    getStats,
    getLevel
  };
};