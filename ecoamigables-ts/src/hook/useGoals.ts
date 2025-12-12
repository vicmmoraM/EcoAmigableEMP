import { useState, useEffect } from 'react';

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'ecoamigables_goals';

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Cargar metas desde localStorage al inicio
  useEffect(() => {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      try {
        setGoals(JSON.parse(storedGoals));
      } catch (error) {
        console.error('Error al cargar metas:', error);
      }
    }
  }, []);

  // Guardar metas en localStorage cuando cambien
  useEffect(() => {
    if (goals.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }
  }, [goals]);

  // Agregar nueva meta
  const addGoal = (text: string) => {
    if (!text.trim()) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };

    setGoals(prev => [...prev, newGoal]);
  };

  // Marcar meta como completada/no completada
  const toggleGoal = (id: string) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  // Eliminar meta
  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  // Calcular progreso
  const getProgress = () => {
    if (goals.length === 0) return 0;
    const completed = goals.filter(goal => goal.completed).length;
    return Math.round((completed / goals.length) * 100);
  };

  const getCompletedCount = () => goals.filter(goal => goal.completed).length;

  return {
    goals,
    addGoal,
    toggleGoal,
    deleteGoal,
    getProgress,
    getCompletedCount,
    totalGoals: goals.length
  };
};