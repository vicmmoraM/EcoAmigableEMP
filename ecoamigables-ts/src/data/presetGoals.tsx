import React from 'react';

// Iconos SVG simples para no depender de librerías externas
const Icons = {
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Bottle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6v5.33L19 12v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8l4-4.67V2z"/></svg>,
  Bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Family: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Food: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>,
  Car: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h8"/></svg>
};

export interface PresetGoal {
  id: string;
  text: string;
  category: 'diario' | 'semanal' | 'mensual' | 'habito';
  difficulty: 'facil' | 'medio' | 'dificil';
  icon: React.ReactNode; // Cambiado de string a ReactNode
  description: string;
  impact: {
    co2: number;
    water: number;
    trees: number;
  };
}

export const presetGoals: PresetGoal[] = [
  {
    id: 'daily_1',
    text: 'Separar los residuos del desayuno correctamente',
    category: 'diario',
    difficulty: 'facil',
    icon: <Icons.Sun />, // Usamos el componente
    description: 'Separa envases, orgánicos y papel de tu desayuno',
    impact: { co2: 0.3, water: 2, trees: 0.01 }
  },
  {
    id: 'daily_2',
    text: 'Usar una botella reutilizable en lugar de plástico',
    category: 'diario',
    difficulty: 'facil',
    icon: <Icons.Bottle />,
    description: 'Evita botellas de un solo uso durante todo el día',
    impact: { co2: 0.5, water: 5, trees: 0.02 }
  },
  {
    id: 'daily_3',
    text: 'Llevar bolsa reutilizable al supermercado',
    category: 'diario',
    difficulty: 'facil',
    icon: <Icons.Bag />,
    description: 'Evita el uso de bolsas plásticas desechables',
    impact: { co2: 0.2, water: 1, trees: 0.005 }
  },
  {
    id: 'habit_1',
    text: 'Separar basura orgánica para compostaje',
    category: 'habito',
    difficulty: 'medio',
    icon: <Icons.Food />,
    description: 'Reduce tus residuos generales convirtiéndolos en abono',
    impact: { co2: 5, water: 10, trees: 0.5 }
  },
  {
    id: 'habit_2',
    text: 'Enseñar a un familiar a reciclar',
    category: 'habito',
    difficulty: 'dificil',
    icon: <Icons.Family />,
    description: 'Comparte conocimientos y crea conciencia en casa',
    impact: { co2: 15, water: 75, trees: 1.5 }
  },
  {
    id: 'habit_3',
    text: 'Comprar productos con menos empaque',
    category: 'habito',
    difficulty: 'medio',
    icon: <Icons.Cart />,
    description: 'Elige opciones eco-amigables al hacer compras',
    impact: { co2: 12, water: 60, trees: 1.2 }
  },
  {
    id: 'habit_5',
    text: 'Visitar punto de reciclaje cada 15 días',
    category: 'habito',
    difficulty: 'medio',
    icon: <Icons.Car />,
    description: 'Crea una rutina de entrega de reciclables',
    impact: { co2: 20, water: 100, trees: 2.0 }
  }
];

export const getGoalsByCategory = (category: PresetGoal['category']) => {
  return presetGoals.filter(goal => goal.category === category);
};