export interface PresetGoal {
  id: string;
  text: string;
  category: 'diario' | 'semanal' | 'mensual' | 'habito';
  difficulty: 'facil' | 'medio' | 'dificil';
  icon: string;
  description: string;
  impact: {
    co2: number;
    water: number;
    trees: number;
  };
}

export const presetGoals: PresetGoal[] = [
  // METAS DIARIAS
  {
    id: 'daily_1',
    text: 'Separar los residuos del desayuno correctamente',
    category: 'diario',
    difficulty: 'facil',
    icon: '🌅',
    description: 'Separa envases, orgánicos y papel de tu desayuno',
    impact: { co2: 0.3, water: 2, trees: 0.01 }
  },
  {
    id: 'daily_2',
    text: 'Usar una botella reutilizable en lugar de plástico',
    category: 'diario',
    difficulty: 'facil',
    icon: '🍶',
    description: 'Evita botellas de un solo uso durante todo el día',
    impact: { co2: 0.5, water: 5, trees: 0.02 }
  },
  {
    id: 'daily_3',
    text: 'Llevar bolsa reutilizable al supermercado',
    category: 'diario',
    difficulty: 'facil',
    icon: '🛍️',
    description: 'Di no a las bolsas plásticas en tus compras',
    impact: { co2: 0.2, water: 1, trees: 0.01 }
  },
  {
    id: 'daily_4',
    text: 'Lavar y guardar envases para reciclar',
    category: 'diario',
    difficulty: 'medio',
    icon: '🧼',
    description: 'Limpia envases antes de llevarlos al punto de reciclaje',
    impact: { co2: 0.4, water: 3, trees: 0.02 }
  },

  // METAS SEMANALES
  {
    id: 'weekly_1',
    text: 'Llevar residuos reciclables a un punto de acopio',
    category: 'semanal',
    difficulty: 'medio',
    icon: '♻️',
    description: 'Visita un centro de reciclaje con tus materiales separados',
    impact: { co2: 2.5, water: 15, trees: 0.3 }
  },
  {
    id: 'weekly_2',
    text: 'Crear compost con residuos orgánicos de la semana',
    category: 'semanal',
    difficulty: 'medio',
    icon: '🌱',
    description: 'Transforma restos de comida en abono natural',
    impact: { co2: 3.0, water: 10, trees: 0.2 }
  },
  {
    id: 'weekly_3',
    text: 'Reducir uso de plástico de un solo uso esta semana',
    category: 'semanal',
    difficulty: 'medio',
    icon: '🚫',
    description: 'Evita sorbetes, vasos y cubiertos desechables',
    impact: { co2: 1.8, water: 12, trees: 0.15 }
  },
  {
    id: 'weekly_4',
    text: 'Reutilizar o reparar algo en lugar de desecharlo',
    category: 'semanal',
    difficulty: 'medio',
    icon: '🔧',
    description: 'Dale una segunda vida a objetos que ibas a tirar',
    impact: { co2: 2.0, water: 8, trees: 0.25 }
  },
  {
    id: 'weekly_5',
    text: 'Separar correctamente todos los residuos por 7 días',
    category: 'semanal',
    difficulty: 'dificil',
    icon: '🗓️',
    description: 'Mantén la separación perfecta durante toda la semana',
    impact: { co2: 4.0, water: 20, trees: 0.4 }
  },

  // METAS MENSUALES
  {
    id: 'monthly_1',
    text: 'Reciclar 10 kg de papel y cartón este mes',
    category: 'mensual',
    difficulty: 'medio',
    icon: '📦',
    description: 'Reúne y recicla papel, cartón y periódicos',
    impact: { co2: 15, water: 100, trees: 1.5 }
  },
  {
    id: 'monthly_2',
    text: 'Donar ropa y objetos que ya no uses',
    category: 'mensual',
    difficulty: 'medio',
    icon: '👕',
    description: 'Evita que ropa en buen estado termine en la basura',
    impact: { co2: 8, water: 50, trees: 0.8 }
  },
  {
    id: 'monthly_3',
    text: 'Organizar un día de limpieza en tu comunidad',
    category: 'mensual',
    difficulty: 'dificil',
    icon: '🤝',
    description: 'Involucra a vecinos en la recolección de residuos',
    impact: { co2: 20, water: 80, trees: 2.0 }
  },
  {
    id: 'monthly_4',
    text: 'Llevar residuos electrónicos a centro especializado',
    category: 'mensual',
    difficulty: 'medio',
    icon: '📱',
    description: 'Recicla pilas, celulares viejos y cables',
    impact: { co2: 12, water: 60, trees: 1.0 }
  },
  {
    id: 'monthly_5',
    text: 'Reducir desperdicio de alimentos en un 50%',
    category: 'mensual',
    difficulty: 'dificil',
    icon: '🥗',
    description: 'Planifica compras y aprovecha sobras',
    impact: { co2: 18, water: 90, trees: 1.5 }
  },

  // HÁBITOS A LARGO PLAZO
  {
    id: 'habit_1',
    text: 'Adoptar el hábito de separar residuos diariamente',
    category: 'habito',
    difficulty: 'medio',
    icon: '🎯',
    description: 'Convierte la separación en parte de tu rutina',
    impact: { co2: 10, water: 50, trees: 1.0 }
  },
  {
    id: 'habit_2',
    text: 'Educar a tu familia sobre reciclaje',
    category: 'habito',
    difficulty: 'medio',
    icon: '👨‍👩‍👧‍👦',
    description: 'Comparte conocimientos y crea conciencia en casa',
    impact: { co2: 15, water: 75, trees: 1.5 }
  },
  {
    id: 'habit_3',
    text: 'Comprar productos con menos empaque',
    category: 'habito',
    difficulty: 'medio',
    icon: '🛒',
    description: 'Elige opciones eco-amigables al hacer compras',
    impact: { co2: 12, water: 60, trees: 1.2 }
  },
  {
    id: 'habit_4',
    text: 'Llevar tuppers para comida en lugar de desechables',
    category: 'habito',
    difficulty: 'facil',
    icon: '🍱',
    description: 'Reduce residuos al comer fuera de casa',
    impact: { co2: 8, water: 40, trees: 0.8 }
  },
  {
    id: 'habit_5',
    text: 'Visitar punto de reciclaje cada 15 días',
    category: 'habito',
    difficulty: 'medio',
    icon: '🚗',
    description: 'Crea una rutina de entrega de reciclables',
    impact: { co2: 20, water: 100, trees: 2.0 }
  }
];

// Función para obtener metas por categoría
export const getGoalsByCategory = (category: PresetGoal['category']) => {
  return presetGoals.filter(goal => goal.category === category);
};

// Función para obtener metas por dificultad
export const getGoalsByDifficulty = (difficulty: PresetGoal['difficulty']) => {
  return presetGoals.filter(goal => goal.difficulty === difficulty);
};

// Función para obtener una meta aleatoria
export const getRandomGoal = () => {
  return presetGoals[Math.floor(Math.random() * presetGoals.length)];
};